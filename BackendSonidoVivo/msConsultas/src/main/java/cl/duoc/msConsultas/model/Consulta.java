package cl.duoc.msConsultas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "consultas")
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private String asunto;
    private String mensaje;
    private String respuesta;

    public Consulta() {}

    public Consulta(Long usuarioId, String asunto, String mensaje, String respuesta) {
        this.usuarioId = usuarioId;
        this.asunto = asunto;
        this.mensaje = mensaje;
        this.respuesta = respuesta;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getAsunto() { return asunto; }
    public void setAsunto(String asunto) { this.asunto = asunto; }

    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }

    public String getRespuesta() { return respuesta; }
    public void setRespuesta(String respuesta) { this.respuesta = respuesta; }
}