package cl.duoc.msCompra.controller;

import cl.duoc.msCompra.model.Compra;
import cl.duoc.msCompra.service.CompraService;
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
class CompraControllerTest {

    @Mock
    private CompraService compraService;

    @InjectMocks
    private CompraController compraController;

    private MockMvc obtenerMockMvc() {
        return MockMvcBuilders.standaloneSetup(compraController).build();
    }

    // Comprueba que GET devuelve todas las compras registradas.
    @Test
    void testObtenerTodas() throws Exception {
        Compra primera = new Compra(7L, 25000.0, "2026-11-18", "PAGADO");
        Compra segunda = new Compra(8L, 15000.0, "2026-11-18", "PENDIENTE");
        primera.setId(1L);
        segunda.setId(2L);
        when(compraService.listarTodas()).thenReturn(List.of(primera, segunda));

        obtenerMockMvc().perform(get("/api/compras"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].estado").value("PAGADO"))
                .andExpect(jsonPath("$[1].total").value(15000.0));

        verify(compraService).listarTodas();
    }

    // Comprueba que GET por usuario devuelve las compras de ese usuario.
    @Test
    void testObtenerPorUsuario() throws Exception {
        Compra compra = new Compra(7L, 25000.0, "2026-11-18", "PAGADO");
        compra.setId(1L);
        when(compraService.listarPorUsuario(7L)).thenReturn(List.of(compra));

        obtenerMockMvc().perform(get("/api/compras/usuario/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].usuarioId").value(7));

        verify(compraService).listarPorUsuario(7L);
    }

    // Comprueba que GET por ID devuelve la compra encontrada.
    @Test
    void testObtenerPorId() throws Exception {
        Compra compra = new Compra(7L, 25000.0, "2026-11-18", "PAGADO");
        compra.setId(1L);
        when(compraService.buscarPorId(1L)).thenReturn(Optional.of(compra));

        obtenerMockMvc().perform(get("/api/compras/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.estado").value("PAGADO"));
    }

    // Comprueba que GET responde 404 cuando la compra no existe.
    @Test
    void testObtenerPorIdNoEncontrado() throws Exception {
        when(compraService.buscarPorId(99L)).thenReturn(Optional.empty());

        obtenerMockMvc().perform(get("/api/compras/99"))
                .andExpect(status().isNotFound());
    }

    // Comprueba que POST registra una compra nueva y devuelve sus datos.
    @Test
    void testCrear() throws Exception {
        Compra guardada = new Compra(7L, 25000.0, "2026-11-18", "PENDIENTE");
        guardada.setId(1L);
        when(compraService.guardar(any(Compra.class))).thenReturn(guardada);

        obtenerMockMvc().perform(post("/api/compras")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuarioId\":7,\"total\":25000,\"fecha\":\"2026-11-18\",\"estado\":\"PENDIENTE\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.total").value(25000.0))
                .andExpect(jsonPath("$.estado").value("PENDIENTE"));

        verify(compraService).guardar(any(Compra.class));
    }

    // Comprueba que PUT actualiza los datos de una compra.
    @Test
    void testActualizar() throws Exception {
        Compra actualizada = new Compra(7L, 25000.0, "2026-11-18", "PAGADO");
        actualizada.setId(1L);
        when(compraService.actualizar(eq(1L), any(Compra.class)))
                .thenReturn(actualizada);

        obtenerMockMvc().perform(put("/api/compras/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuarioId\":7,\"total\":25000,\"fecha\":\"2026-11-18\",\"estado\":\"PAGADO\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.estado").value("PAGADO"));

        verify(compraService).actualizar(eq(1L), any(Compra.class));
    }

    // Comprueba que DELETE elimina una compra existente y responde 204.
    @Test
    void testEliminar() throws Exception {
        when(compraService.buscarPorId(1L))
                .thenReturn(Optional.of(new Compra(7L, 25000.0, "2026-11-18", "PAGADO")));

        obtenerMockMvc().perform(delete("/api/compras/1"))
                .andExpect(status().isNoContent());

        verify(compraService).eliminar(1L);
    }

    // Comprueba que DELETE responde 404 y no elimina una compra inexistente.
    @Test
    void testEliminarNoEncontrado() throws Exception {
        when(compraService.buscarPorId(99L)).thenReturn(Optional.empty());

        obtenerMockMvc().perform(delete("/api/compras/99"))
                .andExpect(status().isNotFound());

        verify(compraService, never()).eliminar(99L);
    }
}
