package cl.duoc.msCompra.controller;

import cl.duoc.msCompra.model.Compra;
import cl.duoc.msCompra.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;

    // GET: Obtener todas las compras
    @GetMapping
    public List<Compra> obtenerTodas() {
        return compraService.listarTodas();
    }

    // GET: Obtener compras por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<Compra> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return compraService.listarPorUsuario(usuarioId);
    }

    // GET: Obtener compra específica por ID
    @GetMapping("/{id}")
    public ResponseEntity<Compra> obtenerPorId(@PathVariable Long id) {
        return compraService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Registrar una nueva compra (orden de pedido)
    @PostMapping
    public Compra crear(@RequestBody Compra compra) {
        return compraService.guardar(compra);
    }

    // PUT: Actualizar estado u otros datos de la compra
    @PutMapping("/{id}")
    public ResponseEntity<Compra> actualizar(@PathVariable Long id, @RequestBody Compra compraDetalles) {
        Compra actualizado = compraService.actualizar(id, compraDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar una compra por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (compraService.buscarPorId(id).isPresent()) {
            compraService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
