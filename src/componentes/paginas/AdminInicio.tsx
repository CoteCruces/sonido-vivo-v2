import { Link } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
export default function AdminInicio() {
  const { productos, usuarios } = useTienda();
  return (
    <main className="container my-5 flex-grow-1">
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-1">Panel de Control General</h2>
          <p className="text-muted mb-0">
            Gestión de catálogo, cuentas de usuarios y parámetros del sistema.
          </p>
        </div>
      </div>
      <div className="d-flex flex-nowrap gap-3 mb-4 w-100">
        <div className="card border-0 shadow-sm bg-light flex-fill">
          <div className="card-body d-flex align-items-center gap-3">
            <i className="bi bi-box-seam display-5 text-primary" />
            <div>
              <h5 className="card-title text-muted mb-0">Productos</h5>
              <h3 className="fw-bold mb-0 text-dark">
                {productos.length} Activos
              </h3>
            </div>
          </div>
        </div>
        <div className="card border-0 shadow-sm bg-light flex-fill">
          <div className="card-body d-flex align-items-center gap-3">
            <i className="bi bi-people display-5 text-success" />
            <div>
              <h5 className="card-title text-muted mb-0">Usuarios</h5>
              <h3 className="fw-bold mb-0 text-dark">
                {usuarios.length} Registrados
              </h3>
            </div>
          </div>
        </div>
        <div className="card border-0 shadow-sm bg-light flex-fill">
          <div className="card-body d-flex align-items-center gap-3">
            <i className="bi bi-cart-check display-5 text-warning" />
            <div>
              <h5 className="card-title text-muted mb-0">Ventas Hoy</h5>
              <h3 className="fw-bold mb-0 text-dark">8 Pedidos</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body p-4 text-dark">
              <h4 className="fw-bold">
                <i className="bi bi-journal-album text-primary me-2" />
                Gestión de Productos
              </h4>
              <p className="text-muted">
                Agrega nuevos instrumentos, actualiza precios, controla el stock
                o edita la información del catálogo.
              </p>
              <Link
                to="/admin/productos"
                className="btn btn-primary fw-semibold"
              >
                Administrar Productos
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body p-4 text-dark">
              <h4 className="fw-bold">
                <i className="bi bi-person-gear text-success me-2" />
                Gestión de Usuarios
              </h4>
              <p className="text-muted">
                Administra los accesos de clientes, crea cuentas de
                administradores y modifica roles del sistema.
              </p>
              <Link
                to="/admin/usuarios"
                className="btn btn-success fw-semibold"
              >
                Administrar Usuarios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
