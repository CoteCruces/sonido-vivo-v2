package cl.duoc.msUsuario.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.duoc.msUsuario.model.Usuario;
import cl.duoc.msUsuario.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario usuarioDetalles) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioDetalles.getNombre());
            usuario.setEmail(usuarioDetalles.getEmail());
            usuario.setPassword(usuarioDetalles.getPassword());
            return usuarioRepository.save(usuario);
        }).orElseGet(() -> {
            usuarioDetalles.setId(id);
            return usuarioRepository.save(usuarioDetalles);
        });
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}