package cl.duoc.msConsultas.controller;

import cl.duoc.msConsultas.model.Consulta;
import cl.duoc.msConsultas.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    // GET: Obtener todas las consultas de soporte / dudas
    @GetMapping
    public List<Consulta> obtenerTodas() {
        return consultaService.listarTodas();
    }

    // GET: Obtener consultas filtradas por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<Consulta> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return consultaService.listarPorUsuario(usuarioId);
    }

    // GET: Obtener una consulta específica por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Consulta> obtenerPorId(@PathVariable Long id) {
        return consultaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear una nueva duda/consulta de usuario
    @PostMapping
    public Consulta crear(@RequestBody Consulta consulta) {
        return consultaService.guardar(consulta);
    }

    // PUT: Actualizar una consulta (por ejemplo, para agregar la respuesta del administrador)
    @PutMapping("/{id}")
    public ResponseEntity<Consulta> actualizar(@PathVariable Long id, @RequestBody Consulta consultaDetalles) {
        Consulta actualizado = consultaService.actualizar(id, consultaDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar una consulta por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (consultaService.buscarPorId(id).isPresent()) {
            consultaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
