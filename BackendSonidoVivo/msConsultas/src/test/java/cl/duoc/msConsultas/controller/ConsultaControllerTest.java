package cl.duoc.msConsultas.controller;

import cl.duoc.msConsultas.model.Consulta;
import cl.duoc.msConsultas.service.ConsultaService;
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
class ConsultaControllerTest {

    @Mock
    private ConsultaService consultaService;

    @InjectMocks
    private ConsultaController consultaController;

    private MockMvc obtenerMockMvc() {
        return MockMvcBuilders.standaloneSetup(consultaController).build();
    }

    // Comprueba que GET devuelve todas las consultas registradas.
    @Test
    void testObtenerTodas() throws Exception {
        Consulta primera = new Consulta(7L, "Despacho", "¿Cuánto demora?", "Dos días");
        Consulta segunda = new Consulta(8L, "Garantía", "¿Tiene garantía?", "Sí");
        primera.setId(1L);
        segunda.setId(2L);
        when(consultaService.listarTodas()).thenReturn(List.of(primera, segunda));

        obtenerMockMvc().perform(get("/api/consultas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].asunto").value("Despacho"))
                .andExpect(jsonPath("$[1].usuarioId").value(8));

        verify(consultaService).listarTodas();
    }

    // Comprueba que GET por usuario devuelve las consultas de ese usuario.
    @Test
    void testObtenerPorUsuario() throws Exception {
        Consulta consulta = new Consulta(7L, "Despacho", "¿Cuánto demora?", "Dos días");
        consulta.setId(1L);
        when(consultaService.listarPorUsuario(7L)).thenReturn(List.of(consulta));

        obtenerMockMvc().perform(get("/api/consultas/usuario/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].usuarioId").value(7));

        verify(consultaService).listarPorUsuario(7L);
    }

    // Comprueba que GET por ID devuelve la consulta encontrada.
    @Test
    void testObtenerPorId() throws Exception {
        Consulta consulta = new Consulta(7L, "Despacho", "¿Cuánto demora?", "Dos días");
        consulta.setId(1L);
        when(consultaService.buscarPorId(1L)).thenReturn(Optional.of(consulta));

        obtenerMockMvc().perform(get("/api/consultas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.asunto").value("Despacho"));
    }

    // Comprueba que GET responde 404 cuando la consulta no existe.
    @Test
    void testObtenerPorIdNoEncontrado() throws Exception {
        when(consultaService.buscarPorId(99L)).thenReturn(Optional.empty());

        obtenerMockMvc().perform(get("/api/consultas/99"))
                .andExpect(status().isNotFound());
    }

    // Comprueba que POST guarda una consulta nueva y devuelve sus datos.
    @Test
    void testCrear() throws Exception {
        Consulta guardada = new Consulta(7L, "Despacho", "¿Cuánto demora?", null);
        guardada.setId(1L);
        when(consultaService.guardar(any(Consulta.class))).thenReturn(guardada);

        obtenerMockMvc().perform(post("/api/consultas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuarioId\":7,\"asunto\":\"Despacho\",\"mensaje\":\"¿Cuánto demora?\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.asunto").value("Despacho"));

        verify(consultaService).guardar(any(Consulta.class));
    }

    // Comprueba que PUT actualiza una consulta con una respuesta del administrador.
    @Test
    void testActualizar() throws Exception {
        Consulta actualizada = new Consulta(7L, "Despacho", "¿Cuánto demora?", "Dos días");
        actualizada.setId(1L);
        when(consultaService.actualizar(eq(1L), any(Consulta.class)))
                .thenReturn(actualizada);

        obtenerMockMvc().perform(put("/api/consultas/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuarioId\":7,\"asunto\":\"Despacho\",\"mensaje\":\"¿Cuánto demora?\",\"respuesta\":\"Dos días\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.respuesta").value("Dos días"));

        verify(consultaService).actualizar(eq(1L), any(Consulta.class));
    }

    // Comprueba que DELETE elimina una consulta existente y responde 204.
    @Test
    void testEliminar() throws Exception {
        when(consultaService.buscarPorId(1L))
                .thenReturn(Optional.of(new Consulta(7L, "Despacho", "¿Cuánto demora?", "Dos días")));

        obtenerMockMvc().perform(delete("/api/consultas/1"))
                .andExpect(status().isNoContent());

        verify(consultaService).eliminar(1L);
    }

    // Comprueba que DELETE responde 404 y no elimina una consulta inexistente.
    @Test
    void testEliminarNoEncontrado() throws Exception {
        when(consultaService.buscarPorId(99L)).thenReturn(Optional.empty());

        obtenerMockMvc().perform(delete("/api/consultas/99"))
                .andExpect(status().isNotFound());

        verify(consultaService, never()).eliminar(99L);
    }
}
