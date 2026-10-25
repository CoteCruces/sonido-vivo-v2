// @vitest-environment jsdom

import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Boton from "../componentes/atomos/Boton";

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