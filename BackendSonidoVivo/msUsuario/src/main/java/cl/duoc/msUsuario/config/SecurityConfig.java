
package cl.duoc.msUsuario.config;

import cl.duoc.msUsuario.security.JwtFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            // Desactivar CSRF para nuestra API REST.
            .csrf(csrf -> csrf.disable())

            // La autenticación se realizará mediante JWT.
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // Definir los permisos.
            .authorizeHttpRequests(auth -> auth
                
// Permitir que Spring Boot muestre los errores reales.
.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
.requestMatchers("/error").permitAll()

                // Cualquier visitante puede registrarse o iniciar sesión.
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/usuarios/login",
                    "/api/usuarios/registro"
                ).permitAll()

                // Documentación Swagger.
                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()


                .requestMatchers(
                    HttpMethod.GET,
                    "/api/usuarios/perfil"
                ).authenticated()


        // Cualquier usuario autenticado puede actualizar su perfil.
        .requestMatchers(
            HttpMethod.PUT,
            "/api/usuarios/perfil"
        ).authenticated()



                // Solo administradores pueden administrar usuarios.
                .requestMatchers(
                    "/api/usuarios",
                    "/api/usuarios/**"
                ).hasRole("ADMIN")

                // Las demás rutas requieren autenticación.
                .anyRequest().authenticated()
            )

            // Comprobar el JWT antes de autorizar las solicitudes.
            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
}
