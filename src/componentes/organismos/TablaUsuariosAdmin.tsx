import { useState } from "react";

import FilaUsuarioAdmin from "../moleculas/FilaUsuarioAdmin";
import { obtenerUsuarios } from "../servicios/usuariosService";

import type { Usuario } from "../utilidades/tipos";

function TablaUsuariosAdmin() {

    const [usuarios] = useState<Usuario[]>(
        obtenerUsuarios
    );

    return (
        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4 text-start">

                <h4 className="fw-bold text-dark mb-3">
                    Listado de Usuarios
                </h4>

                <p className="text-muted">
                    Total de usuarios: {usuarios.length}
                </p>

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
