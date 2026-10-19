
import { Link, useParams } from "react-router-dom";
import { productos } from "../datos/productos";

function DetalleProducto() {

    // Obtener el ID desde la URL
    const { id } = useParams();

    // Buscar el producto correspondiente
    const producto = productos.find(
        (p) => p.id === Number(id)
    );

    // Si no existe el producto
    if (!producto) {
        return (
            <div className="container mt-5">
                <h2>Producto no encontrado</h2>

                <Link to="/catalogo" className="btn btn-primary">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <div className="row">

                {/* Imagen del producto */}
                <div className="col-md-6">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid"
                        style={{
                            width: "100%",
                            height: "450px",
                            objectFit: "contain"
                        }}
                    />
                </div>

                {/* Información del producto */}
                <div className="col-md-6">

                    <h1>{producto.nombre}</h1>

                    <p className="text-muted">
                        {producto.categoria}
                    </p>

                    <h2 className="text-primary">
                        ${producto.precio.toLocaleString("es-CL")}
                    </h2>

                    <hr />

                    <h4>Descripción</h4>

                    <p>
                        {producto.descripcionLarga ||
                         producto.descripcion}
                    </p>

                    <p>
                        <strong>Stock disponible:</strong>{" "}
                        {producto.stock}
                    </p>

                    <Link
                        to="/catalogo"
                        className="btn btn-secondary mt-3"
                    >
                        Volver al catálogo
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default DetalleProducto;
