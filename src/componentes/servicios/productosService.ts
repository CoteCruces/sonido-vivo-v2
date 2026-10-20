
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


export function actualizarProducto(
    id: number,
    datos: Omit<Producto, "id">
): Producto | null {

    // Obtener todos los productos
    const lista = obtenerProductos();

    // Buscar el producto por ID
    const indice = lista.findIndex(
        (producto) => producto.id === id
    );

    // Si no existe, retornar null
    if (indice === -1) {
        return null;
    }

    // Actualizar el producto manteniendo su ID
    const productoActualizado: Producto = {
        ...datos,
        id
    };

    // Reemplazar el producto anterior
    lista[indice] = productoActualizado;

    // Guardar los cambios en localStorage
    guardarProductos(lista);

    return productoActualizado;
}


export function eliminarProducto(id: number): boolean {

    // Obtener todos los productos
    const lista = obtenerProductos();

    // Comprobar si existe
    const existe = lista.some(
        (producto) => producto.id === id
    );

    if (!existe) {
        return false;
    }

    // Quitar el producto seleccionado
    const nuevaLista = lista.filter(
        (producto) => producto.id !== id
    );

    // Guardar la lista actualizada
    guardarProductos(nuevaLista);

    return true;
}
