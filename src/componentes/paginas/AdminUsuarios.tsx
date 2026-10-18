import { useState } from "react";
import { useTienda } from "../../contextos/TiendaContexto";
import type { Usuario } from "../../utilidades/tipos";
import FormularioUsuario from "../organismos/FormularioUsuario";
export default function AdminUsuarios() {
  const { usuarios, borrarUsuario } = useTienda();
  const [seleccionado, setSeleccionado] = useState<Usuario | null>(null);
  const [mostrar, setMostrar] = useState(false);
  const [aviso, setAviso] = useState("");
  function eliminar(u: Usuario) {
    if (window.confirm(`¿Eliminar a ${u.nombre} ${u.apellidos}?`)) {
      borrarUsuario(u.run);
      setAviso("Usuario eliminado correctamente.");
    }
  }
  return (
    <>
      <main className="container my-5 flex-grow-1">
        {aviso && <div className="alert alert-success">{aviso}</div>}
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body p-4 d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold text-dark mb-0">Mantenedor de Usuarios</h2>
              <p className="text-muted mb-0">
                Gestión de cuentas, datos personales y asignación de perfil/rol
              </p>
            </div>
            <button
              className="btn btn-success"
              onClick={() => {
                setSeleccionado(null);
                setMostrar(true);
              }}
            >
              <i className="bi bi-person-plus-fill me-1" /> Nuevo Usuario
            </button>
          </div>
        </div>
        <div
          className="card shadow-sm border-0 w-100"
          style={{ maxHeight: 450, overflowY: "auto" }}
        >
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>RUN</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.run}>
                      <td>{u.run}</td>
                      <td>
                        {u.nombre} {u.apellidos}
                      </td>
                      <td>{u.correo}</td>
                      <td>{u.rol}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setSeleccionado(u);
                            setMostrar(true);
                          }}
                        >
                          <i className="bi bi-pencil" /> Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminar(u)}
                        >
                          <i className="bi bi-trash" /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {mostrar && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setMostrar(false)}
          />
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">Gestión de Usuario</h5>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setMostrar(false)}
                    aria-label="Cerrar"
                  />
                </div>
                <div className="modal-body">
                  <FormularioUsuario
                    key={seleccionado?.run ?? "nuevo"}
                    usuario={seleccionado ?? undefined}
                    cerrar={(guardado) => {
                      setMostrar(false);
                      if (guardado) setAviso("Usuario guardado correctamente.");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
