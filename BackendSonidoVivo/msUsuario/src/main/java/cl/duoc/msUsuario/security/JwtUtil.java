
package cl.duoc.msUsuario.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final Key secretKey;

    // Duración del token: 24 horas.
    private final long jwtExpirationMs = 86400000;

    // Leer la clave JWT desde Windows.
    public JwtUtil() {

        String secreto = System.getenv("JWT_SECRET");

        if (secreto == null || secreto.isBlank()) {
            throw new IllegalStateException(
                "La variable JWT_SECRET no está configurada."
            );
        }

        byte[] clave;

        try {
            clave = Base64.getDecoder().decode(secreto);
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException(
                "JWT_SECRET debe estar codificada en Base64.",
                e
            );
        }

        if (clave.length < 32) {
            throw new IllegalStateException(
                "JWT_SECRET debe tener al menos 32 bytes."
            );
        }

        secretKey = Keys.hmacShaKeyFor(clave);
    }

    // Generar un JWT con el correo y el rol.
    public String generarToken(String email, String rol) {

        return Jwts.builder()
                .setSubject(email)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(
                    new Date(
                        System.currentTimeMillis() + jwtExpirationMs
                    )
                )
                .signWith(secretKey)
                .compact();
    }

    // Extraer el correo del JWT.
    public String extraerEmail(String token) {
        return extraerClaim(token, Claims::getSubject);
    }

    // Extraer el rol del JWT.
    public String extraerRol(String token) {
        Claims claims = extraerTodosClaims(token);
        return claims.get("rol", String.class);
    }

    // Extraer un dato específico del JWT.
    public <T> T extraerClaim(
            String token,
            Function<Claims, T> claimsResolver) {

        Claims claims = extraerTodosClaims(token);

        return claimsResolver.apply(claims);
    }

    // Verificar la firma y leer el contenido.
    private Claims extraerTodosClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Comprobar que el JWT pertenece al usuario
    // y que todavía no ha expirado.
    public boolean validarToken(
            String token,
            String emailUsuario) {

        String email = extraerEmail(token);

        return email.equals(emailUsuario)
                && !isTokenExpired(token);
    }

    // Comprobar la fecha de expiración.
    private boolean isTokenExpired(String token) {

        return extraerClaim(
            token,
            Claims::getExpiration
        ).before(new Date());
    }
}
