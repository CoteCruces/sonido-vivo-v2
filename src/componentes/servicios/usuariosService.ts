
import type { Usuario } from "../utilidades/tipos";

// Datos necesarios para registrar una cuenta
export type DatosRegistroUsuario = Omit<Usuario, "rol"> & {
    clave: string;
};

// Tipo interno de la cuenta simulada
type CuentaGuardada = Usuario & {
    clave: string;
};

const CLAVE_USUARIOS = "sonidoVivoUsuarios";

// Normalizar correos y RUN para evitar duplicados
function normalizarCorreo(correo: string): string {
    return correo.trim().toLowerCase();
}

function normalizarRUN(run: string): string {
    return run.replace(/[.\-\s]/g, "").toUpperCase();
}

// Leer las cuentas guardadas
function leerCuentas(): CuentaGuardada[] {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);

    if (!guardados) {
        return [];
    }

    try {
        const datos: unknown = JSON.parse(guardados);

        if (Array.isArray(datos)) {
            return datos as CuentaGuardada[];
        }
    } catch {
        return [];
    }

    return [];
}

// Guardar las cuentas
function guardarCuentas(cuentas: CuentaGuardada[]): void {
    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(cuentas)
    );
}

// Devolver los datos del usuario sin la contraseña
function datosPublicos(cuenta: CuentaGuardada): Usuario {
    return {
        run: cuenta.run,
        nombre: cuenta.nombre,
        apellidos: cuenta.apellidos,
        correo: cuenta.correo,
        rol: cuenta.rol,
        direccion: cuenta.direccion,
        fechaNacimiento: cuenta.fechaNacimiento,
        region: cuenta.region,
        comuna: cuenta.comuna
    };
}

// Obtener el listado de usuarios
export function obtenerUsuarios(): Usuario[] {
    return leerCuentas().map(datosPublicos);
}

// Registrar un usuario nuevo
export function registrarUsuario(
    datos: DatosRegistroUsuario
): Usuario {
    const cuentas = leerCuentas();

    const correo = normalizarCorreo(datos.correo);
    const run = normalizarRUN(datos.run);

    // Validar correo duplicado
    const correoExiste = cuentas.some(
        (usuario) =>
            normalizarCorreo(usuario.correo) === correo
    );

    if (correoExiste) {
        throw new Error(
            "El correo electrónico ya está registrado."
        );
    }

    // Validar RUN duplicado
    const runExiste = cuentas.some(
        (usuario) =>
            normalizarRUN(usuario.run) === run
    );

    if (runExiste) {
        throw new Error(
            "El RUN ya está registrado."
        );
    }

    // Crear cuenta con rol Cliente
    const nuevaCuenta: CuentaGuardada = {
        ...datos,
        run: datos.run.trim(),
        correo,
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        rol: "Cliente"
    };

    guardarCuentas([...cuentas, nuevaCuenta]);

    return datosPublicos(nuevaCuenta);
}

// Comprobar credenciales de inicio de sesión
export function autenticarUsuario(
    correo: string,
    clave: string
): Usuario | null {
    const cuenta = leerCuentas().find(
        (usuario) =>
            normalizarCorreo(usuario.correo) ===
                normalizarCorreo(correo) &&
            usuario.clave === clave
    );

    return cuenta ? datosPublicos(cuenta) : null;
}


export type DatosEditarPerfil = Pick<
    Usuario,
    | "nombre"
    | "apellidos"
    | "fechaNacimiento"
    | "direccion"
    | "region"
    | "comuna"
>;

export function actualizarPerfil(
    correo: string,
    datos: DatosEditarPerfil
): Usuario | null {

    const cuentas = leerCuentas();

    // Buscar la cuenta que inició sesión
    const indice = cuentas.findIndex(
        (cuenta) =>
            normalizarCorreo(cuenta.correo) ===
            normalizarCorreo(correo)
    );

    if (indice === -1) {
        return null;
    }

    // Actualizar solo los datos del perfil
    cuentas[indice] = {
        ...cuentas[indice],
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        fechaNacimiento: datos.fechaNacimiento ?? "",
        direccion: datos.direccion?.trim() ?? "",
        region: datos.region?.trim() ?? "",
        comuna: datos.comuna?.trim() ?? ""
    };

    // Guardar los cambios
    guardarCuentas(cuentas);

    // Devolver el usuario sin contraseña
    return datosPublicos(cuentas[indice]);
}


export type DatosEditarUsuario = Pick<
    Usuario,
    "nombre" | "apellidos" | "rol"
>;

export function editarUsuarioAdmin(
    run: string,
    datos: DatosEditarUsuario
): Usuario | null {

    const cuentas = leerCuentas();

    // Buscar el usuario por RUN
    const indice = cuentas.findIndex(
        (cuenta) =>
            normalizarRUN(cuenta.run) === normalizarRUN(run)
    );

    if (indice === -1) {
        return null;
    }

    // Validar los datos
    if (!datos.nombre.trim() || !datos.apellidos.trim()) {
        throw new Error(
            "El nombre y los apellidos son obligatorios."
        );
    }

    if (
        datos.rol !== "Cliente" &&
        datos.rol !== "Administrador"
    ) {
        throw new Error("El rol seleccionado no es válido.");
    }

    // Actualizar sin modificar RUN, correo ni contraseña
    cuentas[indice] = {
        ...cuentas[indice],
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        rol: datos.rol
    };

    guardarCuentas(cuentas);

    return datosPublicos(cuentas[indice]);
}


export function eliminarUsuario(run: string): boolean {

    // Obtener las cuentas guardadas
    const cuentas = leerCuentas();

    // Comprobar si el usuario existe
    const existe = cuentas.some(
        (cuenta) =>
            normalizarRUN(cuenta.run) === normalizarRUN(run)
    );

    if (!existe) {
        return false;
    }

    // Eliminar la cuenta seleccionada
    const nuevasCuentas = cuentas.filter(
        (cuenta) =>
            normalizarRUN(cuenta.run) !== normalizarRUN(run)
    );

    // Guardar los cambios en localStorage
    guardarCuentas(nuevasCuentas);

    return true;
}


export type DatosCrearUsuarioAdmin = DatosRegistroUsuario & {
    rol: "Cliente" | "Administrador";
};

export function crearUsuarioAdmin(
    datos: DatosCrearUsuarioAdmin
): Usuario {

    // Obtener las cuentas registradas
    const cuentas = leerCuentas();

    // Normalizar los datos
    const correo = normalizarCorreo(datos.correo);
    const run = normalizarRUN(datos.run);

    // Verificar correo duplicado
    const correoExiste = cuentas.some(
        (cuenta) =>
            normalizarCorreo(cuenta.correo) === correo
    );

    if (correoExiste) {
        throw new Error(
            "El correo electrónico ya está registrado."
        );
    }

    // Verificar RUN duplicado
    const runExiste = cuentas.some(
        (cuenta) =>
            normalizarRUN(cuenta.run) === run
    );

    if (runExiste) {
        throw new Error(
            "El RUN ya está registrado."
        );
    }

    // Validar campos obligatorios
    if (
        !datos.nombre.trim() ||
        !datos.apellidos.trim() ||
        !correo ||
        !run ||
        !datos.clave
    ) {
        throw new Error(
            "Todos los campos obligatorios deben completarse."
        );
    }

    // Validar rol
    if (
        datos.rol !== "Cliente" &&
        datos.rol !== "Administrador"
    ) {
        throw new Error("El rol seleccionado no es válido.");
    }

    // Crear la cuenta
    const nuevaCuenta: CuentaGuardada = {
        ...datos,
        run: datos.run.trim(),
        correo,
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        rol: datos.rol
    };

    // Guardar en localStorage
    guardarCuentas([...cuentas, nuevaCuenta]);

    // Devolver el usuario sin su contraseña
    return datosPublicos(nuevaCuenta);
}


const CLAVE_DEMO_INICIALIZADA = "sonidoVivoDemoInicializadaV1";

// Crear las cuentas de prueba una sola vez
export function inicializarUsuariosDemo(): void {

    // Evitar volver a crear las cuentas
    if (
        localStorage.getItem(CLAVE_DEMO_INICIALIZADA) === "1"
    ) {
        return;
    }

    // Conservar los usuarios que ya están registrados
    const cuentas = leerCuentas();

    const cuentasDemo: CuentaGuardada[] = [
        {
            run: "18.765.432-7",
            nombre: "Usuario",
            apellidos: "Demo",
            correo: "cliente@sonidovivo.test",
            clave: "Cliente123",
            rol: "Cliente"
        },
        {
            run: "17.654.321-3",
            nombre: "Administrador",
            apellidos: "Demo",
            correo: "admin@sonidovivo.test",
            clave: "Admin123",
            rol: "Administrador"
        }
    ];

    // Agregar cada cuenta solo si no existe
    for (const demo of cuentasDemo) {

        const existe = cuentas.some(
            (cuenta) =>
                normalizarCorreo(cuenta.correo) ===
                    normalizarCorreo(demo.correo) ||
                normalizarRUN(cuenta.run) ===
                    normalizarRUN(demo.run)
        );

        if (!existe) {
            cuentas.push(demo);
        }
    }

    // Guardar los usuarios
    guardarCuentas(cuentas);

    // Marcar que la inicialización ya se realizó
    localStorage.setItem(
        CLAVE_DEMO_INICIALIZADA,
        "1"
    );
}
