package cl.duoc.msProducto.service;

import cl.duoc.msProducto.model.Producto;
import cl.duoc.msProducto.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    
    public Producto actualizar(Long id, Producto productoDetalles) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoDetalles.getNombre());
            producto.setDescripcion(productoDetalles.getDescripcion());
            producto.setPrecio(productoDetalles.getPrecio());
            producto.setStock(productoDetalles.getStock());

            // Actualiza la categoría del producto.
            producto.setCategoria(productoDetalles.getCategoria());

            // Actualiza la ruta de la imagen del producto.
            producto.setImagen(productoDetalles.getImagen());

            // Actualiza la descripción larga del producto.
            producto.setDescripcionLarga(productoDetalles.getDescripcionLarga());

            return productoRepository.save(producto);
        }).orElseGet(() -> {
            productoDetalles.setId(id);
            return productoRepository.save(productoDetalles);
        });
    }

    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
}
