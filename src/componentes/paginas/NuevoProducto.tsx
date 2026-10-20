
import FormularioNuevoProducto from "../organismos/FormularioNuevoProducto";

function NuevoProducto() {
    return (
        <main className="container my-5">

            <div className="row justify-content-center">

                <div className="col-12 col-lg-9">

                    <div className="card border-0 shadow rounded-4 text-dark">

                        <div className="card-body p-4 p-md-5">

                            <h2 className="fw-bold mb-4">
                                Agregar Nuevo Producto
                            </h2>

                            <FormularioNuevoProducto />

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default NuevoProducto;
