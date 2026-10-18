import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";

function FormularioContacto(){
    //estados para guardar los datos del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    //valida los datos al enviar el formulario
    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); //evita recargar la pagina
        const nombreLimpio = nombre.trim();

        // 1. Validaciones para el campo Nombre Completo
        if (nombreLimpio === "") {
            alert("Debe ingresar su nombre y apellido.");
            return;
        }

        // Validar largo mínimo global (ej. al menos 6 caracteres)
        if (nombreLimpio.length < 6) {
            alert("El nombre completo debe tener al menos 6 caracteres.");
            return;
        }

        // Validar que existan al menos dos palabras (Nombre y Apellido)
        const palabrasNombre = nombreLimpio.split(/\s+/);
        if (palabrasNombre.length < 2) {
            alert("Por favor ingrese tanto su nombre como su apellido.");
            return;
        }

        if(correo.trim() === ""){
            alert("Debe ingresar su correo")
            return;
        }


        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
            alert("Debe ingresar un correo válido");
            return;
        }

        if(mensaje.trim() === ""){
            alert("Debe ingresar un mensaje");
            return;
        }

        // Validación de largo mínimo para el mensaje (ej. evitar spam de una letra)
        if(mensaje.trim().length < 30){
            alert("El mensaje debe tener al menos 30 caracteres.");
            return;
        }

        // Validación de máximo 500 caracteres
        if(mensaje.length > 500){
            alert("El mensaje no puede superar los 500 caracteres.");
            return;
        }

        alert("Gracias por contactarte con nosotros!")

        // Limpiamos los campos reseteando sus estados a vacío
        setNombre("");
        setCorreo("");
        setMensaje("");
    };

    return(
        <form onSubmit = {manejarEnvio} noValidate>
            <CampoFormulario 
                etiqueta = "Nombre Completo"
                tipo = "text"
                nombre = "nombre"
                valor = {nombre}
                alCambiar = {setNombre}
                placeholder = "Ej: Juan Flores"
            />
            <CampoFormulario 
                etiqueta = "Correo Electronico"
                tipo = "text"
                nombre = "correo"
                valor = {correo}
                alCambiar = {setCorreo}
                placeholder="ejemplo@correo.com"
            />
            <CampoFormulario 
                etiqueta = "Mensaje"
                tipo = "text"
                nombre = "mensaje"
                valor = {mensaje}
                alCambiar = {setMensaje}
                placeholder="Escribe tu mensaje aquí... máximo de 500 caracteres"
            />
            <button type = "submit" className = "btn btn-primary">
                Enviar mensaje
            </button>
        </form>
    );
}
export default FormularioContacto;