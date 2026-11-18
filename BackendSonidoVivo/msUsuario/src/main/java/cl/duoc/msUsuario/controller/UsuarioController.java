package cl.duoc.msUsuario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cl.duoc.msUsuario.dto.LoginRequest;
import cl.duoc.msUsuario.dto.TokenResponse;
import cl.duoc.msUsuario.model.Usuario;
import cl.duoc.msUsuario.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // POST: Login y emisión de Token JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = usuarioService.autenticar(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(new TokenResponse(token, "Autenticación exitosa"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Error: " + e.getMessage());
        }
    }

    // POST: Registro público (encripta contraseña implícitamente)
    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.registrar(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioService.listarTodos();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear nuevo (vía Admin o CRUD interno)
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario usuario) {
        Usuario creado = usuarioService.guardar(usuario);
        return ResponseEntity.ok(creado);
    }

    // PUT: Actualizar existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuarioDetalles) {
        Usuario actualizado = usuarioService.actualizar(id, usuarioDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (usuarioService.buscarPorId(id).isPresent()) {
            usuarioService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}