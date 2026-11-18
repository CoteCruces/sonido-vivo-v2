package cl.duoc.msCompra.repository;

import cl.duoc.msCompra.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    // Método para listar todas las compras asociadas a un usuario específico
    List<Compra> findByUsuarioId(Long usuarioId);
}
