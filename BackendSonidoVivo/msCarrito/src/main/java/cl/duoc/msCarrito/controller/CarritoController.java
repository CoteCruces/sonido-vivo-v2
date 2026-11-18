package cl.duoc.msCarrito.controller;

import cl.duoc.msCarrito.model.Carrito;
import cl.duoc.msCarrito.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    // GET: Obtener todos los carritos registrados
    @GetMapping
    public List<Carrito> obtenerTodos() {
        return carritoService.listarTodos();
    }

    // GET: Obtener ítems del carrito por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<Carrito> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return carritoService.listarPorUsuario(usuarioId);
    }

    // GET: Obtener ítem por ID específico de la tabla
    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtenerPorId(@PathVariable Long id) {
        return carritoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Agregar un producto al carrito
    @PostMapping
    public Carrito crear(@RequestBody Carrito carrito) {
        return carritoService.guardar(carrito);
    }

    // PUT: Actualizar cantidad o detalles de un ítem del carrito
    @PutMapping("/{id}")
    public ResponseEntity<Carrito> actualizar(@PathVariable Long id, @RequestBody Carrito carritoDetalles) {
        Carrito actualizado = carritoService.actualizar(id, carritoDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar un producto del carrito por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (carritoService.buscarPorId(id).isPresent()) {
            carritoService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}