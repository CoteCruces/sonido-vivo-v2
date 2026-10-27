import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { autenticarUsuario } from "../servicios/usuariosService";
import { iniciarSesion } from "../servicios/sesionesService";

function FormularioLogin() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");

    const [errores, setErrores] = useState({
        correo: "",
        clave: ""
    });

    const [errorLogin, setErrorLogin] = useState("");

    const validarFormulario = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores = {
            correo: "",
            clave: ""
        };

        // Valida que el correo sea obligatorio, tenga formato correcto y máximo 100 caracteres.
        if (correo.trim() === "") {
            nuevosErrores.correo =
                "El correo es obligatorio.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
        ) {
            nuevosErrores.correo =
                "Ingrese un correo válido.";
        } else if (correo.trim().length > 100) {
            nuevosErrores.correo = "El correo no puede superar 100 caracteres.";
        }

        // Valida que la contraseña no esté vacía y tenga entre 4 y 10 caracteres.
        if (!clave.trim()) {
            nuevosErrores.clave =
                "La contraseña es obligatoria.";
        } else if (
            clave.length < 4 ||
            clave.length > 10
        ) {
            nuevosErrores.clave =
                "La contraseña debe tener entre 4 y 10 caracteres.";
        }

        setErrores(nuevosErrores);
        setErrorLogin("");

        // Detener si hay errores de validación
        if (nuevosErrores.correo || nuevosErrores.clave) {
            return;
        }

        // Comprobar correo y contraseña
        const usuario = autenticarUsuario(correo, clave);

        if (!usuario) {
            setErrorLogin(
                "Correo electrónico o contraseña incorrectos."
            );
            return;
        }

        try {
            // Guardar la sesión
            iniciarSesion(usuario);

            // Redirigir según el rol
            if (usuario.rol === "Administrador") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }

        } catch {
            setErrorLogin(
                "No se pudo iniciar la sesión."
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
