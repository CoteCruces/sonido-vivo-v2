import type { Producto } from "../utilidades/tipos";

const URL_API = "/api/productos";

// Obtiene todos los productos desde MySQL.
export async function obtenerProductosApi(): Promise<Producto[]> {
    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los productos.");
    }

    return respuesta.json();
}

// Obtiene un producto mediante su ID.
export async function obtenerProductoApi(
    id: number
): Promise<Producto | null> {
    const respuesta = await fetch(`${URL_API}/${id}`);

    if (respuesta.status === 404) {
        return null;
    }

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener el producto.");
    }

    return respuesta.json();
}

// Crea un producto en la base de datos.
export async function crearProductoApi(
    datos: Omit<Producto, "id">
): Promise<Producto> {
    const respuesta = await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo crear el producto.");
    }

    return respuesta.json();
}

// Actualiza un producto existente.
export async function actualizarProductoApi(
    id: number,
    datos: Omit<Producto, "id">
): Promise<Producto> {
    const respuesta = await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el producto.");
    }

    return respuesta.json();
}

// Elimina un producto mediante su ID.
export async function eliminarProductoApi(
    id: number
): Promise<void> {
    const respuesta = await fetch(`${URL_API}/${id}`, {
        method: "DELETE"
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el producto.");
    }
}
