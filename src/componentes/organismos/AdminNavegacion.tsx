import { NavLink } from "react-router-dom";
export default function AdminNavegacion() {
  return (
    <nav className="d-flex flex-wrap gap-2 mb-4" aria-label="Administración">
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
        }
      >
        Panel general
      </NavLink>
      <NavLink
        to="/admin/productos"
        className={({ isActive }) =>
          `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
        }
      >
        Productos
      </NavLink>
      <NavLink
        to="/admin/usuarios"
        className={({ isActive }) =>
          `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
        }
      >
        Usuarios
      </NavLink>
    </nav>
  );
}
