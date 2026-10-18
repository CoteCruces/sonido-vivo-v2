import { useState, type FormEvent } from "react";
import type { Usuario } from "../../utilidades/tipos";
import { useTienda } from "../../contextos/TiendaContexto";
import { emailValido, runValido } from "../../utilidades/funciones";
export default function FormularioUsuario({
  usuario,
  cerrar,
}: {
  usuario?: Usuario;
  cerrar: (guardado?: boolean) => void;
}) {
  const { usuarios, guardarUsuario } = useTienda();
  const [datos, setDatos] = useState<Usuario>(
    usuario ?? {
      run: "",
      nombre: "",
      apellidos: "",
      correo: "",
      rol: "Cliente",
    },
  );
  const [error, setError] = useState("");
  const cambiar = (campo: keyof Usuario, valor: string) =>
    setDatos((d) => ({ ...d, [campo]: valor }));
  function guardar(e: FormEvent) {
    e.preventDefault();
    if (
      !runValido(datos.run) ||
      !datos.nombre.trim() ||
      !datos.apellidos.trim() ||
      !emailValido(datos.correo)
    ) {
      setError("Verifica el RUN, nombre, apellidos y correo.");
      return;
    }
    if (
      usuarios.some(
        (u) =>
          u.run !== usuario?.run &&
          (u.run === datos.run ||
            u.correo.toLowerCase() === datos.correo.toLowerCase()),
      )
    ) {
      setError("RUN o correo ya registrado.");
      return;
    }
    guardarUsuario(datos, usuario?.run);
    cerrar(true);
  }
  return (
    <form className="row g-3" onSubmit={guardar} noValidate>
      <div className="col-md-6">
        <label className="form-label fw-bold" htmlFor="u-run">
          RUN
        </label>
        <input
          className="form-control"
          id="u-run"
          placeholder="12345678-K"
          value={datos.run}
          onChange={(e) => cambiar("run", e.target.value)}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold" htmlFor="u-rol">
          Rol de Usuario
        </label>
        <select
          className="form-select"
          id="u-rol"
          value={datos.rol}
          onChange={(e) => cambiar("rol", e.target.value)}
        >
          <option value="Cliente">Cliente</option>
          <option value="Administrador">Administrador</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold" htmlFor="u-nombre">
          Nombre
        </label>
        <input
          className="form-control"
          id="u-nombre"
          placeholder="Juan"
          value={datos.nombre}
          onChange={(e) => cambiar("nombre", e.target.value)}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold" htmlFor="u-apellidos">
          Apellidos
        </label>
        <input
          className="form-control"
          id="u-apellidos"
          placeholder="Pérez"
          value={datos.apellidos}
          onChange={(e) => cambiar("apellidos", e.target.value)}
          required
        />
      </div>
      <div className="col-12">
        <label className="form-label fw-bold" htmlFor="u-correo">
          Correo Electrónico
        </label>
        <input
          className="form-control"
          id="u-correo"
          placeholder="correo@ejemplo.com"
          type="email"
          value={datos.correo}
          onChange={(e) => cambiar("correo", e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="col-12">
          <p className="alert alert-danger mb-0">{error}</p>
        </div>
      )}
      <div className="col-12">
        <button className="btn btn-success w-100" type="submit">
          Guardar Usuario
        </button>
      </div>
    </form>
  );
}
