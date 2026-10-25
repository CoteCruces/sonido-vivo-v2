// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import CampoFormulario from "../componentes/moleculas/CampoFormulario";

// Limpia los componentes HTML después de cada prueba. Esto asegura que no haya interferencias entre pruebas 
// y que cada prueba comience con un estado limpio.
afterEach(() => {
    cleanup();
});

// Comprueba que aparece el mensaje cuando el campo tiene un error.
test("Muestra un error cuando el campo es inválido", () => {

    render(
        <CampoFormulario
            etiqueta="Nombre"
            nombre="nombre"
            valor=""
            alCambiar={() => {}}
            error="El nombre es obligatorio."
        />
    );

    const error = screen.getByText(
        "El nombre es obligatorio."
    );

    expect(error.textContent).toBe(
        "El nombre es obligatorio."
    );
});

// Comprueba que el campo muestra el valor recibido sin errores.
test("Muestra correctamente el valor del campo", () => {

    render(
        <CampoFormulario
            etiqueta="Nombre"
            nombre="nombre"
            valor="Ana"
            alCambiar={() => {}}
        />
    );

    const campo = screen.getByRole("textbox", {
        name: "Nombre"
    }) as HTMLInputElement;

    expect(campo.value).toBe("Ana");
    expect(campo.getAttribute("aria-invalid")).toBe("false");
});
