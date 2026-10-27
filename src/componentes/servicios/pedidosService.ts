import type { Pedido } from "../utilidades/tipos";
import {
    obtenerProductos,
    guardarProductos
} from "./productosService";

import {
    obtenerCarrito,
    vaciarCarrito
} from "./carritoService";

const CLAVE_PEDIDOS = "sonidoVivoPedidos";

// Confirmar una compra
export function confirmarCompra(metodo: string): Pedido | null {

    const carrito = obtenerCarrito();
    const productos = obtenerProductos();

    if (carrito.length === 0 || !metodo.trim()) {
        return null;
    }

    const articulos: Pedido["articulos"] = [];

    // Comprobar el stock de cada producto
    for (const item of carrito) {
        const producto = productos.find(
            (p) => p.id === item.id
        );

        if (
            !producto ||
            !Number.isInteger(item.cantidad) ||
            item.cantidad < 1 ||
            item.cantidad > producto.stock
        ) {
            return null;
        }

        articulos.push({
            nombre: producto.nombre,
            cantidad: item.cantidad,
            precio: producto.precio
        });
    }

    // Calcular el total de la compra
    const total = articulos.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    const pedido: Pedido = {
        id: Date.now().toString(),
        fecha: new Date().toLocaleString("es-CL"),
        total,
        articulos,
        metodo
    };

    // Obtener los pedidos anteriores
    let pedidos: Pedido[] = [];

    try {
        const guardados = localStorage.getItem(CLAVE_PEDIDOS);

        if (guardados) {
            const datos: unknown = JSON.parse(guardados);

            if (Array.isArray(datos)) {
                pedidos = datos as Pedido[];
            }
        }
    } catch {
        pedidos = [];
    }

    // Actualizar el stock de los productos comprados
    const productosActualizados = productos.map((producto) => {
        const item = carrito.find(
            (item) => item.id === producto.id
        );

        return item
            ? { ...producto, stock: producto.stock - item.cantidad }
            : producto;
    });

    localStorage.setItem(
        CLAVE_PEDIDOS,
        JSON.stringify([...pedidos, pedido])
    );

    guardarProductos(productosActualizados);
    vaciarCarrito();

    return pedido;
}
