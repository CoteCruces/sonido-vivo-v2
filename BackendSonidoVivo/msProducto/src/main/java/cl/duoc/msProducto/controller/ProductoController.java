package cl.duoc.msProducto.controller;

import cl.duoc.msProducto.model.Producto;
import cl.duoc.msProducto.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@Tag(name = "Productos", description = "Operaciones de catálogo e inventario")
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // GET: Obtener todos los productos
    @Operation(summary = "Listar productos", description = "Obtiene todos los productos registrados.")
    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoService.listarTodos();
    }

    // GET: Obtener producto por ID
    @Operation(summary = "Buscar producto por ID", description = "Consulta un producto por su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear un nuevo producto
    @Operation(summary = "Crear producto", description = "Registra un nuevo producto en el catálogo.")
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }

    // PUT: Actualizar un producto existente
    @Operation(summary = "Actualizar producto", description = "Modifica los datos de un producto existente.")
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto productoDetalles) {
        Producto actualizado = productoService.actualizar(id, productoDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar un producto por ID
    @Operation(summary = "Eliminar producto", description = "Elimina un producto por su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Registro eliminado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (productoService.buscarPorId(id).isPresent()) {
            productoService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
