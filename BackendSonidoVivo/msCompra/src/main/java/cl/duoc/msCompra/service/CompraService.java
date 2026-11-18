package cl.duoc.msCompra.service;

import cl.duoc.msCompra.model.Compra;
import cl.duoc.msCompra.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    public List<Compra> listarTodas() {
        return compraRepository.findAll();
    }

    public List<Compra> listarPorUsuario(Long usuarioId) {
        return compraRepository.findByUsuarioId(usuarioId);
    }

    public Optional<Compra> buscarPorId(Long id) {
        return compraRepository.findById(id);
    }

    public Compra guardar(Compra compra) {
        return compraRepository.save(compra);
    }

    public Compra actualizar(Long id, Compra compraDetalles) {
        return compraRepository.findById(id).map(compra -> {
            compra.setUsuarioId(compraDetalles.getUsuarioId());
            compra.setTotal(compraDetalles.getTotal());
            compra.setFecha(compraDetalles.getFecha());
            compra.setEstado(compraDetalles.getEstado());
            return compraRepository.save(compra);
        }).orElseGet(() -> {
            compraDetalles.setId(id);
            return compraRepository.save(compraDetalles);
        });
    }

    public void eliminar(Long id) {
        compraRepository.deleteById(id);
    }
}
