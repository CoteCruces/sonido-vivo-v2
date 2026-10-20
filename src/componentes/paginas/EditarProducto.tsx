import { Link, useParams } from "react-router-dom";

import NavbarAdmin from "../organismos/NavbarAdmin";
import FooterAdmin from "../organismos/FooterAdmin";
import FormularioNuevoProducto from "../organismos/FormularioNuevoProducto";

import { obtenerProductos } from "../servicios/productosService";

function EditarProducto() {

    // Obtener el ID del producto desde la URL
    const { id } = useParams();

    // Buscar el producto correspondiente
    const producto = obtenerProductos().find(
        (p) => p.id === Number(id)
    );

    return (
        <div className="panel-admin d-flex flex-column min-vh-100">

            <NavbarAdmin />

            <main className="container my-5 flex-grow-1">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9">

                        {!producto ? (

                            <div className="alert alert-danger">
                                <h4>Producto no encontrado</h4>

                                <Link
                                    to="/admin/productos"
                                    className="btn btn-secondary mt-3"
                                >
                                    Volver al Mantenedor
                                </Link>
                            </div>

                        ) : (

                            <div className="card shadow-sm border-0 rounded-4">

                                <div className="card-body p-4 p-md-5 text-dark">

                                    <h2 className="fw-bold mb-3">
                                        Editar Producto
                                    </h2>

                                    <p className="text-muted mb-4">
                                        Modifica los datos del producto
                                        seleccionado.
                                    </p>

                                    {/* Formulario con los datos actuales */}
                                    <FormularioNuevoProducto
                                        key={producto.id}
                                        producto={producto}
                                    />

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </main>

            <FooterAdmin />

        </div>
    );
}

export default EditarProducto;
