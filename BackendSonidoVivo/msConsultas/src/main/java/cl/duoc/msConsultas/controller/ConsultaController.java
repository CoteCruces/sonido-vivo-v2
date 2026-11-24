package cl.duoc.msConsultas.controller;

import cl.duoc.msConsultas.model.Consulta;
import cl.duoc.msConsultas.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@Tag(name = "Consultas", description = "Registro y atención de consultas de clientes")
@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    // GET: Obtener todas las consultas de soporte / dudas
    @Operation(summary = "Listar consultas", description = "Obtiene todas las consultas enviadas por clientes.")
    @GetMapping
    public List<Consulta> obtenerTodas() {
        return consultaService.listarTodas();
    }

    // GET: Obtener consultas filtradas por ID de usuario
    @Operation(summary = "Consultar mensajes por usuario", description = "Obtiene las consultas vinculadas a un identificador de usuario.")
    @GetMapping("/usuario/{usuarioId}")
    public List<Consulta> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return consultaService.listarPorUsuario(usuarioId);
    }

    // GET: Obtener una consulta específica por su ID
    @Operation(summary = "Buscar consulta por ID", description = "Consulta un mensaje específico.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Consulta> obtenerPorId(@PathVariable Long id) {
        return consultaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear una nueva duda/consulta de usuario
    @Operation(summary = "Registrar consulta", description = "Guarda una consulta con nombre, correo, asunto y mensaje.")
    @PostMapping
    public Consulta crear(@RequestBody Consulta consulta) {
        return consultaService.guardar(consulta);
    }

    // PUT: Actualizar una consulta (por ejemplo, para agregar la respuesta del administrador)
    @Operation(summary = "Responder o actualizar consulta", description = "Actualiza una consulta, incluida la respuesta del administrador.")
    @PutMapping("/{id}")
    public ResponseEntity<Consulta> actualizar(@PathVariable Long id, @RequestBody Consulta consultaDetalles) {
        Consulta actualizado = consultaService.actualizar(id, consultaDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar una consulta por ID
    @Operation(summary = "Eliminar consulta", description = "Elimina una consulta por su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Registro eliminado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (consultaService.buscarPorId(id).isPresent()) {
            consultaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
