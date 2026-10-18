import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
export default function AdminNavbar() {
  const [abierto, setAbierto] = useState(false);
  const { cerrarSesion } = useTienda();
  const navegar = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-warning">
      <div className="container">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/admin"
        >
          <i className="bi bi-shield-lock-fill" /> Sonido Vivo{" "}
          <span className="badge bg-danger fs-6 ms-2">Admin</span>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          aria-label="Navegación de administración"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${abierto ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin"
                end
                onClick={() => setAbierto(false)}
              >
                Inicio Panel
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/productos"
                onClick={() => setAbierto(false)}
              >
                Mantenedor Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/usuarios"
                onClick={() => setAbierto(false)}
              >
                Mantenedor Usuarios
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <Link
              className="btn btn-outline-light btn-sm"
              to={pathname === "/admin" ? "/" : "/catalogo"}
            >
              <i className="bi bi-shop me-1" />
              {pathname === "/admin" ? "Ir al Sitio Público" : "Sitio Público"}
            </Link>
            {pathname === "/admin" && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  cerrarSesion();
                  navegar("/iniciar-sesion");
                }}
              >
                <i className="bi bi-box-arrow-right" /> Salir
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
