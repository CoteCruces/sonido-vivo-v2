import type { ItemCarrito } from "../utilidades/tipos";
import { obtenerProductoApi } from "./productosApi";

import {
    obtenerCarritoApi,
    agregarCarritoApi,
    actualizarCarritoApi,
    eliminarCarritoApi
} from "./carritoApi";

// Avisar a React cuando cambia el carrito.
function avisarCambioCarrito(): void {
    window.dispatchEvent(new Event("carritoActualizado"));
}

// Obtener carrito desde MySQL.
export async function obtenerCarrito(): Promise<ItemCarrito[]> {
    const registros = await obtenerCarritoApi();

    return registros.map((registro) => ({
        id: registro.productoId,
        cantidad: registro.cantidad
    }));
}

// Agregar una unidad de un producto.
export async function agregarAlCarrito(
    id: number
): Promise<boolean> {
    const producto = await obtenerProductoApi(id);

    if (!producto || producto.stock <= 0) {
        return false;
    }

    const registros = await obtenerCarritoApi();

    const existente = registros.find(
        (item) => item.productoId === id
    );

    if (existente) {
        if (existente.cantidad >= producto.stock) {
            return false;
        }

        await actualizarCarritoApi(
            existente,
            existente.cantidad + 1
        );
    } else {
        await agregarCarritoApi(id, 1);
    }

    avisarCambioCarrito();
    return true;
}

// Cambiar la cantidad de un producto.
export async function cambiarCantidad(
    id: number,
    cantidad: number
): Promise<boolean> {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
        return false;
    }

    const producto = await obtenerProductoApi(id);

    if (!producto || cantidad > producto.stock) {
        return false;
    }

    const registros = await obtenerCarritoApi();

    const existente = registros.find(
        (item) => item.productoId === id
    );

    if (!existente) {
        return false;
    }

    await actualizarCarritoApi(existente, cantidad);

    avisarCambioCarrito();
    return true;
}

// Eliminar un producto del carrito.
export async function eliminarDelCarrito(
    id: number
): Promise<void> {
    const registros = await obtenerCarritoApi();

    const existente = registros.find(
        (item) => item.productoId === id
    );

    if (existente) {
        await eliminarCarritoApi(existente.id);
        avisarCambioCarrito();
    }
}

// Vaciar el carrito.
export async function vaciarCarrito(): Promise<void> {
    const registros = await obtenerCarritoApi();

    for (const registro of registros) {
        await eliminarCarritoApi(registro.id);
    }

    avisarCambioCarrito();
}

// Contar unidades del carrito.
export async function contarProductosCarrito(): Promise<number> {
    const carrito = await obtenerCarrito();

    return carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );
}
