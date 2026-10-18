import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { emailValido } from "../../utilidades/funciones";
export default function FormularioContacto() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", mensaje: "" });
  const [error, setError] = useState("");
  const navegar = useNavigate();
  function enviar(e: FormEvent) {
    e.preventDefault();
    if (
      !datos.nombre.trim() ||
      datos.nombre.length > 100 ||
      !emailValido(datos.correo) ||
      datos.correo.length > 100 ||
      !datos.mensaje.trim() ||
      datos.mensaje.length > 500
    ) {
      setError("Revisa los campos obligatorios y sus longitudes.");
      return;
    }
    navegar("/mensaje-enviado");
  }
  return (
    <form id="form-contacto" onSubmit={enviar} noValidate>
      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label fw-semibold">
          Nombre Completo *
        </label>
        <input
          className="form-control"
          id="contacto-nombre"
          maxLength={100}
          placeholder="Ej: María González"
          required
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contacto-correo" className="form-label fw-semibold">
          Correo Electrónico *
        </label>
        <input
          type="email"
          className="form-control"
          id="contacto-correo"
          maxLength={100}
          placeholder="nombre@ejemplo.com"
          required
          value={datos.correo}
          onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label fw-semibold">
          Mensaje *
        </label>
        <textarea
          className="form-control"
          id="contacto-mensaje"
          maxLength={500}
          placeholder="Escribe tu mensaje aquí..."
          required
          rows={5}
          value={datos.mensaje}
          onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
        />
        <div className="form-text">Máximo 500 caracteres.</div>
      </div>
      {error && (
        <p className="alert alert-danger" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-100 py-2">
        Enviar Mensaje
      </button>
    </form>
  );
}
