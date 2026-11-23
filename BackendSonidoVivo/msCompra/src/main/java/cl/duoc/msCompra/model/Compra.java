package cl.duoc.msCompra.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "compras")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private String nombreComprador;
    private String correoComprador;
    private String metodoPago;
    private Double total;
    private String fecha;
    private String estado;

    @ElementCollection
    @CollectionTable(
        name = "compra_articulos",
        joinColumns = @JoinColumn(name = "compra_id")
    )
    private List<Articulo> articulos = new ArrayList<>();

    public Compra() {}

    public Compra(Long usuarioId, Double total,
                  String fecha, String estado) {
        this.usuarioId = usuarioId;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNombreComprador() {
        return nombreComprador;
    }
    public void setNombreComprador(String nombreComprador) {
        this.nombreComprador = nombreComprador;
    }

    public String getCorreoComprador() {
        return correoComprador;
    }
    public void setCorreoComprador(String correoComprador) {
        this.correoComprador = correoComprador;
    }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<Articulo> getArticulos() {
        return articulos;
    }
    public void setArticulos(List<Articulo> articulos) {
        this.articulos = articulos;
    }

    @Embeddable
    public static class Articulo {

        private Long productoId;
        private String nombre;
        private Integer cantidad;
        private Double precio;

        public Articulo() {}

        public Long getProductoId() { return productoId; }
        public void setProductoId(Long productoId) {
            this.productoId = productoId;
        }

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) {
            this.cantidad = cantidad;
        }

        public Double getPrecio() { return precio; }
        public void setPrecio(Double precio) {
            this.precio = precio;
        }
    }
}
