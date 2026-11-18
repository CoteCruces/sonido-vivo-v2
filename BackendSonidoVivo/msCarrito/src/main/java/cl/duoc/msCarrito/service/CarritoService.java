package cl.duoc.msCarrito.service;

import cl.duoc.msCarrito.model.Carrito;
import cl.duoc.msCarrito.repository.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    public List<Carrito> listarTodos() {
        return carritoRepository.findAll();
    }

    public List<Carrito> listarPorUsuario(Long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId);
    }

    public Optional<Carrito> buscarPorId(Long id) {
        return carritoRepository.findById(id);
    }

    public Carrito guardar(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public Carrito actualizar(Long id, Carrito carritoDetalles) {
        return carritoRepository.findById(id).map(carrito -> {
            carrito.setUsuarioId(carritoDetalles.getUsuarioId());
            carrito.setProductoId(carritoDetalles.getProductoId());
            carrito.setCantidad(carritoDetalles.getCantidad());
            return carritoRepository.save(carrito);
        }).orElseGet(() -> {
            carritoDetalles.setId(id);
            return carritoRepository.save(carritoDetalles);
        });
    }

    public void eliminar(Long id) {
        carritoRepository.deleteById(id);
    }
}