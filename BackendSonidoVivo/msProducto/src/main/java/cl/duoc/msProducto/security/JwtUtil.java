
package cl.duoc.msProducto.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;

@Component
public class JwtUtil {

    private final Key secretKey;

    // Utilizar la misma clave JWT que msUsuario.
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

    // Verificar la firma y leer los datos del JWT.
    public Claims obtenerClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Comprobar si el JWT es válido.
    public boolean validarToken(String token) {

        try {
            Claims claims = obtenerClaims(token);

            return claims.getSubject() != null
                    && !claims.getSubject().isBlank();

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // Obtener el correo del usuario.
    public String extraerEmail(String token) {
        return obtenerClaims(token).getSubject();
    }

    // Obtener el rol del usuario.
    public String extraerRol(String token) {
        return obtenerClaims(token).get(
                "rol",
                String.class
        );
    }
}
