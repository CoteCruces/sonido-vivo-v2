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
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        if (usuario.getRol() == null) {
            usuario.setRol("CLIENTE"); // Rol por defecto
        }
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
        usuario.setNombre(usuarioDetalles.getNombre());
        usuario.setEmail(usuarioDetalles.getEmail());
        if (usuarioDetalles.getRol() != null) {
            usuario.setRol(usuarioDetalles.getRol());
        }
        // Solo re-encripta si se envió una contraseña nueva sin encriptar
        if (usuarioDetalles.getPassword() != null && !usuarioDetalles.getPassword().isEmpty()) {
            if (!usuarioDetalles.getPassword().startsWith("$2a$")) {
                usuario.setPassword(passwordEncoder.encode(usuarioDetalles.getPassword()));
            } else {
                usuario.setPassword(usuarioDetalles.getPassword());
            }
        }
        return usuarioRepository.save(usuario);
    }).orElseGet(() -> {
        usuarioDetalles.setId(id);
        return guardar(usuarioDetalles);
    });
}

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}