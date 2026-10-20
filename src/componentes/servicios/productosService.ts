
import { productos } from "../datos/productos";
import type { Producto } from "../utilidades/tipos";

// Nombre con el que se guardan los productos
const CLAVE = "sonidoVivoProductos";

// Obtener todos los productos
export function obtenerProductos(): Producto[] {
    const guardados = localStorage.getItem(CLAVE);

    if (guardados) {
        try {
            const datos: unknown = JSON.parse(guardados);

            if (Array.isArray(datos)) {
                return datos as Producto[];
            }
        } catch {
            // Si los datos están dañados,
            // usamos los productos originales
        }
    }

    return [...productos];
}

// Guardar los productos
export function guardarProductos(
    lista: Producto[]
): void {
    localStorage.setItem(
        CLAVE,
        JSON.stringify(lista)
    );
}


export function crearProducto(
    datos: Omit<Producto, "id">
): Producto {

    // Obtener los productos existentes
    const lista = obtenerProductos();

    // Generar un ID para el nuevo producto
    const nuevoId = Math.max(
        0,
        ...lista.map((producto) => producto.id)
    ) + 1;

    // Crear el producto
    const nuevoProducto: Producto = {
        id: nuevoId,
        ...datos
    };

    // Agregarlo a la lista
    const listaActualizada = [
        ...lista,
        nuevoProducto
    ];

    // Guardar los cambios en localStorage
    guardarProductos(listaActualizada);

    return nuevoProducto;
}
