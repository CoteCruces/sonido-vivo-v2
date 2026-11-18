package cl.duoc.msCompra.model;

import jakarta.persistence.*;

@Entity
@Table(name = "compras")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private Double total;
    private String fecha;
    private String estado; // Ej: PENDIENTE, PAGADO, ENVIADO

    public Compra() {}

    public Compra(Long usuarioId, Double total, String fecha, String estado) {
        this.usuarioId = usuarioId;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
