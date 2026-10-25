// @vitest-environment jsdom

import { beforeEach, test, expect } from "vitest";

import {
    registrarUsuario,
    obtenerUsuarios,
    autenticarUsuario,
    editarUsuarioAdmin,
    eliminarUsuario
} from "../componentes/servicios/usuariosService";

// Usuario de ejemplo que se utilizará en las pruebas
const usuarioPrueba = {
    run: "12.345.678-5",
    nombre: "Juan",
    apellidos: "Pérez",
    correo: "juan@ejemplo.com",
    clave: "Clave123"
};

beforeEach(() => {
    localStorage.clear();
});

// Comprueba que registrar un usuario guarda la cuenta correctamente.
test("Registra un usuario nuevo", () => {

    registrarUsuario(usuarioPrueba);

    const usuarios = obtenerUsuarios();

    expect(usuarios.length).toBe(1);
    expect(usuarios[0].nombre).toBe("Juan");
});

// Comprueba que no se permite registrar dos veces el mismo correo.
test("No permite correos duplicados", () => {

    registrarUsuario(usuarioPrueba);

    expect(() => {
        registrarUsuario({
            ...usuarioPrueba,
            run: "15.222.333-7"
        });
    }).toThrow("El correo electrónico ya está registrado.");
});

// Comprueba que el Login acepta las credenciales correctas.
test("Inicia sesión con correo y contraseña correctos", () => {

    registrarUsuario(usuarioPrueba);

    const usuario = autenticarUsuario(
        "juan@ejemplo.com",
        "Clave123"
    );

    expect(usuario?.nombre).toBe("Juan");
    expect(usuario?.rol).toBe("Cliente");
});

// Comprueba que el Login rechaza una contraseña incorrecta.
test("Rechaza una contraseña incorrecta", () => {

    registrarUsuario(usuarioPrueba);

    const usuario = autenticarUsuario(
        "juan@ejemplo.com",
        "Incorrecta"
    );

    expect(usuario).toBe(null);
});


// Comprueba que no se pueden registrar dos usuarios con el mismo RUN.
test("No permite registrar un RUN duplicado", () => {

    registrarUsuario(usuarioPrueba);

    expect(() => registrarUsuario({
        ...usuarioPrueba,
        correo: "otro@ejemplo.com"
    })).toThrow();

    expect(obtenerUsuarios().length).toBe(1);
});

// Comprueba que no se puede iniciar sesión con un correo no registrado.
test("Rechaza un correo que no está registrado", () => {

    registrarUsuario(usuarioPrueba);

    const usuario = autenticarUsuario(
        "inexistente@ejemplo.com",
        "Clave123"
    );

    expect(usuario).toBe(null);
});


// Comprueba que el administrador puede editar los datos de un usuario.
test("Edita un usuario correctamente", () => {

    registrarUsuario(usuarioPrueba);

    editarUsuarioAdmin(usuarioPrueba.run, {
        nombre: "Pedro",
        apellidos: "González",
        rol: "Administrador"
    });

    const usuarios = obtenerUsuarios();

    expect(usuarios[0].nombre).toBe("Pedro");
    expect(usuarios[0].apellidos).toBe("González");
    expect(usuarios[0].rol).toBe("Administrador");
    expect(usuarios[0].run).toBe(usuarioPrueba.run);
});

// Comprueba que el administrador puede eliminar un usuario.
test("Elimina un usuario correctamente", () => {

    registrarUsuario(usuarioPrueba);

    eliminarUsuario(usuarioPrueba.run);

    const usuarios = obtenerUsuarios();

    expect(usuarios.length).toBe(0);
});

