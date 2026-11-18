package cl.duoc.msUsuario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cl.duoc.msUsuario.model.Usuario;
import cl.duoc.msUsuario.repository.UsuarioRepository;
import cl.duoc.msUsuario.security.JwtUtil;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    
public Usuario registrar(Usuario usuario) {

    // La contraseña es obligatoria.
    if (usuario.getPassword() == null ||
        usuario.getPassword().isBlank()) {
        throw new IllegalArgumentException(
            "La contraseña es obligatoria"
        );
    }

    // El registro público siempre crea clientes.
    usuario.setId(null);
    usuario.setRol("CLIENTE");

    // Guardar la contraseña cifrada.
    usuario.setPassword(
        passwordEncoder.encode(usuario.getPassword())
    );

    return usuarioRepository.save(usuario);
}


    public String autenticar(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())) {
            return jwtUtil.generarToken(usuario.getEmail(), usuario.getRol());
        }
        throw new RuntimeException("Credenciales inválidas");
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }


    public Optional<Usuario> buscarPorEmail(String email) {
        return Optional.ofNullable(
            usuarioRepository.findByEmail(email)
        );
    }


    // Siempre encripta la contraseña antes de guardar para que quede segura
public Usuario guardar(Usuario usuario) {
    if (usuario.getPassword() != null && !usuario.getPassword().startsWith("$2a$")) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
    }
    if (usuario.getRol() == null) {
        usuario.setRol("CLIENTE");
    }
    return usuarioRepository.save(usuario);
}

// Encripta en caso de cambio de contraseña


public Usuario actualizar(Long id, Usuario usuarioDetalles) {

    return usuarioRepository.findById(id).map(usuario -> {

        // Validar nombre.
        if (usuarioDetalles.getNombre() == null ||
            usuarioDetalles.getNombre().isBlank()) {
            throw new IllegalArgumentException(
                "El nombre es obligatorio."
            );
        }

        // Validar apellidos.
        if (usuarioDetalles.getApellidos() == null ||
            usuarioDetalles.getApellidos().isBlank()) {
            throw new IllegalArgumentException(
                "Los apellidos son obligatorios."
            );
        }

        // Validar rol.
        String rol = usuarioDetalles.getRol();

        if (!"CLIENTE".equals(rol) &&
            !"ADMIN".equals(rol)) {
            throw new IllegalArgumentException(
                "El rol no es válido."
            );
        }

        // Actualizar los datos permitidos al administrador.
        usuario.setNombre(
            usuarioDetalles.getNombre().trim()
        );

        usuario.setApellidos(
            usuarioDetalles.getApellidos().trim()
        );

        usuario.setRol(rol);

        // Mantener RUN, correo, contraseña y demás datos.
        return usuarioRepository.save(usuario);

    }).orElseThrow(() ->
        new IllegalArgumentException(
            "Usuario no encontrado."
        )
    );
}


    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }


public Optional<Usuario> actualizarPerfil(
        String email,
        Usuario datos) {

    // Buscar al usuario por el correo autenticado.
    Usuario usuario = usuarioRepository.findByEmail(email);

    if (usuario == null) {
        return Optional.empty();
    }

    // Actualizar únicamente los datos personales permitidos.
    usuario.setNombre(datos.getNombre());
    usuario.setApellidos(datos.getApellidos());
    usuario.setFechaNacimiento(datos.getFechaNacimiento());
    usuario.setDireccion(datos.getDireccion());
    usuario.setRegion(datos.getRegion());
    usuario.setComuna(datos.getComuna());

    // Guardar los cambios en MySQL.
    Usuario actualizado = usuarioRepository.save(usuario);

    return Optional.of(actualizado);
}

}