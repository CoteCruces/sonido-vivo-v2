
import { useState } from "react";
import type { FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        mensaje: ""
    });

    const [exito, setExito] = useState("");

    const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nombreLimpio = nombre.trim();
        const correoLimpio = correo.trim();
        const mensajeLimpio = mensaje.trim();

        const nuevosErrores = {
            nombre: "",
            correo: "",
            mensaje: ""
        };

        // Validar nombre
        if (nombreLimpio === "") {
            nuevosErrores.nombre =
                "Debe ingresar su nombre y apellido.";
        } else if (nombreLimpio.length < 6) {
            nuevosErrores.nombre =
                "Debe tener al menos 6 caracteres.";
        } else if (nombreLimpio.split(/\s+/).length < 2) {
            nuevosErrores.nombre =
                "Debe ingresar nombre y apellido.";
        }

        // Validar correo
        if (correoLimpio === "") {
            nuevosErrores.correo =
                "Debe ingresar su correo.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)
        ) {
            nuevosErrores.correo =
                "Debe ingresar un correo válido.";
        }

        // Validar mensaje
        if (mensajeLimpio === "") {
            nuevosErrores.mensaje =
                "Debe ingresar un mensaje.";
        } else if (mensajeLimpio.length < 30) {
            nuevosErrores.mensaje =
                "El mensaje debe tener al menos 30 caracteres.";
        } else if (mensajeLimpio.length > 500) {
            nuevosErrores.mensaje =
                "El mensaje no puede superar los 500 caracteres.";
        }

        setErrores(nuevosErrores);
        setExito("");

        if (Object.values(nuevosErrores).some(error => error !== "")) {
            return;
        }

        setExito("Formulario validado correctamente.");

        setNombre("");
        setCorreo("");
        setMensaje("");
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>

            {/* Nombre */}
            <CampoFormulario
                etiqueta="Nombre Completo *"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={(valor) => {
                    setNombre(valor);
                    setErrores(prev => ({ ...prev, nombre: "" }));
                    setExito("");
                }}
                placeholder="Ej: Juan Flores"
                error={errores.nombre}
            />

            {/* Correo */}
            <CampoFormulario
                etiqueta="Correo Electrónico *"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={(valor) => {
                    setCorreo(valor);
                    setErrores(prev => ({ ...prev, correo: "" }));
                    setExito("");
                }}
                placeholder="ejemplo@correo.com"
                error={errores.correo}
            />

            {/* Mensaje */}
            <div className="mb-4">

                <label
                    htmlFor="mensaje"
                    className="form-label fw-semibold"
                >
                    Mensaje *
                </label>

                <textarea
                    id="mensaje"
                    className={`form-control ${
                        errores.mensaje ? "is-invalid" : ""
                    }`}
                    rows={5}
                    value={mensaje}
                    onChange={(e) => {
                        setMensaje(e.target.value);
                        setErrores(prev => ({
                            ...prev,
                            mensaje: ""
                        }));
                        setExito("");
                    }}
                    placeholder="Escribe tu mensaje aquí..."
                />

                {errores.mensaje && (
                    <div className="invalid-feedback">
                        {errores.mensaje}
                    </div>
                )}

                <small className="text-muted">
                    {mensaje.length}/500 caracteres
                </small>

            </div>

            {/* Mensaje de validación */}
            {exito && (
                <div className="alert alert-success" role="status">
                    {exito}
                </div>
            )}

            {/* Botón */}
            <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold"
            >
                Enviar Mensaje
            </button>

        </form>
    );
}

export default FormularioContacto;
