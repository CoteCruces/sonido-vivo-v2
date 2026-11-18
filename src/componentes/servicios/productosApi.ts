import type { Producto } from "../utilidades/tipos";

const URL_API = "/api/productos";

// Obtener el JWT de la sesión.
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

  throw new Error("Debes iniciar sesión como administrador.");
}

// Comprobar las respuestas HTTP.
function comprobarRespuesta(respuesta: Response, mensaje: string): void {
  if (respuesta.status === 401) {
    throw new Error("Tu sesión no es válida o ha expirado.");
  }

  if (respuesta.status === 403) {
    throw new Error("No tienes autorización para administrar productos.");
  }

  if (!respuesta.ok) {
    throw new Error(mensaje);
  }
}

// GET: Obtener todos los productos.
// Acceso público.
export async function obtenerProductosApi(): Promise<Producto[]> {
  const respuesta = await fetch(URL_API);

  comprobarRespuesta(respuesta, "No se pudieron obtener los productos.");

  return respuesta.json();
}

// GET: Obtener producto por ID.
// Acceso público.
export async function obtenerProductoApi(id: number): Promise<Producto | null> {
  const respuesta = await fetch(`${URL_API}/${id}`);

  if (respuesta.status === 404) {
    return null;
  }

  comprobarRespuesta(respuesta, "No se pudo obtener el producto.");

  return respuesta.json();
}

// POST: Crear producto.
// Solo ADMIN.
export async function crearProductoApi(
  datos: Omit<Producto, "id">,
): Promise<Producto> {
  const token = obtenerToken();

  const respuesta = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

  comprobarRespuesta(respuesta, "No se pudo crear el producto.");

  return respuesta.json();
}

// PUT: Actualizar producto.
// Solo ADMIN.
export async function actualizarProductoApi(
  id: number,
  datos: Omit<Producto, "id">,
): Promise<Producto> {
  const token = obtenerToken();

  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

  comprobarRespuesta(respuesta, "No se pudo actualizar el producto.");

  return respuesta.json();
}

// DELETE: Eliminar producto.
// Solo ADMIN.
export async function eliminarProductoApi(id: number): Promise<void> {
  const token = obtenerToken();

  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  comprobarRespuesta(respuesta, "No se pudo eliminar el producto.");
}
