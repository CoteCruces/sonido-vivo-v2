
import type { ItemCarrito } from "../utilidades/tipos";
import { obtenerProductos } from "./productosService";

const CLAVE = "sonidoVivoCarrito";

// Avisar a la aplicación cuando cambia el carrito.
function avisarCambioCarrito(): void {
    window.dispatchEvent(new Event("carritoActualizado"));
}

// Obtener los productos guardados en el carrito
export function obtenerCarrito(): ItemCarrito[] {
    const guardados = localStorage.getItem(CLAVE);

    if (!guardados) {
        return [];
    }

    try {
        return JSON.parse(guardados) as ItemCarrito[];
    } catch {
        return [];
    }
}

// Agregar una unidad de un producto al carrito
export function agregarAlCarrito(id: number): boolean {
    const producto = obtenerProductos().find(
        (p) => p.id === id
    );

    if (!producto || producto.stock <= 0) {
        return false;
    }

    const carrito = obtenerCarrito();

    const item = carrito.find(
        (item) => item.id === id
    );

    if (item) {
        if (item.cantidad >= producto.stock) {
            return false;
        }

        item.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            cantidad: 1
        });
    }

    localStorage.setItem(
    CLAVE,
    JSON.stringify(carrito)
    );

    avisarCambioCarrito();

    return true;
}

// Cambiar la cantidad de un producto del carrito
export function cambiarCantidad(
    id: number,
    cantidad: number
): boolean {
    const producto = obtenerProductos().find(
        (p) => p.id === id
    );

    if (!producto || cantidad < 1 ||
        cantidad > producto.stock ||
        !Number.isInteger(cantidad)) {
        return false;
    }

    const carrito = obtenerCarrito();
    const item = carrito.find((item) => item.id === id);

    if (!item) {
        return false;
    }

    item.cantidad = cantidad;

    localStorage.setItem(CLAVE, JSON.stringify(carrito));

    avisarCambioCarrito();

    return true;
}

// Eliminar un producto del carrito
export function eliminarDelCarrito(id: number): void {
    const carrito = obtenerCarrito().filter(
        (item) => item.id !== id
    );

    localStorage.setItem(CLAVE, JSON.stringify(carrito));

    avisarCambioCarrito();
}

// Vaciar completamente el carrito
export function vaciarCarrito(): void {
    localStorage.removeItem(CLAVE);

    avisarCambioCarrito();
}

// Contar todas las unidades agregadas al carrito.
export function contarProductosCarrito(): number {
    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );
}
