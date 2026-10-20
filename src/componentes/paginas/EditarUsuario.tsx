import { Link, useParams } from "react-router-dom";

import NavbarAdmin from "../organismos/NavbarAdmin";
import FooterAdmin from "../organismos/FooterAdmin";
import FormularioEditarUsuario from "../organismos/FormularioEditarUsuario";

import { obtenerUsuarios } from "../servicios/usuariosService";

function EditarUsuario() {

    // Obtener el RUN desde la URL
    const { run } = useParams();

    // Buscar el usuario seleccionado
    const usuario = obtenerUsuarios().find(
        (u) => u.run === run
    );

    return (
        <div className="panel-admin d-flex flex-column min-vh-100">

            <NavbarAdmin />

            <main className="container my-5 flex-grow-1">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9">

                        {!usuario ? (

                            <div className="alert alert-danger">
                                <h4>Usuario no encontrado</h4>

                                <Link
                                    to="/admin/usuarios"
                                    className="btn btn-secondary mt-3"
                                >
                                    Volver al Mantenedor
                                </Link>
                            </div>

                        ) : (

                            <div className="card shadow-sm border-0 rounded-4">

                                <div className="card-body p-4 p-md-5 text-dark text-start">

                                    <h2 className="fw-bold mb-3">
                                        Editar Usuario
                                    </h2>

                                    <p className="text-muted mb-4">
                                        Modifica la información y el rol
                                        del usuario seleccionado.
                                    </p>

                                    <FormularioEditarUsuario
                                        key={usuario.run}
                                        usuario={usuario}
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

export default EditarUsuario;
