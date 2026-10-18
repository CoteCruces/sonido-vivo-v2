import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import { emailValido } from "../../utilidades/funciones";
export default function Login() {
  const { iniciarSesion, usuarios } = useTienda();
  const [params] = useSearchParams();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navegar = useNavigate();
  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!emailValido(correo) || clave.length < 4 || clave.length > 10) {
      setError(
        "Ingresa un correo válido y una contraseña de entre 4 y 10 caracteres.",
      );
      return;
    }
    const u = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase(),
    );
    if (!u || !iniciarSesion(correo)) {
      setError("Credenciales no encontradas en esta demostración.");
      return;
    }
    navegar(u.rol === "Administrador" ? "/admin" : "/perfil");
  }
  return (
    <main className="container my-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className="card shadow-lg border-0 rounded-3 text-dark"
            style={{ fontStyle: "normal" }}
          >
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i className="bi bi-person-circle display-4 text-primary" />
                <h2 className="fw-bold mt-2">Iniciar Sesión</h2>
                <p className="text-muted">
                  Ingresa tus credenciales para acceder
                </p>
              </div>
              {params.get("registrado") && (
                <p className="alert alert-success">
                  Usuario registrado correctamente.
                </p>
              )}
              <form id="form-login" onSubmit={enviar} noValidate>
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="login-correo"
                  >
                    Correo Electrónico *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope" />
                    </span>
                    <input
                      className="form-control"
                      id="login-correo"
                      type="email"
                      maxLength={100}
                      required
                      placeholder="correo@ejemplo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="login-clave"
                  >
                    Contraseña *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock" />
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      id="login-clave"
                      minLength={4}
                      maxLength={10}
                      placeholder="Entre 4 y 10 caracteres"
                      required
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <p role="alert" className="alert alert-danger">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-bold"
                >
                  Entrar
                </button>
                <div className="text-center mt-3">
                  <small className="text-muted">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registrarse" className="text-primary fw-bold">
                      Regístrate aquí
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
