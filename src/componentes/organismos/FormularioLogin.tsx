
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function FormularioLogin() {

    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [errores, setErrores] = useState({
        correo: "",
        clave: ""
    });

    const validarFormulario = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevosErrores = {
            correo: "",
            clave: ""
        };

        // Validación de correo
        if (correo.trim() === "") {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
        ) {
            nuevosErrores.correo = "Ingrese un correo válido.";
        }

        // Validación de contraseña
        if (clave.trim() === "") {
            nuevosErrores.clave = "La contraseña es obligatoria.";
        } else if (clave.length < 4 || clave.length > 10) {
            nuevosErrores.clave =
                "La contraseña debe tener entre 4 y 10 caracteres.";
        }

        setErrores(nuevosErrores);

        // Verificar si existen errores
        if (nuevosErrores.correo || nuevosErrores.clave) {
            return;
        }

        alert("Formulario validado correctamente");
    };

    return (
        <form onSubmit={validarFormulario} noValidate>

            <div className="mb-3">
                <label className="form-label">
                    Correo Electrónico
                </label>

                <input
                    type="email"
                    className={`form-control ${
                        errores.correo ? "is-invalid" : ""
                    }`}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="correo@ejemplo.com"
                />

                {errores.correo && (
                    <div className="invalid-feedback">
                        {errores.correo}
                    </div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Contraseña
                </label>

                <input
                    type="password"
                    className={`form-control ${
                        errores.clave ? "is-invalid" : ""
                    }`}
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="Ingrese su contraseña"
                />

                {errores.clave && (
                    <div className="invalid-feedback">
                        {errores.clave}
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Entrar
            </button>

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
