import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { iniciarSesionApi } from "../servicios/usuariosApi";

function FormularioLogin() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");

    const [errores, setErrores] = useState({
        correo: "",
        clave: ""
    });

    const [errorLogin, setErrorLogin] = useState("");

    
    const validarFormulario = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores = {
            correo: "",
            clave: ""
        };

        // Validar correo.
        if (correo.trim() === "") {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
        ) {
            nuevosErrores.correo = "Ingrese un correo válido.";
        } else if (correo.trim().length > 100) {
            nuevosErrores.correo =
                "El correo no puede superar 100 caracteres.";
        }

        // Validar contraseña.
        if (clave.trim() === "") {
            nuevosErrores.clave = "La contraseña es obligatoria.";
        }

        setErrores(nuevosErrores);
        setErrorLogin("");

        if (nuevosErrores.correo || nuevosErrores.clave) {
            return;
        }

        try {
            // Enviar las credenciales a Spring Boot.
            const respuesta = await iniciarSesionApi(correo, clave);

            // Leer el correo y el rol incluidos en el JWT.
            const partes = respuesta.token.split(".");

            if (partes.length !== 3) {
                throw new Error("El servidor devolvió un token inválido.");
            }

            const contenido = JSON.parse(
                atob(
                    partes[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );

            if (
                typeof contenido.sub !== "string" ||
                (contenido.rol !== "ADMIN" &&
                contenido.rol !== "CLIENTE") ||
                typeof contenido.exp !== "number" ||
                contenido.exp * 1000 <= Date.now()
            ) {
                throw new Error("Los datos de la sesión no son válidos.");
            }

            // Adaptar el rol al formato actual de React.
            const rol = contenido.rol === "ADMIN"
                ? "Administrador"
                : "Cliente";

            // Guardar el token para futuras peticiones.
            sessionStorage.setItem(
                "sonidoVivoToken",
                respuesta.token
            );

            // Mantener el formato que utiliza el frontend.
            sessionStorage.setItem(
                "sonidoVivoSesion",
                JSON.stringify({
                    correo: contenido.sub,
                    rol
                })
            );

            // Redirigir según el rol.
            if (rol === "Administrador") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }

        } catch (error) {
            setErrorLogin(
                error instanceof Error
                    ? error.message
                    : "No se pudo iniciar sesión."
            );
        }
    };


    return (
        <form onSubmit={validarFormulario} noValidate>

            {/* Correo electrónico */}
            <div className="mb-3">
                <label
                    htmlFor="correoLogin"
                    className="form-label"
                >
                    Correo Electrónico
                </label>

                <input
                    id="correoLogin"
                    type="email"
                    className={`form-control ${
                        errores.correo ? "is-invalid" : ""
                    }`}
                    value={correo}
                    onChange={(e) => {
                        setCorreo(e.target.value);
                        setErrores(prev => ({
                            ...prev,
                            correo: ""
                        }));
                        setErrorLogin("");
                    }}
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                />

                {errores.correo && (
                    <div className="invalid-feedback">
                        {errores.correo}
                    </div>
                )}
            </div>

            {/* Contraseña */}
            <div className="mb-3">
                <label
                    htmlFor="claveLogin"
                    className="form-label"
                >
                    Contraseña
                </label>

                <input
                    id="claveLogin"
                    type="password"
                    className={`form-control ${
                        errores.clave ? "is-invalid" : ""
                    }`}
                    value={clave}
                    onChange={(e) => {
                        setClave(e.target.value);
                        setErrores(prev => ({
                            ...prev,
                            clave: ""
                        }));
                        setErrorLogin("");
                    }}
                    placeholder="Ingrese su contraseña"
                    autoComplete="current-password"
                />

                {errores.clave && (
                    <div className="invalid-feedback">
                        {errores.clave}
                    </div>
                )}
            </div>

            {/* Error de autenticación */}
            {errorLogin && (
                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {errorLogin}
                </div>
            )}

            {/* Botón de inicio de sesión */}
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Entrar
            </button>

            {/* Enlace a Registro */}
            <div className="text-center mt-3">
                ¿No tienes cuenta?{" "}
                <Link to="/registro">
                    Regístrate aquí
                </Link>
            </div>

        </form>
    );
}

export default FormularioLogin;
