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
        if(nombre.trim() === ""){
            alert("Debe ingresar su nombre");
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
        alert("Gracias por contactarte con nosotros!")
    };

    return(
        <form onSubmit = {manejarEnvio} noValidate>
            <CampoFormulario 
                etiqueta = "Nombre Completo"
                tipo = "text"
                nombre = "nombre"
                valor = {nombre}
                alCambiar = {setNombre}
            />
            <CampoFormulario 
                etiqueta = "Correo Electronico"
                tipo = "text"
                nombre = "correo"
                valor = {correo}
                alCambiar = {setCorreo}
            />
            <CampoFormulario 
                etiqueta = "Mensaje"
                tipo = "text"
                nombre = "mensaje"
                valor = {mensaje}
                alCambiar = {setMensaje}
            />
            <button type = "submit" className = "btn btn-primary">
                Enviar mensaje
            </button>
        </form>
    );
}
export default FormularioContacto;