// @vitest-environment jsdom

import { beforeEach, afterEach, test, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Catalogo from "../componentes/paginas/Catalogo";
import { obtenerProductosApi } from "../componentes/servicios/productosApi";
import type { Producto } from "../componentes/utilidades/tipos";

// Simular la API para no depender de MySQL en las pruebas.
vi.mock("../componentes/servicios/productosApi", () => ({
  obtenerProductosApi: vi.fn(),
}));

// Aislar las pruebas de los botones del carrito.
vi.mock("../componentes/moleculas/CardCatalogo", () => ({
  default: ({ producto }: { producto: Producto }) => (
    <div>{producto.nombre}</div>
  ),
}));

const productosPrueba: Producto[] = [
  {
    id: 1,
    nombre: "Guitarra Yamaha",
    categoria: "Guitarras Acústicas",
    descripcion: "Guitarra de prueba",
    precio: 129990,
    stock: 10,
    imagen: "/img/guitarra.jpg",
  },
  {
    id: 2,
    nombre: "Batería Pearl",
    categoria: "Baterías",
    descripcion: "Batería de prueba",
    precio: 350000,
    stock: 5,
    imagen: "/img/bateria.jpg",
  },
  {
    id: 3,
    nombre: "Guitarra Fender",
    categoria: "Guitarras Eléctricas",
    descripcion: "Guitarra eléctrica de prueba",
    precio: 199990,
    stock: 8,
    imagen: "/img/fender.jpg",
  },
];

beforeEach(() => {
  vi.mocked(obtenerProductosApi).mockResolvedValue(productosPrueba);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Prueba 1: Buscar por nombre.
test("Filtra productos por nombre", async () => {
  render(
    <MemoryRouter>
      <Catalogo />
    </MemoryRouter>,
  );

  const buscador = await screen.findByLabelText("Buscar producto");

  fireEvent.change(buscador, {
    target: { value: "Yamaha" },
  });

  expect(screen.getByText("Guitarra Yamaha")).toBeTruthy();
  expect(screen.queryByText("Batería Pearl")).toBeNull();
  expect(screen.queryByText("Guitarra Fender")).toBeNull();
});

// Prueba 2: Filtrar por categoría.
test("Filtra productos por categoría", async () => {
  render(
    <MemoryRouter>
      <Catalogo />
    </MemoryRouter>,
  );

  const categoria = await screen.findByLabelText("Filtrar por categoría");

  fireEvent.change(categoria, {
    target: { value: "Baterías" },
  });

  expect(screen.getByText("Batería Pearl")).toBeTruthy();
  expect(screen.queryByText("Guitarra Yamaha")).toBeNull();
  expect(screen.queryByText("Guitarra Fender")).toBeNull();
});

// Prueba 3: Combinar nombre y categoría.
test("Combina búsqueda por nombre y categoría", async () => {
  render(
    <MemoryRouter>
      <Catalogo />
    </MemoryRouter>,
  );

  const buscador = await screen.findByLabelText("Buscar producto");
  const categoria = screen.getByLabelText("Filtrar por categoría");

  fireEvent.change(buscador, {
    target: { value: "Guitarra" },
  });

  fireEvent.change(categoria, {
    target: { value: "Guitarras Eléctricas" },
  });

  expect(screen.getByText("Guitarra Fender")).toBeTruthy();
  expect(screen.queryByText("Guitarra Yamaha")).toBeNull();
  expect(screen.queryByText("Batería Pearl")).toBeNull();
});

// Prueba 4: Sin resultados.
test("Muestra un mensaje cuando no hay resultados", async () => {
  render(
    <MemoryRouter>
      <Catalogo />
    </MemoryRouter>,
  );

  const buscador = await screen.findByLabelText("Buscar producto");

  fireEvent.change(buscador, {
    target: { value: "Trompeta" },
  });

  expect(screen.getByText("No se encontraron productos.")).toBeTruthy();
});
