import type { Sesion, Usuario } from "../utilidades/tipos";

const CLAVE_SESION = "sonidoVivoSesion";

// Guardar la sesión del usuario
export function iniciarSesion(usuario: Usuario): void {
    const sesion: Sesion = {
        correo: usuario.correo,
        rol: usuario.rol
    };

    sessionStorage.setItem(
        CLAVE_SESION,
        JSON.stringify(sesion)
    );
}

// Obtener la sesión actual
export function obtenerSesion(): Sesion | null {
    const guardada = sessionStorage.getItem(CLAVE_SESION);

    if (!guardada) {
        return null;
    }

    try {
        const datos: unknown = JSON.parse(guardada);

        if (
            typeof datos === "object" &&
            datos !== null &&
            "correo" in datos &&
            "rol" in datos &&
            typeof datos.correo === "string" &&
            typeof datos.rol === "string"
        ) {
            return {
                correo: datos.correo,
                rol: datos.rol
            };
        }
    } catch {
        return null;
    }

    return null;
}

// Cerrar la sesión
export function cerrarSesion(): void {
    sessionStorage.removeItem(CLAVE_SESION);
}
