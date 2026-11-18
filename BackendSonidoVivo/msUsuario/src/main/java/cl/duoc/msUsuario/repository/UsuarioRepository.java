package cl.duoc.msUsuario.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.duoc.msUsuario.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    // JpaRepository ya incluye findAll(), findById(), save(), deleteById(), etc.
}
    