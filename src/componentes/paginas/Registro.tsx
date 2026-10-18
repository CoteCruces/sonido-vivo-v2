import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import { emailValido, regiones, runValido } from "../../utilidades/funciones";
export default function Registro() {
  const { usuarios, guardarUsuario } = useTienda();
  const navegar = useNavigate();
  const [datos, setDatos] = useState({
    run: "",
    tipo: "Cliente",
    nombre: "",
    apellidos: "",
    correo: "",
    fecha: "",
    direccion: "",
    region: "",
    comuna: "",
  });
  const [error, setError] = useState("");
  const cambiar = (k: keyof typeof datos, v: string) =>
    setDatos((d) => ({
      ...d,
      [k]: v,
      ...(k === "region" ? { comuna: "" } : {}),
    }));
  const comunas =
    regiones.find((r) => r.region === datos.region)?.comunas || [];
  function guardar(e: FormEvent) {
    e.preventDefault();
    if (!runValido(datos.run)) {
      setError("El RUN ingresado no es válido.");
      return;
    }
    if (
      !datos.nombre.trim() ||
      !datos.apellidos.trim() ||
      !emailValido(datos.correo) ||
      !datos.direccion.trim() ||
      !datos.region ||
      !datos.comuna
    ) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    if (
      usuarios.some(
        (u) =>
          u.correo.toLowerCase() === datos.correo.trim().toLowerCase() ||
          u.run.replace(/[.\-\s]/g, "").toUpperCase() ===
            datos.run.replace(/[.\-\s]/g, "").toUpperCase(),
      )
    ) {
      setError("RUN o correo ya registrado.");
      return;
    }
    guardarUsuario({
      run: datos.run.trim(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      direccion: `${datos.direccion}, ${datos.comuna}, ${datos.region}`,
      rol: datos.tipo,
    });
    navegar("/iniciar-sesion?registrado=1");
  }
  function entrada(
    col: string,
    key: keyof typeof datos,
    label: string,
    type = "text",
    placeholder = "",
    maxLength?: number,
    required = true,
  ) {
    return (
      <div className={col}>
        <label className="form-label fw-semibold" htmlFor={`reg-${key}`}>
          {label}
          {required ? " *" : ""}
        </label>
        <input
          className="form-control"
          id={`reg-${key}`}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          value={datos[key]}
          onChange={(e) => cambiar(key, e.target.value)}
        />
      </div>
    );
  }
  return (
    <main className="container my-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="card-title text-center fw-bold mb-4">
                Registro de Usuario
              </h2>
              <form id="form-registro" noValidate onSubmit={guardar}>
                <div className="row g-3">
                  {entrada(
                    "col-md-6",
                    "run",
                    "RUN",
                    "text",
                    "12345678K (sin puntos ni guion)",
                  )}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="reg-tipo-usuario"
                    >
                      Tipo de Usuario *
                    </label>
                    <select
                      className="form-select"
                      id="reg-tipo-usuario"
                      value={datos.tipo}
                      onChange={(e) => cambiar("tipo", e.target.value)}
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  {entrada(
                    "col-md-6",
                    "nombre",
                    "Nombre",
                    "text",
                    "Tu nombre",
                    50,
                  )}
                  {entrada(
                    "col-md-6",
                    "apellidos",
                    "Apellidos",
                    "text",
                    "Tus apellidos",
                    100,
                  )}
                  {entrada(
                    "col-md-6",
                    "correo",
                    "Correo Electrónico",
                    "email",
                    "correo@ejemplo.com",
                    100,
                  )}
                  {entrada(
                    "col-md-6",
                    "fecha",
                    "Fecha de Nacimiento",
                    "date",
                    "",
                    undefined,
                    false,
                  )}
                  {entrada(
                    "col-12",
                    "direccion",
                    "Dirección",
                    "text",
                    "Calle, número, depto/villa",
                    300,
                  )}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="regionesSelect"
                    >
                      Región *
                    </label>
                    <select
                      className="form-select"
                      id="regionesSelect"
                      value={datos.region}
                      onChange={(e) => cambiar("region", e.target.value)}
                      required
                    >
                      <option value="">Selecciona una región</option>
                      {regiones.map((r) => (
                        <option key={r.region} value={r.region}>
                          {r.region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="comunasSelect"
                    >
                      Comuna *
                    </label>
                    <select
                      className="form-select"
                      id="comunasSelect"
                      value={datos.comuna}
                      onChange={(e) => cambiar("comuna", e.target.value)}
                      required
                    >
                      <option value="">Selecciona primero una región</option>
                      {comunas.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  {error && (
                    <div className="col-12">
                      <p role="alert" className="alert alert-danger mb-0">
                        {error}
                      </p>
                    </div>
                  )}
                  <div className="col-12 mt-4">
                    <button
                      className="btn btn-primary w-100 py-2 fw-bold"
                      type="submit"
                    >
                      Crear Cuenta
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
