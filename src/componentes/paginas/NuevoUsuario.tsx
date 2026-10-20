
import NavbarAdmin from "../organismos/NavbarAdmin";
import FooterAdmin from "../organismos/FooterAdmin";
import FormularioNuevoUsuario from "../organismos/FormularioNuevoUsuario";

function NuevoUsuario() {

    return (
        <div className="panel-admin d-flex flex-column min-vh-100">

            <NavbarAdmin />

            <main className="container my-5 flex-grow-1">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9">

                        <div className="card shadow-sm border-0 rounded-4">

                            <div className="card-body p-4 p-md-5 text-dark text-start">

                                <h2 className="fw-bold mb-3">
                                    Agregar Nuevo Usuario
                                </h2>

                                <p className="text-muted mb-4">
                                    Completa los datos para crear una
                                    cuenta en Sonido Vivo.
                                </p>

                                <FormularioNuevoUsuario />

                            </div>

                        </div>

                    </div>

                </div>

            </main>

            <FooterAdmin />

        </div>
    );
}

export default NuevoUsuario;
