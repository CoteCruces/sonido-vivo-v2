import NavbarAdmin from "../organismos/NavbarAdmin";
import FooterAdmin from "../organismos/FooterAdmin";
import TablaUsuariosAdmin from "../organismos/TablaUsuariosAdmin";

import BotonAdmin from "../atomos/BotonAdmin";

function AdministrarUsuarios() {
    return (
        <div className="panel-admin d-flex flex-column min-vh-100">

            <NavbarAdmin />

            <main className="container my-5 flex-grow-1">

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                    <div className="text-start">
                        <h2 className="fw-bold">
                            Mantenedor de Usuarios
                        </h2>

                        <p className="text-muted">
                            Administra las cuentas registradas
                            en Sonido Vivo.
                        </p>
                    </div>

                    
                    <div className="d-flex flex-wrap gap-2">

                        <BotonAdmin
                            texto="Nuevo Usuario"
                            color="success"
                            destino="/admin/usuarios/nuevo"
                        />

                        <BotonAdmin
                            texto="Volver al Panel"
                            color="primary"
                            destino="/admin"
                        />

                    </div>


                </div>

                <TablaUsuariosAdmin />

            </main>

            <FooterAdmin />

        </div>
    );
}

export default AdministrarUsuarios;
