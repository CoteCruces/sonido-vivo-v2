import { useEffect, useState } from "react";

import {
  obtenerUsuariosAdminApi,
  eliminarUsuarioAdminApi,
  actualizarUsuarioAdminApi,
} from "../servicios/usuariosApi";

import type {
  PerfilUsuarioApi,
  DatosEditarUsuarioAdminApi,
} from "../servicios/usuariosApi";

import { obtenerSesion } from "../servicios/sesionesService";

function TablaUsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<PerfilUsuarioApi[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [eliminandoId, setEliminandoId] = useState<number | null>(null);

  // Datos del formulario de edición.
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rol, setRol] = useState<"ADMIN" | "CLIENTE">("CLIENTE");
  const [guardando, setGuardando] = useState(false);

  const sesion = obtenerSesion();

  // Obtener los usuarios desde MySQL.
  useEffect(() => {
    let activo = true;

    obtenerUsuariosAdminApi()
      .then((datos) => {
        if (activo) {
          setUsuarios(datos);
        }
      })
      .catch((error) => {
        if (activo) {
          setError(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los usuarios.",
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
  }, []);

  // Comenzar a editar un usuario.
  const iniciarEdicion = (usuario: PerfilUsuarioApi) => {
    // Evitar modificar la propia cuenta desde este panel.
    if (sesion?.correo.toLowerCase() === usuario.email.toLowerCase()) {
      setError("No puedes editar tu propia cuenta desde esta tabla.");
      return;
    }

    setEditandoId(usuario.id);
    setNombre(usuario.nombre);
    setApellidos(usuario.apellidos ?? "");
    setRol(usuario.rol === "ADMIN" ? "ADMIN" : "CLIENTE");
    setError("");
  };

  // Cancelar la edición sin guardar.
  const cancelarEdicion = () => {
    setEditandoId(null);
    setError("");
  };

  // Guardar los cambios en MySQL.
  const guardarEdicion = async () => {
    if (editandoId === null || guardando) return;

    const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

    if (
      !nombre.trim() ||
      !soloLetras.test(nombre.trim()) ||
      nombre.trim().length > 50
    ) {
      setError("Ingrese un nombre válido de máximo 50 caracteres.");
      return;
    }

    if (
      !apellidos.trim() ||
      !soloLetras.test(apellidos.trim()) ||
      apellidos.trim().length > 100
    ) {
      setError("Ingrese apellidos válidos de máximo 100 caracteres.");
      return;
    }

    setGuardando(true);
    setError("");

    try {
      const datos: DatosEditarUsuarioAdminApi = {
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        rol,
      };

      // Actualizar el usuario mediante Spring Boot.
      const actualizado = await actualizarUsuarioAdminApi(editandoId, datos);

      // Reflejar los cambios en la tabla.
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.id === editandoId ? actualizado : usuario,
        ),
      );

      setEditandoId(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el usuario.",
      );
    } finally {
      setGuardando(false);
    }
  };

  // Eliminar un usuario desde MySQL.
  const manejarEliminar = async (id: number) => {
    if (eliminandoId !== null || guardando || editandoId !== null) {
      return;
    }

    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) return;

    if (sesion?.correo.toLowerCase() === usuario.email.toLowerCase()) {
      setError("No puedes eliminar tu propia cuenta.");
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar a "${usuario.nombre}"?`,
    );

    if (!confirmar) return;

    setEliminandoId(id);
    setError("");

    try {
      await eliminarUsuarioAdminApi(id);

      setUsuarios((actuales) => actuales.filter((u) => u.id !== id));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el usuario.",
      );
    } finally {
      setEliminandoId(null);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-body p-4 text-start">
        <h4 className="fw-bold text-dark mb-3">Listado de Usuarios</h4>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : (
          <>
            <p className="text-muted">Total de usuarios: {usuarios.length}</p>

            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>RUN</th>
                    <th>Nombre Completo</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => {
                    const esCuentaActual =
                      sesion?.correo.toLowerCase() ===
                      usuario.email.toLowerCase();

                    const estaEditando = editandoId === usuario.id;

                    return (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>

                        <td>{usuario.run || "Sin RUN"}</td>

                        <td>
                          {estaEditando ? (
                            <div className="d-flex flex-column gap-2">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                aria-label="Nombre"
                                value={nombre}
                                maxLength={50}
                                onChange={(e) => setNombre(e.target.value)}
                              />

                              <input
                                type="text"
                                className="form-control form-control-sm"
                                aria-label="Apellidos"
                                value={apellidos}
                                maxLength={100}
                                onChange={(e) => setApellidos(e.target.value)}
                              />
                            </div>
                          ) : (
                            <span className="fw-semibold">
                              {usuario.nombre} {usuario.apellidos ?? ""}
                            </span>
                          )}
                        </td>

                        <td>{usuario.email}</td>

                        <td>
                          {estaEditando ? (
                            <select
                              className="form-select form-select-sm"
                              aria-label="Rol del usuario"
                              value={rol}
                              onChange={(e) =>
                                setRol(e.target.value as "ADMIN" | "CLIENTE")
                              }
                            >
                              <option value="CLIENTE">Cliente</option>
                              <option value="ADMIN">Administrador</option>
                            </select>
                          ) : (
                            <span
                              className={`badge ${
                                usuario.rol === "ADMIN"
                                  ? "bg-danger"
                                  : "bg-secondary"
                              }`}
                            >
                              {usuario.rol === "ADMIN"
                                ? "Administrador"
                                : "Cliente"}
                            </span>
                          )}
                        </td>

                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {estaEditando ? (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm"
                                  onClick={guardarEdicion}
                                  disabled={guardando}
                                >
                                  {guardando ? "Guardando..." : "Guardar"}
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  onClick={cancelarEdicion}
                                  disabled={guardando}
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-warning btn-sm"
                                  onClick={() => iniciarEdicion(usuario)}
                                  disabled={
                                    esCuentaActual ||
                                    editandoId !== null ||
                                    eliminandoId !== null
                                  }
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => manejarEliminar(usuario.id)}
                                  disabled={
                                    esCuentaActual ||
                                    editandoId !== null ||
                                    eliminandoId !== null
                                  }
                                >
                                  {eliminandoId === usuario.id
                                    ? "Eliminando..."
                                    : "Eliminar"}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {usuarios.length === 0 && (
              <div className="alert alert-info">
                No hay usuarios registrados.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TablaUsuariosAdmin;
