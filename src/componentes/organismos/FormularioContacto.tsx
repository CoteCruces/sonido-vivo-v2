
import { useState } from "react";
import type { FormEvent } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto() {

    // Estados para guardar los datos
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Validaciones
    const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nombreLimpio = nombre.trim();
        const correoLimpio = correo.trim();
        const mensajeLimpio = mensaje.trim();

        // 1. Validar nombre completo
        if (nombreLimpio === "") {
            alert("Debe ingresar su nombre y apellido.");
            return;
        }

        if (nombreLimpio.length < 6) {
            alert("El nombre completo debe tener al menos 6 caracteres.");
            return;
        }

        const palabrasNombre = nombreLimpio.split(/\s+/);

        if (palabrasNombre.length < 2) {
            alert("Por favor ingrese su nombre y apellido.");
            return;
        }

        // 2. Validar correo
        if (correoLimpio === "") {
            alert("Debe ingresar su correo.");
            return;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(correoLimpio)) {
            alert("Debe ingresar un correo válido.");
            return;
        }

        // 3. Validar mensaje
        if (mensajeLimpio === "") {
            alert("Debe ingresar un mensaje.");
            return;
        }

        if (mensajeLimpio.length < 30) {
            alert("El mensaje debe tener al menos 30 caracteres.");
            return;
        }

        if (mensajeLimpio.length > 500) {
            alert("El mensaje no puede superar los 500 caracteres.");
            return;
        }

        // Todas las validaciones fueron correctas
        alert("Formulario validado correctamente.");

        // Limpiar campos
        setNombre("");
        setCorreo("");
        setMensaje("");
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

            <button
                type="submit"
                className="btn btn-primary"
            >
                Enviar mensaje
            </button>

        </form>
    );
}

export default FormularioContacto;
