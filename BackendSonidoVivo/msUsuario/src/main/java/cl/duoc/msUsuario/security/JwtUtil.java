package cl.duoc.msUsuario.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    //Se encarga de generar el token, validar su firma y extraer el correo y los roles.

    // Clave secreta segura para firmar el token (mínimo 256 bits)
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long jwtExpirationMs = 86400000; // 24 horas

    // Generar token incluyendo el correo y el rol
    public String generarToken(String email, String rol) {
        return Jwts.builder()
                .setSubject(email)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(secretKey)
                .compact();
    }

    // Extraer el email (subject) del token
    public String extraerEmail(String token) {
        return extraerClaim(token, Claims::getSubject);
    }

    // Extraer el rol del token
    public String extraerRol(String token) {
        Claims claims = extraerTodosClaims(token);
        return claims.get("rol", String.class);
    }

    public <T> T extraerClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extraerTodosClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extraerTodosClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validarToken(String token, String emailUsuario) {
        final String email = extraerEmail(token);
        return (email.equals(emailUsuario) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extraerClaim(token, Claims::getExpiration).before(new Date());
    }
}