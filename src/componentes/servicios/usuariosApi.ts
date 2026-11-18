const URL_API = "/api/usuarios";

// Datos que devuelve Spring Boot al iniciar sesión.
export type RespuestaLogin = {
  token: string;
  mensaje: string;
};

// Comprueba el correo y la contraseña en el backend.
export async function iniciarSesionApi(
  correo: string,
  clave: string,
): Promise<RespuestaLogin> {
  const respuesta = await fetch(`${URL_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: correo.trim(),
      password: clave,
    }),
  });

  // Credenciales incorrectas.
  if (respuesta.status === 401) {
    throw new Error("Correo electrónico o contraseña incorrectos.");
  }

  // Otro error del servidor.
  if (!respuesta.ok) {
    throw new Error("No se pudo conectar con el servidor.");
  }

  const datos: RespuestaLogin = await respuesta.json();

  if (!datos.token) {
    throw new Error("El servidor no devolvió un token válido.");
  }

  return datos;
}

export type DatosRegistroApi = {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  fechaNacimiento: string;
  direccion: string;
  region: string;
  comuna: string;
  clave: string;
};

export type UsuarioRegistrado = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
};

// Registra un usuario nuevo en MySQL.
export async function registrarUsuarioApi(
  datos: DatosRegistroApi,
): Promise<UsuarioRegistrado> {
  const respuesta = await fetch(`${URL_API}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      run: datos.run.trim(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      email: datos.correo.trim(),
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion.trim(),
      region: datos.region,
      comuna: datos.comuna,
      password: datos.clave,
    }),
  });

  if (respuesta.status === 409) {
    throw new Error("El correo o RUN ya está registrado.");
  }

  if (respuesta.status === 400) {
    throw new Error("Los datos del registro no son válidos.");
  }

  if (!respuesta.ok) {
    throw new Error("No se pudo registrar el usuario.");
  }

  return respuesta.json();
}

export type PerfilUsuarioApi = {
  id: number;
  run: string | null;
  nombre: string;
  apellidos: string | null;
  email: string;
  rol: string;
  fechaNacimiento: string | null;
  direccion: string | null;
  region: string | null;
  comuna: string | null;
};

// Consulta los datos del usuario autenticado.
export async function obtenerPerfilApi(): Promise<PerfilUsuarioApi> {
  // Recuperar el JWT guardado al iniciar sesión.
  const token = sessionStorage.getItem("sonidoVivoToken");

  if (!token) {
    throw new Error("Debes iniciar sesión.");
  }

  // Enviar el token a Spring Boot.
  const respuesta = await fetch(`${URL_API}/perfil`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // El token no es válido o ha expirado.
  if (respuesta.status === 401 || respuesta.status === 403) {
    throw new Error("Tu sesión no es válida o ha expirado.");
  }

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los datos del perfil.");
  }

  return respuesta.json();
}

export type DatosActualizarPerfilApi = {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  direccion: string;
  region: string;
  comuna: string;
};

// Actualiza los datos personales del usuario autenticado.
export async function actualizarPerfilApi(
  datos: DatosActualizarPerfilApi,
): Promise<PerfilUsuarioApi> {
  // Obtener el JWT de la sesión actual.
  const token = sessionStorage.getItem("sonidoVivoToken");

  if (!token) {
    throw new Error("Debes iniciar sesión.");
  }

  // Enviar los cambios a Spring Boot.
  const respuesta = await fetch(`${URL_API}/perfil`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion.trim(),
      region: datos.region,
      comuna: datos.comuna,
    }),
  });

  // Comprobar problemas de autenticación.
  if (respuesta.status === 401 || respuesta.status === 403) {
    throw new Error("Tu sesión no es válida o no tienes autorización.");
  }

  // Comprobar otros errores.
  if (!respuesta.ok) {
    throw new Error("No se pudieron actualizar tus datos.");
  }

  // Devolver el perfil actualizado.
  return respuesta.json();
}

export async function obtenerUsuariosAdminApi(): Promise<PerfilUsuarioApi[]> {
  // Obtener el JWT del administrador.
  const token = sessionStorage.getItem("sonidoVivoToken");

  if (!token) {
    throw new Error("Debes iniciar sesión.");
  }

  // Consultar los usuarios registrados en MySQL.
  const respuesta = await fetch(URL_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Comprobar los permisos.
  if (respuesta.status === 401 || respuesta.status === 403) {
    throw new Error("No tienes autorización para consultar los usuarios.");
  }

  // Comprobar otros errores.
  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la lista de usuarios.");
  }

  // Devolver los usuarios registrados.
  const usuarios: unknown = await respuesta.json();

  if (!Array.isArray(usuarios)) {
    throw new Error("El servidor no devolvió una lista válida.");
  }

  return usuarios as PerfilUsuarioApi[];
}


export async function eliminarUsuarioAdminApi(
    id: number
): Promise<void> {

    // Comprobar que el ID sea válido.
    if (!Number.isSafeInteger(id) || id <= 0) {
        throw new Error("El ID del usuario no es válido.");
    }

    // Obtener el JWT del administrador.
    const token = sessionStorage.getItem("sonidoVivoToken");

    if (!token) {
        throw new Error("Debes iniciar sesión.");
    }

    // Solicitar la eliminación al microservicio.
    const respuesta = await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // Comprobar permisos.
    if (respuesta.status === 401 ||
        respuesta.status === 403) {
        throw new Error(
            "No tienes autorización para eliminar usuarios."
        );
    }

    // Comprobar si el usuario existe.
    if (respuesta.status === 404) {
        throw new Error("El usuario no existe.");
    }

    // Comprobar otros errores.
    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el usuario.");
    }
}


export type DatosEditarUsuarioAdminApi = {
    nombre: string;
    apellidos: string;
    rol: "ADMIN" | "CLIENTE";
};

// Actualiza un usuario desde el panel administrador.
export async function actualizarUsuarioAdminApi(
    id: number,
    datos: DatosEditarUsuarioAdminApi
): Promise<PerfilUsuarioApi> {

    // Validar el identificador del usuario.
    if (!Number.isSafeInteger(id) || id <= 0) {
        throw new Error("El ID del usuario no es válido.");
    }

    // Obtener el JWT del administrador.
    const token = sessionStorage.getItem("sonidoVivoToken");

    if (!token) {
        throw new Error("Debes iniciar sesión.");
    }

    // Enviar los cambios a Spring Boot.
    const respuesta = await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            rol: datos.rol
        })
    });

    // Comprobar permisos.
    if (
        respuesta.status === 401 ||
        respuesta.status === 403
    ) {
        throw new Error(
            "No tienes autorización para editar usuarios."
        );
    }

    // Comprobar si existe el usuario.
    if (respuesta.status === 404) {
        throw new Error("El usuario no existe.");
    }

    // Comprobar errores del servidor.
    if (!respuesta.ok) {
        throw new Error(
            "No se pudo actualizar el usuario."
        );
    }

    // Devolver los datos actualizados desde MySQL.
    return respuesta.json();
}


export type DatosCrearUsuarioAdminApi = {
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    clave: string;
    rol: "ADMIN" | "CLIENTE";
};

// Crea un usuario desde el panel de administración.
export async function crearUsuarioAdminApi(
    datos: DatosCrearUsuarioAdminApi
): Promise<PerfilUsuarioApi> {

    // Obtener el JWT del administrador.
    const token = sessionStorage.getItem("sonidoVivoToken");

    if (!token) {
        throw new Error("Debes iniciar sesión.");
    }

    // Enviar los datos al microservicio.
    const respuesta = await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            run: datos.run.trim(),
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            email: datos.correo.trim(),
            password: datos.clave,
            rol: datos.rol
        })
    });

    // Verificar los permisos.
    if (
        respuesta.status === 401 ||
        respuesta.status === 403
    ) {
        throw new Error(
            "No tienes autorización para crear usuarios."
        );
    }

    // Comprobar datos duplicados.
    if (respuesta.status === 409) {
        throw new Error(
            "El correo o RUN ya está registrado."
        );
    }

    // Comprobar datos incorrectos.
    if (respuesta.status === 400) {
        throw new Error(
            "Los datos ingresados no son válidos."
        );
    }

    // Comprobar otros errores.
    if (!respuesta.ok) {
        throw new Error(
            "No se pudo crear el usuario."
        );
    }

    // Devolver el usuario creado en MySQL.
    return respuesta.json();
}

