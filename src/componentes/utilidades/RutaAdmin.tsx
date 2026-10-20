import { Navigate, Outlet } from "react-router-dom";

import { obtenerSesion } from "../servicios/sesionesService";
import { obtenerUsuarios } from "../servicios/usuariosService";

function RutaAdmin() {

    // Obtener la sesión actual
    const sesion = obtenerSesion();

    // Si no hay sesión, enviar al Login
    if (!sesion) {
        return <Navigate to="/login" replace />;
    }

    // Buscar al usuario en las cuentas registradas
    const usuario = obtenerUsuarios().find(
        (u) =>
            u.correo.toLowerCase() ===
            sesion.correo.toLowerCase()
    );

    // Comprobar que la cuenta sigue siendo administradora
    if (
        !usuario ||
        usuario.rol !== "Administrador" ||
        sesion.rol !== "Administrador"
    ) {
        return <Navigate to="/" replace />;
    }

    // Permitir acceder a las rutas administrativas
    return <Outlet />;
}

export default RutaAdmin;
