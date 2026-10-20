import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {obtenerSesion,cerrarSesion} from "../servicios/sesionesService";

function MenuSesionNavbar() {

    const navigate = useNavigate();
    const ubicacion = useLocation();

    // Actualizar la información cuando cambiamos de página
    const sesion = useMemo(
        () => obtenerSesion(),
        [ubicacion.key]
    );

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
                        Mi Cuenta
                    </Link>
                    {/* Usuario con sesión iniciada */}
                    <span className="text-primary">
                        {sesion.correo}
                    </span>

                    <span className="text-primary">|</span>

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
                    {/* Usuario sin sesión */}
                    <Link
                        className="nav-link text-primary"
                        to="/login"
                    >
                        Iniciar Sesión
                    </Link>

                    <span className="text-primary">|</span>

                    <Link
                        className="nav-link text-primary"
                        to="/registro"
                    >
                        Crear Cuenta
                    </Link>
                </>
            )}
        </>
    );
}

export default MenuSesionNavbar;
