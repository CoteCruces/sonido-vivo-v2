import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import PerfilUsuario from "../organismos/PerfilUsuario";
import FormularioEditarPerfil from "../organismos/FormularioEditarPerfil";

import { obtenerSesion } from "../servicios/sesionesService";
import { obtenerPerfilApi } from "../servicios/usuariosApi";

import type { Usuario } from "../utilidades/tipos";

function MiCuenta() {
  const sesion = obtenerSesion();
  const correoSesion = sesion?.correo;

  // Datos del usuario obtenidos desde MySQL.
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Controlar la carga de datos.
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Mostrar u ocultar el formulario de edición.
  const [editando, setEditando] = useState(false);

  // Mensaje después de guardar.
  const [mensaje, setMensaje] = useState("");

  // Consultar el perfil desde Spring Boot.
  useEffect(() => {
    if (!correoSesion) {
      setCargando(false);
      return;
    }

    let activo = true;

    setCargando(true);
    setError("");
    setUsuario(null);
    setEditando(false);
    setMensaje("");

    obtenerPerfilApi()
      .then((perfil) => {
        if (!activo) return;

        const usuarioActualizado: Usuario = {
          run: perfil.run ?? "",
          nombre: perfil.nombre,
          apellidos: perfil.apellidos ?? "",
          correo: perfil.email,
          rol: perfil.rol === "ADMIN" ? "Administrador" : "Cliente",
          fechaNacimiento: perfil.fechaNacimiento ?? "",
          direccion: perfil.direccion ?? "",
          region: perfil.region ?? "",
          comuna: perfil.comuna ?? "",
        };

        setUsuario(usuarioActualizado);
      })
      .catch((error) => {
        if (activo) {
          setError(
            error instanceof Error
              ? error.message
              : "No se pudo cargar tu perfil.",
          );
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [correoSesion]);

  // Se ejecuta cuando MySQL confirma la actualización.
  const manejarGuardado = (actualizado: Usuario) => {
    setUsuario(actualizado);
    setEditando(false);
    setMensaje("Tus datos se actualizaron correctamente.");
  };

  // Verificar sesión.
  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  // Esperar respuesta del backend.
  if (cargando) {
    return (
      <main className="container my-5">
        <p>Cargando datos de tu cuenta...</p>
      </main>
    );
  }

  // Mostrar errores.
  if (error) {
    return (
      <main className="container my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>

        <Link to="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </main>
    );
  }

  // Verificar que exista el perfil.
  if (!usuario) {
    return (
      <main className="container my-5">
        <div className="alert alert-warning">
          No se encontraron los datos de tu cuenta.
        </div>

        <Link to="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <div className="mb-4 text-start">
        <h2 className="fw-bold">Mi Cuenta</h2>

        <p className="text-muted">
          Bienvenido, {usuario.nombre}. Aquí puedes consultar y modificar tus
          datos.
        </p>
      </div>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {!editando && (
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setMensaje("");
              setEditando(true);
            }}
          >
            Editar mis datos
          </button>
        </div>
      )}

      {editando ? (
        <FormularioEditarPerfil
          usuario={usuario}
          onGuardado={manejarGuardado}
          onCancelar={() => setEditando(false)}
        />
      ) : (
        <PerfilUsuario usuario={usuario} />
      )}

      <div className="mt-4">
        <Link to="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}

export default MiCuenta;
