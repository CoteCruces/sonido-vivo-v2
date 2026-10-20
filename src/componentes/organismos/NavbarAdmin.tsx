import "../../Admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../servicios/sesionesService";

function NavbarAdmin() {
    const navigate = useNavigate();

    const salir = () => {
        cerrarSesion();
        navigate("/login", { replace: true });
    };

    const [abierto, setAbierto] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-warning">
            <div className="container">

                <Link
                    className="navbar-brand fw-bold d-flex align-items-center gap-2"
                    to="/admin"
                >
                    <i className="bi bi-shield-lock-fill" />
                    Sonido Vivo

                    <span className="badge bg-danger ms-2">
                        Admin
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setAbierto(!abierto)}
                    aria-expanded={abierto}
                    aria-controls="navAdmin"
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    id="navAdmin"
                    className={`collapse navbar-collapse ${
                        abierto ? "show" : ""
                    }`}
                >
                    <div className="navbar-nav me-auto">

                        <Link
                            className="nav-link active fw-bold"
                            to="/admin"
                        >
                            Inicio Panel
                        </Link>

                        <Link
                            className="nav-link"
                            to="/admin/productos"
                        >
                            Mantenedor Productos
                        </Link>

                        <span className="nav-link disabled">
                            Mantenedor Usuarios
                        </span>

                    </div>

                    <div className="d-flex flex-wrap gap-3">

                        <Link
                            to="/"
                            className="btn btn-outline-light btn-sm"
                        >
                            Ir al Sitio Público
                        </Link>

                        <button
                            type="button"
                            onClick={salir}
                            className="btn btn-danger btn-sm"
                        >
                            Salir
                        </button>

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default NavbarAdmin;
