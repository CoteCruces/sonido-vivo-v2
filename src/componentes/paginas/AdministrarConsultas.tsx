
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../organismos/NavbarAdmin";
import FooterAdmin from "../organismos/FooterAdmin";

interface Consulta {
  id: number;
  usuarioId: number | null;
  nombre: string | null;
  correo: string | null;
  asunto: string | null;
  mensaje: string | null;
  respuesta: string | null;
}

function AdministrarConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [cargando, setCargando] = useState(true);
  const [guardandoId, setGuardandoId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    let activo = true;

    fetch("/api/consultas")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("No se pudieron obtener las consultas.");
        }

        return (await res.json()) as Consulta[];
      })
      .then((datos) => {
        if (!activo) return;

        setConsultas(datos);

        const respuestasIniciales: Record<number, string> = {};

        datos.forEach((consulta) => {
          respuestasIniciales[consulta.id] = consulta.respuesta ?? "";
        });

        setRespuestas(respuestasIniciales);
      })
      .catch((err) => {
        if (activo) {
          setError(err instanceof Error ? err.message : "Error al cargar.");
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const guardarRespuesta = async (consulta: Consulta) => {
    const texto = (respuestas[consulta.id] ?? "").trim();

    if (!texto) {
      setError("La respuesta no puede estar vacía.");
      return;
    }

    setGuardandoId(consulta.id);
    setError("");
    setMensaje("");

    try {
      const res = await fetch(`/api/consultas/${consulta.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...consulta,
          respuesta: texto,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar la respuesta.");
      }

      const actualizada = (await res.json()) as Consulta;

      setConsultas((anteriores) =>
        anteriores.map((item) =>
          item.id === consulta.id ? actualizada : item
        )
      );

      setMensaje(`Respuesta de la consulta #${consulta.id} guardada.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al guardar."
      );
    } finally {
      setGuardandoId(null);
    }
  };

  return (
    <div className="panel-admin d-flex flex-column min-vh-100">
      <NavbarAdmin />

      <main className="container my-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Administrar Consultas</h2>
            <p className="text-muted">
              Revisa y responde los mensajes de los clientes.
            </p>
          </div>

          <Link to="/admin" className="btn btn-secondary">
            Volver al Panel
          </Link>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {mensaje && (
          <div className="alert alert-success" role="status">
            {mensaje}
          </div>
        )}

        {cargando ? (
          <p>Cargando consultas...</p>
        ) : consultas.length === 0 ? (
          <div className="alert alert-info">
            No hay consultas registradas.
          </div>
        ) : (
          <div className="row g-4">
            {consultas.map((consulta) => (
              <div className="col-12" key={consulta.id}>
                <div className="card shadow-sm">
                  <div className="card-body text-start">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="fw-bold">
                        Consulta #{consulta.id}
                      </h5>

                      <span
                        className={`badge ${
                          consulta.respuesta
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {consulta.respuesta
                          ? "Respondida"
                          : "Pendiente"}
                      </span>
                    </div>

                    <p>
                      <strong>Nombre:</strong>{" "}
                      {consulta.nombre ?? "No registrado"}
                    </p>

                    <p>
                      <strong>Correo:</strong>{" "}
                      {consulta.correo ?? "No registrado"}
                    </p>

                    <p>
                      <strong>Asunto:</strong>{" "}
                      {consulta.asunto ?? "Sin asunto"}
                    </p>

                    <p>
                      <strong>Mensaje:</strong>
                    </p>

                    <p className="bg-light p-3 rounded">
                      {consulta.mensaje}
                    </p>

                    <label
                      className="form-label fw-semibold"
                      htmlFor={`respuesta-${consulta.id}`}
                    >
                      Respuesta del administrador
                    </label>

                    <textarea
                      id={`respuesta-${consulta.id}`}
                      className="form-control mb-3"
                      rows={3}
                      value={respuestas[consulta.id] ?? ""}
                      onChange={(e) =>
                        setRespuestas((actuales) => ({
                          ...actuales,
                          [consulta.id]: e.target.value,
                        }))
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={guardandoId !== null}
                      onClick={() => guardarRespuesta(consulta)}
                    >
                      {guardandoId === consulta.id
                        ? "Guardando..."
                        : "Guardar respuesta"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FooterAdmin />
    </div>
  );
}

export default AdministrarConsultas;
