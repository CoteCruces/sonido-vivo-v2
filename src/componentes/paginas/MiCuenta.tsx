import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import PerfilUsuario from "../organismos/PerfilUsuario";
import FormularioEditarPerfil from "../organismos/FormularioEditarPerfil";

import { obtenerSesion } from "../servicios/sesionesService";
import { obtenerUsuarios } from "../servicios/usuariosService";

import type { Usuario } from "../utilidades/tipos";

function MiCuenta() {

    const sesion = obtenerSesion();

    // Recuperar los datos del usuario conectado
    const [usuario, setUsuario] = useState<Usuario | null>(() => {

        const sesionActual = obtenerSesion();

        if (!sesionActual) {
            return null;
        }

        return obtenerUsuarios().find(
            (u) =>
                u.correo.toLowerCase() ===
                sesionActual.correo.toLowerCase()
        ) ?? null;
    });

    // Mostrar u ocultar el formulario
    const [editando, setEditando] = useState(false);

    // Mensaje después de guardar
    const [mensaje, setMensaje] = useState("");

    // Actualizar la información en pantalla
    const manejarGuardado = (actualizado: Usuario) => {
        setUsuario(actualizado);
        setEditando(false);
        setMensaje("Tus datos se actualizaron correctamente.");
    };

    // Verificar sesión
    if (!sesion) {
        return <Navigate to="/login" replace />;
    }

    // Verificar cuenta
    if (!usuario) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning">
                    No se encontraron los datos de tu cuenta.
                </div>

                <Link to="/" className="btn btn-secondary">
                    Volver al Inicio
                </Link>
            </div>
        );
    }

    return (
        <main className="container my-5">

            {/* Encabezado */}
            <div className="mb-4 text-start">

                <h2 className="fw-bold">
                    Mi Cuenta
                </h2>

                <p className="text-muted">
                    Bienvenido, {usuario.nombre}.
                    Aquí puedes consultar y modificar tus datos.
                </p>

            </div>

            {/* Mensaje de éxito */}
            {mensaje && (
                <div
                    className="alert alert-success"
                    role="status"
                >
                    {mensaje}
                </div>
            )}

            {/* Botón para comenzar la edición */}
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

            {/* Mostrar formulario o perfil */}
            {editando ? (
                <FormularioEditarPerfil
                    usuario={usuario}
                    onGuardado={manejarGuardado}
                    onCancelar={() => setEditando(false)}
                />
            ) : (
                <PerfilUsuario usuario={usuario} />
            )}

            {/* Volver */}
            <div className="mt-4">
                <Link
                    to="/"
                    className="btn btn-secondary"
                >
                    Volver al Inicio
                </Link>
            </div>

        </main>
    );
}

export default MiCuenta;
