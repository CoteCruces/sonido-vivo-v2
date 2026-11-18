
package cl.duoc.msProducto.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;

    // Guarda la categoría para los filtros del catálogo.
    private String categoria;

    // Guarda la ruta de la imagen del producto.
    private String imagen;

    // Permite guardar descripciones más extensas.
    @Column(columnDefinition = "TEXT")
    private String descripcionLarga;

    public Producto() {}

    public Producto(String nombre, String descripcion,
                    Double precio, Integer stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    // Obtener y modificar el ID.
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // Obtener y modificar el nombre.
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    // Obtener y modificar la descripción.
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    // Obtener y modificar el precio.
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    // Obtener y modificar el stock.
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    // Obtener y modificar la categoría.
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    // Obtener y modificar la imagen.
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    // Obtener y modificar la descripción larga.
    public String getDescripcionLarga() {
        return descripcionLarga;
    }

    public void setDescripcionLarga(String descripcionLarga) {
        this.descripcionLarga = descripcionLarga;
    }
}
