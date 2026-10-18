import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import { dinero, emailValido } from "../../utilidades/funciones";
function DatosPerfil({ correo }: { correo: string }) {
  const { usuarios, guardarUsuario, pedidos } = useTienda();
  const usuario = usuarios.find((u) => u.correo === correo);
  const [editar, setEditar] = useState(false);
  const [nombre, setNombre] = useState(
    usuario ? `${usuario.nombre} ${usuario.apellidos}` : "",
  );
  const [correoEdit, setCorreoEdit] = useState(correo);
  const [direccion, setDireccion] = useState(usuario?.direccion ?? "");
  const [error, setError] = useState("");
  if (!usuario)
    return <div className="alert alert-warning">Usuario no encontrado.</div>;
  function guardar(e: FormEvent) {
    e.preventDefault();
    if (!usuario) return;
    if (!nombre.trim() || !emailValido(correoEdit)) {
      setError("Nombre o correo inválido.");
      return;
    }
    if (correoEdit !== usuario.correo) {
      setError(
        "El correo de inicio de sesión no se puede cambiar en el modo demostración.",
      );
      return;
    }
    guardarUsuario(
      {
        ...usuario,
        nombre: nombre.trim().split(" ")[0],
        apellidos: nombre.trim().split(" ").slice(1).join(" "),
        direccion,
      },
      usuario.run,
    );
    setEditar(false);
    setError("");
  }
  return (
    <>
      <div className="card border-0 shadow-sm mb-4 bg-white">
        <div className="card-body p-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 60, height: 60 }}
            >
              <i className="bi bi-person-fill fs-2" />
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-dark">
                ¡Hola, <span>{usuario.nombre}</span>!
              </h3>
              <p className="text-muted mb-0">
                Cliente Regular • Miembro desde 2026
              </p>
            </div>
          </div>
          <Link to="/catalogo" className="btn btn-primary fw-semibold">
            <i className="bi bi-shop me-1" /> Ir a la Tienda
          </Link>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-lg-4 offset-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-card-heading me-2" />
                Mis Datos
              </span>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => setEditar(true)}
                aria-label="Editar mis datos"
              >
                <i className="bi bi-pencil" />
              </button>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <small className="text-muted d-block">RUN</small>
                  <strong>{usuario.run}</strong>
                </li>
                <li className="list-group-item px-0">
                  <small className="text-muted d-block">Nombre Completo</small>
                  <strong>
                    {usuario.nombre} {usuario.apellidos}
                  </strong>
                </li>
                <li className="list-group-item px-0">
                  <small className="text-muted d-block">
                    Correo Electrónico
                  </small>
                  <strong>{usuario.correo}</strong>
                </li>
                <li className="list-group-item px-0">
                  <small className="text-muted d-block">
                    Dirección de Envío
                  </small>
                  <strong>
                    {usuario.direccion || "Sin dirección registrada"}
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8 offset-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-dark text-white fw-bold">
              <i className="bi bi-clock-history me-2" /> Historial de Compras
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>N° Pedido</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Total</th>
                      <th className="text-end">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.length ? (
                      pedidos.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <strong>#{p.id}</strong>
                          </td>
                          <td>{p.fecha}</td>
                          <td>
                            <span className="badge bg-success">Registrado</span>
                          </td>
                          <td>{dinero(p.total)}</td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                alert(
                                  p.articulos.map((a) => a.nombre).join(", "),
                                )
                              }
                            >
                              <i className="bi bi-eye" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td>
                            <strong>#PED-1024</strong>
                          </td>
                          <td>01/09/2026</td>
                          <td>
                            <span className="badge bg-success">Entregado</span>
                          </td>
                          <td>$189.990</td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                alert("Guitarra Acústica Fender CD-60S")
                              }
                            >
                              <i className="bi bi-eye" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>#PED-1089</strong>
                          </td>
                          <td>04/09/2026</td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              En Camino
                            </span>
                          </td>
                          <td>$89.990</td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                alert("Guitarra Acústica Clásica Yamaha C40")
                              }
                            >
                              <i className="bi bi-eye" />
                            </button>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editar && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setEditar(false)}
          />
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">Editar Mis Datos</h5>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setEditar(false)}
                    aria-label="Cerrar"
                  />
                </div>
                <div className="modal-body">
                  <form id="form-perfil" onSubmit={guardar}>
                    <div className="mb-3">
                      <label
                        className="form-label fw-bold"
                        htmlFor="edit-nombre"
                      >
                        Nombre Completo
                      </label>
                      <input
                        className="form-control"
                        id="edit-nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label fw-bold"
                        htmlFor="edit-correo"
                      >
                        Correo Electrónico
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="edit-correo"
                        value={correoEdit}
                        onChange={(e) => setCorreoEdit(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label fw-bold"
                        htmlFor="edit-direccion"
                      >
                        Dirección de Envío
                      </label>
                      <input
                        className="form-control"
                        id="edit-direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="btn btn-primary w-100" type="submit">
                      Guardar Cambios
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default function Perfil() {
  const { sesion } = useTienda();
  if (!sesion) return <Navigate to="/iniciar-sesion" replace />;
  return (
    <main className="container my-5 flex-grow-1">
      <DatosPerfil key={sesion.correo} correo={sesion.correo} />
    </main>
  );
}
