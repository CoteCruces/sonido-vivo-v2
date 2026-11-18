package cl.duoc.msProducto.repository;

import cl.duoc.msProducto.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // JpaRepository provee métodos como findAll(), findById(), save(), deleteById(), etc.
}