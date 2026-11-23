import { useState } from "react";
import type { FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [enviando, setEnviando] = useState(false);
    const [errorEnvio, setErrorEnvio] = useState("");
    const [exito, setExito] = useState("");

    const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (enviando) return;

        const nombreLimpio = nombre.trim();
        const correoLimpio = correo.trim();
        const mensajeLimpio = mensaje.trim();

        setErrorEnvio("");
        setExito("");

        const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

        if (!soloLetras.test(nombreLimpio)) {
            alert("Ingrese un nombre válido.");
            return;
        }

        if (
            nombreLimpio.length < 6 ||
            nombreLimpio.length > 100 ||
            nombreLimpio.split(/\s+/).length < 2
        ) {
            alert("Ingrese nombre y apellido (6 a 100 caracteres).");
            return;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio) ||
            correoLimpio.length > 100
        ) {
            alert("Ingrese un correo válido.");
            return;
        }

        if (
            mensajeLimpio.length < 30 ||
            mensajeLimpio.length > 255
        ) {
            alert("El mensaje debe tener entre 30 y 255 caracteres.");
            return;
        }

        setEnviando(true);

        try {
            const respuesta = await fetch("/api/consultas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombreLimpio,
                    correo: correoLimpio,
                    asunto: "Consulta de contacto",
                    mensaje: mensajeLimpio,
                    respuesta: null,
                    usuarioId: null,
                })
            });

            if (!respuesta.ok) {
                throw new Error(
                    `Error al enviar la consulta (${respuesta.status}).`
                );
            }

            setExito("Tu mensaje fue enviado correctamente.");

            setNombre("");
            setCorreo("");
            setMensaje("");

        } catch (error) {
            setErrorEnvio(
                error instanceof Error
                    ? error.message
                    : "No se pudo enviar el mensaje."
            );
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            <CampoFormulario
                etiqueta="Nombre Completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
                placeholder="Ej: Juan Flores"
            />

            <CampoFormulario
                etiqueta="Correo Electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
                placeholder="ejemplo@correo.com"
            />

            <div className="mb-3">
                <label
                    htmlFor="mensaje"
                    className="form-label fw-semibold"
                >
                    Mensaje
                </label>

                <textarea
                    id="mensaje"
                    className="form-control"
                    rows={5}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                />
            </div>

            {errorEnvio && (
                <div className="alert alert-danger" role="alert">
                    {errorEnvio}
                </div>
            )}

            {exito && (
                <div className="alert alert-success" role="status">
                    {exito}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                disabled={enviando}
            >
                {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
        </form>
    );
}

export default FormularioContacto;
