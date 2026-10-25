// @vitest-environment jsdom

import { beforeEach, afterEach, test, expect } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Catalogo from "../componentes/paginas/Catalogo";

// Productos de ejemplo que se utilizará en las pruebas
const productosPrueba = [
    {
        id: 1,
        nombre: "Guitarra Yamaha",
        categoria: "Guitarras Acústicas",
        descripcion: "Guitarra de prueba",
        precio: 129990,
        stock: 10,
        imagen: "/img/guitarra.jpg"
    },
    {
        id: 2,
        nombre: "Batería Pearl",
        categoria: "Baterías",
        descripcion: "Batería de prueba",
        precio: 350000,
        stock: 5,
        imagen: "/img/bateria.jpg"
    },
    {
        id: 3,
        nombre: "Guitarra Fender",
        categoria: "Guitarras Eléctricas",
        descripcion: "Guitarra eléctrica de prueba",
        precio: 199990,
        stock: 8,
        imagen: "/img/fender.jpg"
    }
];

// Antes de cada prueba, dejamos exactamente solo los productos de ejemplo en el almacenamiento.
beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
        "sonidoVivoProductos",
        JSON.stringify(productosPrueba)
    );
});
// Limpia los componentes HTML después de cada prueba. Esto asegura que no haya interferencias entre pruebas 
// y que cada prueba comience con un estado limpio.
afterEach(() => {
    cleanup();
});

// Comprueba que la búsqueda muestra únicamente los productos que coinciden con el nombre.
test("Filtra productos por nombre", () => {

    render(
        <MemoryRouter>
            <Catalogo />
        </MemoryRouter>
    );

    const buscador = screen.getByLabelText("Buscar producto");

    fireEvent.change(buscador, {
        target: { value: "Yamaha" }
    });

    expect(screen.getByText("Guitarra Yamaha")).toBeTruthy();
    expect(screen.queryByText("Batería Pearl")).toBeNull();
    expect(screen.queryByText("Guitarra Fender")).toBeNull();
});

// Comprueba que el filtro de categoría muestra solamente los productos seleccionados.
test("Filtra productos por categoría", () => {

    render(
        <MemoryRouter>
            <Catalogo />
        </MemoryRouter>
    );

    const categoria = screen.getByLabelText("Filtrar por categoría");

    fireEvent.change(categoria, {
        target: { value: "Baterías" }
    });

    expect(screen.getByText("Batería Pearl")).toBeTruthy();
    expect(screen.queryByText("Guitarra Yamaha")).toBeNull();
    expect(screen.queryByText("Guitarra Fender")).toBeNull();
});

// Comprueba que la búsqueda y la categoría funcionan al mismo tiempo.
test("Combina búsqueda por nombre y categoría", () => {

    render(
        <MemoryRouter>
            <Catalogo />
        </MemoryRouter>
    );

    const buscador = screen.getByLabelText("Buscar producto");
    const categoria = screen.getByLabelText("Filtrar por categoría");

    fireEvent.change(buscador, {
        target: { value: "Guitarra" }
    });

    fireEvent.change(categoria, {
        target: { value: "Guitarras Eléctricas" }
    });

    expect(screen.getByText("Guitarra Fender")).toBeTruthy();
    expect(screen.queryByText("Guitarra Yamaha")).toBeNull();
    expect(screen.queryByText("Batería Pearl")).toBeNull();
});

// Comprueba que aparece un mensaje cuando no existen productos coincidentes.
test("Muestra un mensaje cuando no hay resultados", () => {

    render(
        <MemoryRouter>
            <Catalogo />
        </MemoryRouter>
    );

    const buscador = screen.getByLabelText("Buscar producto");

    fireEvent.change(buscador, {
        target: { value: "Trompeta" }
    });

    expect(
        screen.getByText("No se encontraron productos.")
    ).toBeTruthy();
});
