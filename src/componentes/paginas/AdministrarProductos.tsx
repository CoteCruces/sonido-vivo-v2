
import { Link } from "react-router-dom";
import NavbarAdmin from "../organismos/NavbarAdmin";
import TablaProductosAdmin from "../organismos/TablaProductosAdmin";
import FooterAdmin from "../organismos/FooterAdmin";
import BotonAdmin from "../atomos/BotonAdmin";

function AdministrarProductos() {
    return (
        <div className="panel-admin d-flex flex-column min-vh-100">

            <NavbarAdmin />

            <main className="container my-5 flex-grow-1">

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                    <div>
                        <h2 className="fw-bold">
                            Mantenedor de Productos
                        </h2>

                        <p className="text-muted">
                            Administra los productos de Sonido Vivo.
                        </p>
                    </div>

                    <BotonAdmin
                        texto="Agregar Producto"
                        color="primary"
                        destino="/admin/productos/nuevo"
                    />

                    <Link
                        to="/admin"
                        className="btn btn-secondary"
                    >
                        Volver al Panel
                    </Link>

                </div>

                <TablaProductosAdmin />

            </main>

            <FooterAdmin />

        </div>
    );
}

export default AdministrarProductos;
