import "../../Admin.css";
import CardEstadistica from "../moleculas/CardEstadistica";
import CardGestion from "../moleculas/CardGestion";
import { productos } from "../datos/productos";
import { obtenerUsuarios } from "../servicios/usuariosService";

function ContenidoAdmin() {
    return (
        <main className="container my-5 flex-grow-1">

            {/* Encabezado */}
            <div className="card shadow-lg border-0 mb-4">
                <div className="card-body p-4 text-start">

                    <h2 className="fw-bold text-dark mb-2">
                        Panel de Control General
                    </h2>

                    <p className="text-muted">
                        Gestión de catálogo, cuentas de usuarios
                        y parámetros del sistema.
                    </p>

                </div>
            </div>

            {/* Estadísticas */}
            <div className="row g-3 mb-4">

                <div className="col-12 col-md-4">
                    <CardEstadistica
                        titulo="Productos"
                        cantidad={`${productos.length} Activos`}
                        icono="box-seam"
                        color="primary"
                    />
                </div>

                <div className="col-12 col-md-4">
                    <CardEstadistica
                        titulo="Usuarios"
                        cantidad={`${obtenerUsuarios().length} Registrados`}
                        icono="people"
                        color="success"
                    />
                </div>

                <div className="col-12 col-md-4">
                    <CardEstadistica
                        titulo="Ventas Hoy"
                        cantidad="8 Pedidos"
                        icono="cart-check"
                        color="warning"
                    />
                </div>

            </div>

            {/* Opciones de administración */}
            <div className="row g-4">

                <div className="col-md-6">
                    <CardGestion
                        titulo="Gestión de Productos"
                        descripcion="Agrega nuevos instrumentos, actualiza precios, controla el stock o edita la información del catálogo."
                        icono="journal-album"
                        color="primary"
                        destino="/admin/productos"
                    />
                </div>

                <div className="col-md-6">
                    <CardGestion
                        titulo="Gestión de Usuarios"
                        descripcion="Administra los accesos de clientes, crea cuentas de administradores y modifica roles del sistema."
                        icono="person-gear"
                        color="success"
                        destino="/admin/usuarios"
                    />
                </div>

            </div>

        </main>
    );
}

export default ContenidoAdmin;
