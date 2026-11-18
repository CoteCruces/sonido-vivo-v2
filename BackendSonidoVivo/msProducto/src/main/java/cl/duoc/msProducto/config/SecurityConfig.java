
package cl.duoc.msProducto.config;

import cl.duoc.msProducto.security.JwtFilter;

import jakarta.servlet.DispatcherType;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtFilter jwtFilter
    ) throws Exception {

        http
            // Desactivar CSRF para nuestra API REST.
            .csrf(csrf -> csrf.disable())

            // No crear sesiones en Spring Boot.
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // Configurar los permisos.
            .authorizeHttpRequests(auth -> auth

                // Permitir gestionar las respuestas de error.
                .dispatcherTypeMatchers(
                    DispatcherType.ERROR
                ).permitAll()

                .requestMatchers("/error").permitAll()

                // Consultar productos es público.
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/productos",
                    "/api/productos/**"
                ).permitAll()

                // Crear productos: solo administradores.
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/productos"
                ).hasRole("ADMIN")

                // Editar productos: solo administradores.
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/productos/**"
                ).hasRole("ADMIN")

                // Eliminar productos: solo administradores.
                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/productos/**"
                ).hasRole("ADMIN")

                // Permitir visualizar Swagger.
                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()

                // Las demás rutas requieren autenticación.
                .anyRequest().authenticated()
            )

            // Validar el JWT antes de comprobar los permisos.
            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
