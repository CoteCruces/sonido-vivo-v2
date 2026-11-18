
package cl.duoc.msProducto.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    // Recibir la clase que valida los JWT.
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Obtener la cabecera Authorization.
        String encabezado = request.getHeader("Authorization");

        if (encabezado != null &&
            encabezado.startsWith("Bearer ")) {

            String token = encabezado.substring(7);

            try {
                // Verifica la firma y la expiración del JWT.
                Claims claims = jwtUtil.obtenerClaims(token);

                // Obtener el correo y el rol del usuario.
                String email = claims.getSubject();
                String rol = claims.get("rol", String.class);

                // Aceptar únicamente los roles conocidos.
                boolean rolValido =
                        "ADMIN".equals(rol) ||
                        "CLIENTE".equals(rol);

                if (email != null &&
                    !email.isBlank() &&
                    rolValido &&
                    SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

                    // Crear el permiso que utiliza Spring Security.
                    SimpleGrantedAuthority permiso =
                            new SimpleGrantedAuthority(
                                    "ROLE_" + rol
                            );

                    // Registrar al usuario autenticado.
                    UsernamePasswordAuthenticationToken autenticacion =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    List.of(permiso)
                            );

                    SecurityContextHolder.getContext()
                            .setAuthentication(autenticacion);
                }

            } catch (JwtException | IllegalArgumentException e) {
                // Un token inválido no autentica al usuario.
                SecurityContextHolder.clearContext();
            }
        }

        // Continuar con la petición HTTP.
        filterChain.doFilter(request, response);
    }
}
