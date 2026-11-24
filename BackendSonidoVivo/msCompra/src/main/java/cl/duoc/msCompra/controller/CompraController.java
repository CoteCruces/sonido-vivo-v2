package cl.duoc.msCompra.controller;

import cl.duoc.msCompra.model.Compra;
import cl.duoc.msCompra.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@Tag(name = "Compras", description = "Gestión de pedidos y compras")
@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;

    // GET: Obtener todas las compras
    @Operation(summary = "Listar compras", description = "Obtiene todas las compras registradas.")
    @GetMapping
    public List<Compra> obtenerTodas() {
        return compraService.listarTodas();
    }

    // GET: Obtener compras por ID de usuario
    @Operation(summary = "Consultar compras por usuario", description = "Obtiene las compras asociadas al identificador de usuario.")
    @GetMapping("/usuario/{usuarioId}")
    public List<Compra> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return compraService.listarPorUsuario(usuarioId);
    }

    // GET: Obtener compra específica por ID
    @Operation(summary = "Buscar compra por ID", description = "Consulta una compra específica.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Compra> obtenerPorId(@PathVariable Long id) {
        return compraService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Registrar una nueva compra (orden de pedido)
    @Operation(summary = "Registrar compra", description = "Registra un pedido con sus datos y artículos.")
    @PostMapping
    public Compra crear(@RequestBody Compra compra) {
        return compraService.guardar(compra);
    }

    // PUT: Actualizar estado u otros datos de la compra
    @Operation(summary = "Actualizar compra", description = "Actualiza los datos o el estado de una compra.")
    @PutMapping("/{id}")
    public ResponseEntity<Compra> actualizar(@PathVariable Long id, @RequestBody Compra compraDetalles) {
        Compra actualizado = compraService.actualizar(id, compraDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar una compra por ID
    @Operation(summary = "Eliminar compra", description = "Elimina una compra por su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Registro eliminado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (compraService.buscarPorId(id).isPresent()) {
            compraService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
