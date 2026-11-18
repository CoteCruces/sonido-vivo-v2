
package cl.duoc.msUsuario.controller;

import cl.duoc.msUsuario.dto.LoginRequest;
import cl.duoc.msUsuario.model.Usuario;
import cl.duoc.msUsuario.service.UsuarioService;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @InjectMocks
    private UsuarioController usuarioController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private MockMvc obtenerMockMvc() {
        return MockMvcBuilders
                .standaloneSetup(usuarioController)
                .build();
    }

    // 1. TEST LOGIN EXITOSO
    @Test
    void testLoginExitoso() throws Exception {

        LoginRequest request = new LoginRequest();
        request.setEmail("test@gmail.com");
        request.setPassword("123456");

        when(usuarioService.autenticar(
                "test@gmail.com", "123456"))
                .thenReturn("jwt-token-prueba");

        obtenerMockMvc().perform(post("/api/usuarios/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token-prueba"))
                .andExpect(jsonPath("$.mensaje")
                        .value("Autenticación exitosa"));

        verify(usuarioService, times(1))
                .autenticar("test@gmail.com", "123456");
    }

    // 2. TEST LOGIN FALLIDO
    @Test
    void testLoginFallido() throws Exception {

        LoginRequest request = new LoginRequest();
        request.setEmail("incorrecto@gmail.com");
        request.setPassword("123456");

        when(usuarioService.autenticar(
                "incorrecto@gmail.com", "123456"))
                .thenThrow(new RuntimeException("Credenciales incorrectas"));

        obtenerMockMvc().perform(post("/api/usuarios/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(
                        "Error: Credenciales incorrectas"));
    }

    // 3. TEST REGISTRO
    @Test
    void testRegistrarUsuario() throws Exception {

        Usuario usuario = new Usuario();

        when(usuarioService.registrar(any(Usuario.class)))
                .thenReturn(usuario);

        obtenerMockMvc().perform(post("/api/usuarios/registro")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isOk());

        verify(usuarioService, times(1))
                .registrar(any(Usuario.class));
    }

    // 4. TEST LISTAR TODOS
    @Test
    void testObtenerTodos() throws Exception {

        Usuario usuario1 = new Usuario();
        Usuario usuario2 = new Usuario();

        when(usuarioService.listarTodos())
                .thenReturn(Arrays.asList(usuario1, usuario2));

        obtenerMockMvc().perform(get("/api/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

        verify(usuarioService, times(1)).listarTodos();
    }

    // 5. TEST BUSCAR POR ID
    @Test
    void testObtenerPorId() throws Exception {

        Usuario usuario = new Usuario();

        when(usuarioService.buscarPorId(1L))
                .thenReturn(Optional.of(usuario));

        obtenerMockMvc().perform(get("/api/usuarios/1"))
                .andExpect(status().isOk());

        verify(usuarioService, times(1))
                .buscarPorId(1L);
    }

    // 6. TEST USUARIO NO ENCONTRADO
    @Test
    void testObtenerPorIdNoEncontrado() throws Exception {

        when(usuarioService.buscarPorId(99L))
                .thenReturn(Optional.empty());

        obtenerMockMvc().perform(get("/api/usuarios/99"))
                .andExpect(status().isNotFound());
    }

    // 7. TEST CREAR USUARIO
    @Test
    void testCrearUsuario() throws Exception {

        Usuario usuario = new Usuario();

        when(usuarioService.guardar(any(Usuario.class)))
                .thenReturn(usuario);

        obtenerMockMvc().perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isOk());

        verify(usuarioService, times(1))
                .guardar(any(Usuario.class));
    }

    // 8. TEST ACTUALIZAR USUARIO
    @Test
    void testActualizarUsuario() throws Exception {

        Usuario usuario = new Usuario();

        when(usuarioService.actualizar(eq(1L), any(Usuario.class)))
                .thenReturn(usuario);

        obtenerMockMvc().perform(put("/api/usuarios/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isOk());

        verify(usuarioService, times(1))
                .actualizar(eq(1L), any(Usuario.class));
    }

    // 9. TEST ELIMINAR USUARIO
    @Test
    void testEliminarUsuario() throws Exception {

        Usuario usuario = new Usuario();

        when(usuarioService.buscarPorId(1L))
                .thenReturn(Optional.of(usuario));

        doNothing().when(usuarioService).eliminar(1L);

        obtenerMockMvc().perform(delete("/api/usuarios/1"))
                .andExpect(status().isNoContent());

        verify(usuarioService, times(1)).eliminar(1L);
    }

    // 10. TEST ELIMINAR USUARIO INEXISTENTE
    @Test
    void testEliminarUsuarioNoEncontrado() throws Exception {

        when(usuarioService.buscarPorId(99L))
                .thenReturn(Optional.empty());

        obtenerMockMvc().perform(delete("/api/usuarios/99"))
                .andExpect(status().isNotFound());

        verify(usuarioService, never()).eliminar(99L);
    }
}
