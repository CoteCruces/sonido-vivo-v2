package cl.duoc.msCarrito.controller;

import cl.duoc.msCarrito.model.Carrito;
import cl.duoc.msCarrito.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@Tag(name = "Carrito", description = "Operaciones del carrito de compras")
@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    // GET: Obtener todos los carritos registrados
    @Operation(summary = "Listar registros del carrito", description = "Obtiene todos los registros del carrito.")
    @GetMapping
    public List<Carrito> obtenerTodos() {
        return carritoService.listarTodos();
    }

    // GET: Obtener ítems del carrito por ID de usuario
    @Operation(summary = "Consultar carrito por usuario", description = "Obtiene los registros del carrito asociados al identificador de usuario.")
    @GetMapping("/usuario/{usuarioId}")
    public List<Carrito> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return carritoService.listarPorUsuario(usuarioId);
    }

    // GET: Obtener ítem por ID específico de la tabla
    @Operation(summary = "Buscar registro de carrito", description = "Consulta un registro específico del carrito.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtenerPorId(@PathVariable Long id) {
        return carritoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Agregar un producto al carrito
    @Operation(summary = "Agregar producto al carrito", description = "Crea un registro de producto y cantidad en el carrito.")
    @PostMapping
    public Carrito crear(@RequestBody Carrito carrito) {
        return carritoService.guardar(carrito);
    }

    // PUT: Actualizar cantidad o detalles de un ítem del carrito
    @Operation(summary = "Actualizar registro del carrito", description = "Modifica un registro del carrito, incluida su cantidad.")
    @PutMapping("/{id}")
    public ResponseEntity<Carrito> actualizar(@PathVariable Long id, @RequestBody Carrito carritoDetalles) {
        Carrito actualizado = carritoService.actualizar(id, carritoDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar un producto del carrito por ID
    @Operation(summary = "Eliminar registro del carrito", description = "Elimina un registro específico del carrito.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Registro eliminado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (carritoService.buscarPorId(id).isPresent()) {
            carritoService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}