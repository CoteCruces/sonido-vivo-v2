package cl.duoc.msUsuario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import cl.duoc.msUsuario.dto.LoginRequest;
import cl.duoc.msUsuario.dto.TokenResponse;
import cl.duoc.msUsuario.model.Usuario;
import cl.duoc.msUsuario.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@Tag(name = "Usuarios", description = "Registro, autenticación y administración de usuarios")
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // POST: Login y emisión de Token JWT
    @Operation(summary = "Iniciar sesión", description = "Valida las credenciales y devuelve un token JWT si son correctas.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Autenticación exitosa: se devuelve el JWT"),
        @ApiResponse(responseCode = "401", description = "Credenciales incorrectas")
    })
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
    @Operation(summary = "Registrar usuario", description = "Crea una cuenta de usuario mediante el registro público.")
    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.registrar(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    
    @Operation(summary = "Listar usuarios", description = "Obtiene la lista de usuarios registrados.")
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioService.listarTodos();
    }


    // GET: Consultar los datos del usuario autenticado.
    @Operation(summary = "Consultar mi perfil", description = "Obtiene los datos del usuario identificado por la autenticación vigente.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "401", description = "Usuario no autenticado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(
            Authentication authentication) {

        // Comprobar que exista una sesión autenticada.
        if (authentication == null ||
            !authentication.isAuthenticated() ||
            "anonymousUser".equals(authentication.getPrincipal())) {

            return ResponseEntity.status(401).build();
        }

        // Obtener el correo desde el JWT validado.
        String email = authentication.getName();

        // Buscar únicamente al usuario autenticado.
        return usuarioService.buscarPorEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // PUT: Actualizar los datos del usuario autenticado.
    @Operation(summary = "Actualizar mi perfil", description = "Actualiza los datos del usuario autenticado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "401", description = "Usuario no autenticado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @PutMapping("/perfil")
    public ResponseEntity<Usuario> actualizarPerfil(
            Authentication authentication,
            @RequestBody Usuario datos) {

        // Comprobar que exista una sesión autenticada.
        if (authentication == null ||
            !authentication.isAuthenticated() ||
            "anonymousUser".equals(authentication.getPrincipal())) {

            return ResponseEntity.status(401).build();
        }

        // Obtener el correo del usuario desde su JWT.
        String email = authentication.getName();

        // Actualizar únicamente su propia cuenta.
        return usuarioService.actualizarPerfil(email, datos)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
    @Operation(summary = "Buscar usuario por ID", description = "Obtiene un usuario por su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Solicitud exitosa"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear nuevo (vía Admin o CRUD interno)
    @Operation(summary = "Crear usuario", description = "Registra un usuario mediante el endpoint de administración.")
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario usuario) {
        Usuario creado = usuarioService.guardar(usuario);
        return ResponseEntity.ok(creado);
    }

    // PUT: Actualizar existente
    @Operation(summary = "Actualizar usuario", description = "Modifica los datos de un usuario identificado por ID.")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuarioDetalles) {
        Usuario actualizado = usuarioService.actualizar(id, usuarioDetalles);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE: Eliminar por ID
    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario por ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Registro eliminado"),
        @ApiResponse(responseCode = "404", description = "Registro no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (usuarioService.buscarPorId(id).isPresent()) {
            usuarioService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}