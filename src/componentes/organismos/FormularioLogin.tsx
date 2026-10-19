
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setMensaje("");

        // Validar correo
        if (correo.trim() === "") {
            setError("Debe ingresar su correo electrónico.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setError("Debe ingresar un correo válido.");
            return;
        }

        // Validar contraseña
        if (clave.trim() === "") {
            setError("Debe ingresar su contraseña.");
            return;
        }

        if (clave.length < 4 || clave.length > 10) {
            setError(
                "La contraseña debe tener entre 4 y 10 caracteres."
            );
            return;
        }

        // Por ahora solo se valida el formulario
        setMensaje(
            "Formulario válido. Falta conectar la autenticación."
        );
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta="Correo Electrónico *"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
                placeholder="correo@ejemplo.com"
            />

            <CampoFormulario
                etiqueta="Contraseña *"
                tipo="password"
                nombre="clave"
                valor={clave}
                alCambiar={setClave}
                placeholder="Entre 4 y 10 caracteres"
            />

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {mensaje && (
                <div className="alert alert-info" role="status">
                    {mensaje}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold"
            >
                Entrar
            </button>

            <div className="text-center mt-3">
                <small className="text-muted">
                    ¿No tienes cuenta?{" "}
                    <Link
                        to="/registro"
                        className="text-primary fw-bold"
                    >
                        Regístrate aquí
                    </Link>
                </small>
            </div>

        </form>
    );
}

export default FormularioLogin;
