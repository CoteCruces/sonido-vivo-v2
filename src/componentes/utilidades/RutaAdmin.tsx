import { Navigate, Outlet } from "react-router-dom";

import { obtenerSesion } from "../servicios/sesionesService";

function RutaAdmin() {
  // Obtener la sesión guardada en React.
  const sesion = obtenerSesion();

  // Obtener el token entregado por Spring Boot.
  const token = sessionStorage.getItem("sonidoVivoToken");

  // Si no hay sesión o token, enviar al login.
  if (!sesion || !token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Separar las tres partes del JWT.
    const partes = token.split(".");

    if (partes.length !== 3) {
      return <Navigate to="/login" replace />;
    }

    // Leer los datos incluidos en el JWT.
    const datos = JSON.parse(
      atob(partes[1].replace(/-/g, "+").replace(/_/g, "/")),
    );

    // Comprobar que el token no haya expirado.
    if (typeof datos.exp !== "number" || datos.exp * 1000 <= Date.now()) {
      return <Navigate to="/login" replace />;
    }

    // Comprobar que el rol corresponda a administrador.
    if (datos.rol !== "ADMIN" || sesion.rol !== "Administrador") {
      return <Navigate to="/" replace />;
    }

    // Comprobar que el correo coincida con la sesión.
    if (
      typeof datos.sub !== "string" ||
      datos.sub.toLowerCase() !== sesion.correo.toLowerCase()
    ) {
      return <Navigate to="/login" replace />;
    }

    // Permitir mostrar el panel administrativo.
    return <Outlet />;
  } catch {
    // Si el token tiene un formato incorrecto.
    return <Navigate to="/login" replace />;
  }
}

export default RutaAdmin;
