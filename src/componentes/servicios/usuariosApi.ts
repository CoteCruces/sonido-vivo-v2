const URL_API = "/api/usuarios";

export type RolUsuarioApi = "ADMIN" | "CLIENTE";

export type PerfilUsuarioApi = {
  id: number;
  run: string | null;
  nombre: string;
  apellidos: string | null;
  email: string;
  correo: string;
  rol: RolUsuarioApi;
  fechaNacimiento: string | null;
  direccion: string | null;
  region: string | null;
  comuna: string | null;
};

export type DatosRegistroUsuarioApi = {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  clave: string;
  fechaNacimiento?: string;
  direccion?: string;
  region?: string;
  comuna?: string;
};

export type DatosActualizarPerfilApi = {
  nombre: string;
  apellidos: string;
  fechaNacimiento?: string;
  direccion?: string;
  region?: string;
  comuna?: string;
};

export type DatosCrearUsuarioAdminApi = {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  clave: string;
  rol: RolUsuarioApi | "Administrador" | "Cliente";
};

export type DatosEditarUsuarioAdminApi = {
  nombre: string;
  apellidos: string;
  rol: RolUsuarioApi | "Administrador" | "Cliente";
  correo?: string;
};

type UsuarioRespuesta = {
  id?: number;
  run?: string | null;
  nombre?: string | null;
  apellidos?: string | null;
  email?: string | null;
  correo?: string | null;
  rol?: string | null;
  fechaNacimiento?: string | null;
  direccion?: string | null;
  region?: string | null;
  comuna?: string | null;
};

// Obtener el token guardado en la sesión.
function obtenerToken(): string {
  const tokenDirecto = sessionStorage.getItem("sonidoVivoToken");

  if (tokenDirecto) {
    return tokenDirecto;
  }

  const sesionGuardada = sessionStorage.getItem("sonidoVivoSesion");

  if (sesionGuardada) {
    try {
      const sesion = JSON.parse(sesionGuardada);

      if (sesion.token) {
        return sesion.token;
      }
    } catch {
      // La sesión guardada no es válida.
    }
  }

  throw new Error("Debes iniciar sesión.");
}

// Convertir roles al formato del backend.
function convertirRol(rol: string): RolUsuarioApi {
  return rol === "ADMIN" || rol === "Administrador" ? "ADMIN" : "CLIENTE";
}

// Normalizar los datos recibidos del backend.
function normalizarUsuario(datos: UsuarioRespuesta): PerfilUsuarioApi {
  const email = datos.email ?? datos.correo ?? "";

  return {
    id: datos.id ?? 0,
    run: datos.run ?? null,
    nombre: datos.nombre ?? "",
    apellidos: datos.apellidos ?? null,
    email,
    correo: email,
    rol: convertirRol(datos.rol ?? "CLIENTE"),
    fechaNacimiento: datos.fechaNacimiento ?? null,
    direccion: datos.direccion ?? null,
    region: datos.region ?? null,
    comuna: datos.comuna ?? null,
  };
}

// Mensajes de error del servidor.
function mensajeError(estado: number): string {
  if (estado === 400) return "Los datos enviados no son válidos.";
  if (estado === 401) return "Tu sesión no es válida o ha expirado.";
  if (estado === 403)
    return "No tienes autorización para realizar esta operación.";
  if (estado === 404) return "No se encontró el usuario.";
  if (estado === 409) return "El correo o RUN ya está registrado.";

  return `Error de comunicación con el servidor (${estado}).`;
}

// Comprobar las respuestas HTTP.
function comprobarRespuesta(respuesta: Response): void {
  if (!respuesta.ok) {
    throw new Error(mensajeError(respuesta.status));
  }
}

// INICIAR SESIÓN.
export async function iniciarSesionApi(
  correo: string,
  clave: string,
): Promise<{ token: string }> {
  const respuesta = await fetch(`${URL_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: correo.trim().toLowerCase(),
      password: clave,
    }),
  });

  comprobarRespuesta(respuesta);

  const datos: { token: string } = await respuesta.json();

  if (!datos.token) {
    throw new Error("El servidor no devolvió un token JWT.");
  }

  sessionStorage.setItem("sonidoVivoToken", datos.token);

  return { token: datos.token };
}

// REGISTRAR USUARIO.
export async function registrarUsuarioApi(
  datos: DatosRegistroUsuarioApi,
): Promise<PerfilUsuarioApi> {
  const respuesta = await fetch(`${URL_API}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      run: datos.run.trim(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      email: datos.correo.trim().toLowerCase(),
      password: datos.clave,
      fechaNacimiento: datos.fechaNacimiento || null,
      direccion: datos.direccion?.trim() ?? "",
      region: datos.region ?? "",
      comuna: datos.comuna ?? "",
    }),
  });

  comprobarRespuesta(respuesta);

  return normalizarUsuario((await respuesta.json()) as UsuarioRespuesta);
}

// CONSULTAR PERFIL.
export async function obtenerPerfilApi(
  token?: string,
): Promise<PerfilUsuarioApi> {
  const jwt = token ?? obtenerToken();

  const respuesta = await fetch(`${URL_API}/perfil`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  comprobarRespuesta(respuesta);

  return normalizarUsuario((await respuesta.json()) as UsuarioRespuesta);
}

// Alias para mantener compatibilidad con el formulario de cuenta.
export async function obtenerMiUsuarioApi(
  token?: string,
): Promise<PerfilUsuarioApi> {
  return obtenerPerfilApi(token);
}

// ACTUALIZAR PERFIL.
export async function actualizarPerfilApi(
  datos: DatosActualizarPerfilApi,
): Promise<PerfilUsuarioApi> {
  const token = obtenerToken();

  const respuesta = await fetch(`${URL_API}/perfil`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

  comprobarRespuesta(respuesta);

  return normalizarUsuario((await respuesta.json()) as UsuarioRespuesta);
}

// Alias para el formulario de edición de perfil.
export async function actualizarMiPerfilApi(
  datos: DatosActualizarPerfilApi,
): Promise<PerfilUsuarioApi> {
  return actualizarPerfilApi(datos);
}

// LISTAR USUARIOS (ADMIN).
export async function listarUsuariosAdminApi(): Promise<PerfilUsuarioApi[]> {
  const token = obtenerToken();

  const respuesta = await fetch(URL_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  comprobarRespuesta(respuesta);

  const usuarios: UsuarioRespuesta[] = await respuesta.json();

  return usuarios.map(normalizarUsuario);
}

// Alias de listado.
export async function obtenerUsuariosAdminApi(): Promise<PerfilUsuarioApi[]> {
  return listarUsuariosAdminApi();
}

// CONSULTAR USUARIO POR ID (ADMIN).
export async function obtenerUsuarioAdminApi(
  id: number,
): Promise<PerfilUsuarioApi> {
  const token = obtenerToken();

  const respuesta = await fetch(`${URL_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  comprobarRespuesta(respuesta);

  return normalizarUsuario((await respuesta.json()) as UsuarioRespuesta);
}

// CREAR USUARIO (ADMIN).
export async function crearUsuarioAdminApi(
  datos: DatosCrearUsuarioAdminApi,
): Promise<PerfilUsuarioApi> {
  const token = obtenerToken();

  const respuesta = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      run: datos.run.trim(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      email: datos.correo.trim().toLowerCase(),
      password: datos.clave,
      rol: convertirRol(datos.rol),
    }),
  });

  comprobarRespuesta(respuesta);

  return normalizarUsuario((await respuesta.json()) as UsuarioRespuesta);
}

// ACTUALIZAR USUARIO (ADMIN).
export async function actualizarUsuarioAdminApi(
  id: number,
  datos: DatosEditarUsuarioAdminApi,
): Promise<PerfilUsuarioApi> {
  const token = obtenerToken();

  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      rol: convertirRol(datos.rol),
      ...(datos.correo ? { email: datos.correo.trim().toLowerCase() } : {}),
    }),
  });

  comprobarRespuesta(respuesta);

  return normalizarUsuario((await respuesta.json()) as UsuarioRespuesta);
}

// ELIMINAR USUARIO (ADMIN).
export async function eliminarUsuarioAdminApi(id: number): Promise<void> {
  const token = obtenerToken();

  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  comprobarRespuesta(respuesta);
}

// Convertir los datos al formato utilizado por React.
export function mapearUsuario(datos: PerfilUsuarioApi) {
  return {
    id: datos.id,
    run: datos.run ?? "",
    nombre: datos.nombre,
    apellidos: datos.apellidos ?? "",
    correo: datos.email,
    rol: datos.rol === "ADMIN" ? "Administrador" : "Cliente",
    fechaNacimiento: datos.fechaNacimiento ?? "",
    direccion: datos.direccion ?? "",
    region: datos.region ?? "",
    comuna: datos.comuna ?? "",
  };
}
