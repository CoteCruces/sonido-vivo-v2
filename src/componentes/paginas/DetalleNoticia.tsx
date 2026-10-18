import { Link, useParams } from "react-router-dom";
import { noticias } from "../../datos/noticias";
import { rutaImagen } from "../../utilidades/funciones";
export default function DetalleNoticia() {
  const { id } = useParams();
  const n = noticias.find((n) => n.id === Number(id));
  if (!n)
    return (
      <main className="container my-5 text-center">
        <h2>Noticia no encontrada</h2>
        <Link to="/noticias" className="btn btn-primary mt-3">
          Volver a Noticias
        </Link>
      </main>
    );
  return (
    <main className="container my-5 flex-grow-1">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card noticia-detalle-card shadow-lg border-0 overflow-hidden text-dark">
            <img
              src={rutaImagen(n.imagen)}
              className="card-img-top img-fluid"
              alt={n.titulo}
              style={{ maxHeight: 400, objectFit: "cover" }}
            />
            <div className="card-body p-4 p-md-5">
              <span className="badge bg-primary mb-2">{n.fecha}</span>
              <h1 className="fw-bold mb-4">{n.titulo}</h1>
              <p className="fs-5 text-secondary lead">{n.resumen}</p>
              <hr className="my-4" />
              <div className="lh-lg fs-6">{n.contenidoCompleto}</div>
              <div className="mt-5 text-end">
                <Link to="/noticias" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-1" /> Volver a Noticias
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
