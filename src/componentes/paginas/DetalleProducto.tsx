
import { Link, useParams } from "react-router-dom";
import { productos } from "../datos/productos";

function DetalleProducto() {
    const { id } = useParams();

    const producto = productos.find(
        (p) => p.id === Number(id)
    );

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
        <div className="container my-5">

            {/* Cuadro blanco principal */}
            <div
                className="bg-white rounded-4 shadow p-4 p-md-5 text-dark"
                style={{ maxWidth: "1100px", margin: "auto" }}
            >

                <div className="row g-4 align-items-center">

                    {/* Imagen del producto */}
                    <div className="col-md-6 text-center">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid"
                            style={{
                                width: "100%",
                                height: "500px",
                                objectFit: "contain",
                                padding: "15px"
                            }}
                        />
                    </div>

                    {/* Información del producto */}
                    <div className="col-md-6">

                        <h2 className="fw-bold mb-3">
                            {producto.nombre}
                        </h2>

                        <p className="text-secondary">
                            {producto.categoria}
                        </p>

                        <h3 className="text-primary fw-bold mb-4">
                            ${producto.precio.toLocaleString("es-CL")}
                        </h3>

                        <hr />

                        <h4 className="fw-semibold mt-4">
                            Descripción
                        </h4>

                        <p
                            className="mt-3"
                            style={{
                                lineHeight: "1.8",
                                textAlign: "justify"
                            }}
                        >
                            {producto.descripcionLarga ||
                             producto.descripcion}
                        </p>

                        <p className="mt-4">
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
        </div>
    );
}

export default DetalleProducto;
