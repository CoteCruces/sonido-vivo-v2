package cl.duoc.msCarrito.repository;

import cl.duoc.msCarrito.model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    // Método útil para buscar todos los ítems que pertenecen a un usuario específico
    List<Carrito> findByUsuarioId(Long usuarioId);
}