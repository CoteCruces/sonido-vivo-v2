import type { Usuario } from "../utilidades/tipos";
import BotonAdmin from "../atomos/BotonAdmin";

interface Props {
    usuario: Usuario;
    onEliminar: (run: string) => void;
}

function FilaUsuarioAdmin({ usuario, onEliminar }: Props) {
    return (
        <tr>
            <td>{usuario.run}</td>

            <td className="fw-semibold">
                {usuario.nombre} {usuario.apellidos}
            </td>

            <td>{usuario.correo}</td>

            <td>
                <span
                    className={`badge ${
                        usuario.rol === "Administrador"
                            ? "bg-danger"
                            : "bg-secondary"
                    }`}
                >
                    {usuario.rol}
                </span>
            </td>

            <td>
                <div className="d-flex flex-wrap gap-2">
                    <BotonAdmin
                        texto="Editar"
                        color="warning"
                        destino={`/admin/usuarios/editar/${encodeURIComponent(usuario.run)}`}
                    />

                    <BotonAdmin
                        texto="Eliminar"
                        color="danger"
                        onClick={() => onEliminar(usuario.run)}
                    />
                </div>
            </td>
        </tr>
    );
}

export default FilaUsuarioAdmin;
