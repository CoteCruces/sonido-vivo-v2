// @vitest-environment jsdom
import { beforeEach, test, expect } from "vitest";
import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../componentes/servicios/productosService";
import type { Producto } from "../componentes/utilidades/tipos";

// Producto de ejemplo que se utilizará en las pruebas
const productoPrueba: Producto = {
    id: 1,
    nombre: "Guitarra Yamaha",
    categoria: "Guitarras Acústicas",
    descripcion: "Guitarra acústica de prueba",
    precio: 129990,
    stock: 10,
    imagen: "/img/guitarra.jpg"
};

// Antes de cada prueba, dejamos exactamente un producto de ejemplo en el almacenamiento.
beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
        "sonidoVivoProductos",
        JSON.stringify([productoPrueba])
    );
});

// Comprueba que se puede crear un producto nuevo.
test("Crea un producto correctamente", () => {

    const nuevoProducto = crearProducto({
        nombre: "Batería Pearl",
        categoria: "Baterías",
        descripcion: "Batería de prueba",
        precio: 350000,
        stock: 5,
        imagen: "/img/bateria.jpg"
    });

    const productos = obtenerProductos();

    expect(productos.length).toBe(2);
    expect(nuevoProducto.nombre).toBe("Batería Pearl");
    expect(nuevoProducto.id).toBe(2);
});

// Comprueba que se pueden obtener los productos guardados.
test("Obtiene los productos correctamente", () => {

    const productos = obtenerProductos();

    expect(productos.length).toBe(1);
    expect(productos[0].nombre).toBe("Guitarra Yamaha");
    expect(productos[0].precio).toBe(129990);
});

// Comprueba que se puede modificar un producto sin cambiar su ID.
test("Actualiza un producto correctamente", () => {

    actualizarProducto(1, {
        nombre: "Guitarra Yamaha Actualizada",
        categoria: "Guitarras Acústicas",
        descripcion: "Guitarra modificada",
        precio: 159990,
        stock: 8,
        imagen: "/img/guitarra.jpg"
    });

    const productos = obtenerProductos();

    expect(productos[0].id).toBe(1);
    expect(productos[0].nombre).toBe("Guitarra Yamaha Actualizada");
    expect(productos[0].precio).toBe(159990);
    expect(productos[0].stock).toBe(8);
});

// Comprueba que al eliminar un producto desaparece de la lista.
test("Elimina un producto correctamente", () => {

    const eliminado = eliminarProducto(1);

    const productos = obtenerProductos();

    expect(eliminado).toBe(true);
    expect(productos.length).toBe(0);
});
