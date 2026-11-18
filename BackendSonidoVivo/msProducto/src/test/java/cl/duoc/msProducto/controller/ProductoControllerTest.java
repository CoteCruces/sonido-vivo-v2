
package cl.duoc.msProducto.controller;

import cl.duoc.msProducto.model.Producto;
import cl.duoc.msProducto.service.ProductoService;

import tools.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductoController.class)
class ProductoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductoService productoService;

    // ==========================================
    // GET: Obtener todos los productos
    // ==========================================
    @Test
    void testObtenerTodos() throws Exception {

        Producto p1 = new Producto();
        p1.setId(1L);
        p1.setNombre("Audífonos");
        p1.setPrecio(45000.0);
        p1.setStock(10);

        Producto p2 = new Producto();
        p2.setId(2L);
        p2.setNombre("Micrófono");
        p2.setPrecio(80000.0);
        p2.setStock(5);

        when(productoService.listarTodos())
                .thenReturn(Arrays.asList(p1, p2));

        mockMvc.perform(get("/api/productos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nombre").value("Audífonos"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].nombre").value("Micrófono"));
    }

    // ==========================================
    // GET: Obtener producto por ID - Encontrado
    // ==========================================
    @Test
    void testObtenerPorIdEncontrado() throws Exception {

        Producto producto = new Producto();
        producto.setId(1L);
        producto.setNombre("Interfaz de Audio");
        producto.setPrecio(120000.0);
        producto.setStock(8);

        when(productoService.buscarPorId(1L))
                .thenReturn(Optional.of(producto));

        mockMvc.perform(get("/api/productos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Interfaz de Audio"))
                .andExpect(jsonPath("$.precio").value(120000))
                .andExpect(jsonPath("$.stock").value(8));
    }

    // ==========================================
    // GET: Obtener producto por ID - No encontrado
    // ==========================================
    @Test
    void testObtenerPorIdNoEncontrado() throws Exception {

        when(productoService.buscarPorId(99L))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/productos/99"))
                .andExpect(status().isNotFound());
    }

    // ==========================================
    // POST: Crear producto
    // ==========================================
    @Test
    void testCrearProducto() throws Exception {

        Producto producto = new Producto();
        producto.setNombre("Teclado Mecánico");
        producto.setPrecio(65000.0);
        producto.setStock(20);

        Producto guardado = new Producto();
        guardado.setId(1L);
        guardado.setNombre("Teclado Mecánico");
        guardado.setPrecio(65000.0);
        guardado.setStock(20);

        when(productoService.guardar(any(Producto.class)))
                .thenReturn(guardado);

        mockMvc.perform(post("/api/productos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(producto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Teclado Mecánico"))
                .andExpect(jsonPath("$.precio").value(65000))
                .andExpect(jsonPath("$.stock").value(20));

        verify(productoService, times(1))
                .guardar(any(Producto.class));
    }

    // ==========================================
    // PUT: Actualizar producto
    // ==========================================
    @Test
    void testActualizarProducto() throws Exception {

        Producto detalles = new Producto();
        detalles.setNombre("Mouse Gamer");
        detalles.setPrecio(35000.0);
        detalles.setStock(15);

        Producto actualizado = new Producto();
        actualizado.setId(1L);
        actualizado.setNombre("Mouse Gamer");
        actualizado.setPrecio(35000.0);
        actualizado.setStock(15);

        when(productoService.actualizar(eq(1L), any(Producto.class)))
                .thenReturn(actualizado);

        mockMvc.perform(put("/api/productos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(detalles)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Mouse Gamer"))
                .andExpect(jsonPath("$.precio").value(35000))
                .andExpect(jsonPath("$.stock").value(15));

        verify(productoService, times(1))
                .actualizar(eq(1L), any(Producto.class));
    }

    // ==========================================
    // DELETE: Eliminar producto - Encontrado
    // ==========================================
    @Test
    void testEliminarProducto() throws Exception {

        Producto producto = new Producto();
        producto.setId(1L);
        producto.setNombre("Parlante Bluetooth");

        when(productoService.buscarPorId(1L))
                .thenReturn(Optional.of(producto));

        doNothing().when(productoService).eliminar(1L);

        mockMvc.perform(delete("/api/productos/1"))
                .andExpect(status().isNoContent());

        verify(productoService, times(1))
                .eliminar(1L);
    }

    // ==========================================
    // DELETE: Eliminar producto - No encontrado
    // ==========================================
    @Test
    void testEliminarProductoNoEncontrado() throws Exception {

        when(productoService.buscarPorId(99L))
                .thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/productos/99"))
                .andExpect(status().isNotFound());

        verify(productoService, never()).eliminar(99L);
    }
}
