package cl.duoc.msUsuario.config;

import cl.duoc.msUsuario.model.Usuario;
import cl.duoc.msUsuario.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Crea las dos cuentas de prueba al arrancar msUsuario.
 * No reemplaza usuarios existentes ni duplica cuentas.
 * Solo para el entorno de demostracion/evaluacion.
 */
@Component
public class InicializadorUsuarios implements CommandLineRunner {

    private final UsuarioRepository repositorio;
    private final PasswordEncoder encoder;

    public InicializadorUsuarios(UsuarioRepository repositorio, PasswordEncoder encoder) {
        this.repositorio = repositorio;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        List<Usuario> existentes = repositorio.findAll();

        crearSiFalta(existentes, "18.765.432-7", "Usuario", "Demo",
                "cliente@sonidovivo.test", "Cliente123", "CLIENTE");

        crearSiFalta(existentes, "17.654.321-3", "Administrador", "Demo",
                "admin@sonidovivo.test", "Admin123", "ADMIN");
    }

    private void crearSiFalta(List<Usuario> existentes,
                              String run, String nombre, String apellidos,
                              String email, String clave, String rol) {
        boolean existe = existentes.stream().anyMatch(usuario ->
                email.equalsIgnoreCase(usuario.getEmail()) || run.equalsIgnoreCase(usuario.getRun()));

        if (existe) {
            return;
        }

        Usuario usuario = new Usuario();
        usuario.setRun(run);
        usuario.setNombre(nombre);
        usuario.setApellidos(apellidos);
        usuario.setEmail(email);
        usuario.setPassword(encoder.encode(clave));
        usuario.setRol(rol);
        Usuario guardado = repositorio.save(usuario);
        existentes.add(guardado);
        System.out.println("Sonido Vivo: usuario demo agregado: " + email);
    }
}
