import { useState } from "react";

import FilaUsuarioAdmin from "../moleculas/FilaUsuarioAdmin";
import { obtenerUsuarios, eliminarUsuario } from "../servicios/usuariosService";

import type { Usuario } from "../utilidades/tipos";
import { obtenerSesion } from "../servicios/sesionesService";

function TablaUsuariosAdmin() {

    const [usuarios, setUsuarios] = useState<Usuario[]>(
        obtenerUsuarios
    );

    const [error, setError] = useState("");

    
    const manejarEliminar = (run: string) => {

        setError("");

        // Buscar al usuario seleccionado
        const usuario = usuarios.find(
            (u) => u.run === run
        );

        if (!usuario) {
            return;
        }

        // Evitar eliminar la propia cuenta durante la sesión
        const sesion = obtenerSesion();

        if (
            sesion &&
            sesion.correo.toLowerCase() ===
                usuario.correo.toLowerCase()
        ) {
            setError(
                "No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada."
            );
            return;
        }

        // Solicitar confirmación
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar al usuario "${usuario.nombre} ${usuario.apellidos}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            // Eliminar mediante el servicio
            const eliminado = eliminarUsuario(run);

            if (!eliminado) {
                setError("No se encontró el usuario.");
                return;
            }

            // Actualizar la tabla
            setUsuarios(obtenerUsuarios());

        } catch {
            setError("No se pudo eliminar el usuario.");
        }
    };


    return (
        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4 text-start">

                <h4 className="fw-bold text-dark mb-3">
                    Listado de Usuarios
                </h4>

                <p className="text-muted">
                    Total de usuarios: {usuarios.length}
                </p>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="table-responsive">

                    <table className="table table-striped table-hover align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>RUN</th>
                                <th>Nombre Completo</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuarios.map((usuario) => (
                                <FilaUsuarioAdmin
                                    key={usuario.run}
                                    usuario={usuario}
                                    onEliminar={manejarEliminar}
                                />
                            ))}
                        </tbody>

                    </table>

                </div>

                {usuarios.length === 0 && (
                    <div className="alert alert-info">
                        Todavía no hay usuarios registrados.
                    </div>
                )}

            </div>

        </div>
    );
}

export default TablaUsuariosAdmin;
