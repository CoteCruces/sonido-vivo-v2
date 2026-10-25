
import { Link, useNavigate } from "react-router-dom";
import { obtenerSesion, cerrarSesion } from "../servicios/sesionesService";

function MenuSesionNavbar() {

    const navigate = useNavigate();
    const sesion = obtenerSesion();

    const salir = () => {
        cerrarSesion();
        navigate("/login", { replace: true });
    };

    return (
        <>
            {sesion ? (
                <>
                    <Link
                        to="/mi-cuenta"
                        className="nav-link text-primary"
                    >
                        <i className="bi bi-person-circle me-1"></i>
                        Mi Cuenta
                    </Link>

                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={salir}
                    >
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="nav-link text-primary"
                    >
                        Iniciar Sesión
                    </Link>

                    <span className="text-primary">|</span>

                    <Link
                        to="/registro"
                        className="nav-link text-primary"
                    >
                        Crear Cuenta
                    </Link>
                </>
            )}
        </>
    );
}

export default MenuSesionNavbar;
