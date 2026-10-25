// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Boton from "../componentes/atomos/Boton";

// Limpia los componentes HTML después de cada prueba. Esto asegura que no haya interferencias entre pruebas 
// y que cada prueba comience con un estado limpio.
afterEach(() => {
    cleanup();
});

test("El botón permite ver el producto seleccionado", () => {

    render(
        <MemoryRouter>
            <Boton id={3} />
        </MemoryRouter>
    );

    const boton = screen.getByRole("link", {
        name: "Ver Producto"
    });

    expect(boton.textContent).toBe("Ver Producto");
    expect(boton.getAttribute("href")).toBe("/producto/3");
});

//Esta prueba comprueba: que aparece el texto "Ver Producto" y que el enlace utiliza el ID correcto. 
//En este caso, el ID es 3, por lo que el enlace debería ser "/producto/3".