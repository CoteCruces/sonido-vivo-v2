package cl.duoc.msCarrito.controller;

import cl.duoc.msCarrito.model.Carrito;
import cl.duoc.msCarrito.service.CarritoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CarritoControllerTest {

    @Mock
    private CarritoService carritoService;

    @InjectMocks
    private CarritoController carritoController;

    private MockMvc obtenerMockMvc() {
        return MockMvcBuilders.standaloneSetup(carritoController).build();
    }

    // Comprueba que GET devuelve todos los productos guardados en los carritos.
    @Test
    void testObtenerTodos() throws Exception {
        Carrito primero = new Carrito(7L, 10L, 2);
        Carrito segundo = new Carrito(7L, 20L, 1);
        primero.setId(1L);
        segundo.setId(2L);
        when(carritoService.listarTodos()).thenReturn(List.of(primero, segundo));

        obtenerMockMvc().perform(get("/api/carrito"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].productoId").value(10))
                .andExpect(jsonPath("$[1].cantidad").value(1));

        verify(carritoService).listarTodos();
    }

    // Comprueba que GET por usuario devuelve solo los productos de ese usuario.
    @Test
    void testObtenerPorUsuario() throws Exception {
        Carrito item = new Carrito(7L, 10L, 2);
        item.setId(1L);
        when(carritoService.listarPorUsuario(7L)).thenReturn(List.of(item));

        obtenerMockMvc().perform(get("/api/carrito/usuario/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].usuarioId").value(7))
                .andExpect(jsonPath("$[0].cantidad").value(2));

        verify(carritoService).listarPorUsuario(7L);
    }

    // Comprueba que GET por ID devuelve el producto del carrito encontrado.
    @Test
    void testObtenerPorId() throws Exception {
        Carrito item = new Carrito(7L, 10L, 2);
        item.setId(1L);
        when(carritoService.buscarPorId(1L)).thenReturn(Optional.of(item));

        obtenerMockMvc().perform(get("/api/carrito/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.productoId").value(10));
    }

    // Comprueba que GET responde 404 cuando el producto del carrito no existe.
    @Test
    void testObtenerPorIdNoEncontrado() throws Exception {
        when(carritoService.buscarPorId(99L)).thenReturn(Optional.empty());

        obtenerMockMvc().perform(get("/api/carrito/99"))
                .andExpect(status().isNotFound());
    }

    // Comprueba que POST agrega un producto al carrito y devuelve sus datos.
    @Test
    void testCrear() throws Exception {
        Carrito guardado = new Carrito(7L, 10L, 2);
        guardado.setId(1L);
        when(carritoService.guardar(any(Carrito.class))).thenReturn(guardado);

        obtenerMockMvc().perform(post("/api/carrito")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuarioId\":7,\"productoId\":10,\"cantidad\":2}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.cantidad").value(2));

        verify(carritoService).guardar(any(Carrito.class));
    }

    // Comprueba que PUT modifica la cantidad de un producto del carrito.
    @Test
    void testActualizar() throws Exception {
        Carrito actualizado = new Carrito(7L, 10L, 3);
        actualizado.setId(1L);
        when(carritoService.actualizar(eq(1L), any(Carrito.class)))
                .thenReturn(actualizado);

        obtenerMockMvc().perform(put("/api/carrito/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuarioId\":7,\"productoId\":10,\"cantidad\":3}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.cantidad").value(3));

        verify(carritoService).actualizar(eq(1L), any(Carrito.class));
    }

    // Comprueba que DELETE elimina un producto existente y responde 204.
    @Test
    void testEliminar() throws Exception {
        when(carritoService.buscarPorId(1L))
                .thenReturn(Optional.of(new Carrito(7L, 10L, 2)));

        obtenerMockMvc().perform(delete("/api/carrito/1"))
                .andExpect(status().isNoContent());

        verify(carritoService).eliminar(1L);
    }

    // Comprueba que DELETE responde 404 y no elimina un producto inexistente.
    @Test
    void testEliminarNoEncontrado() throws Exception {
        when(carritoService.buscarPorId(99L)).thenReturn(Optional.empty());

        obtenerMockMvc().perform(delete("/api/carrito/99"))
                .andExpect(status().isNotFound());

        verify(carritoService, never()).eliminar(99L);
    }
}
