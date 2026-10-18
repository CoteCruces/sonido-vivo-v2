import { Link } from "react-router-dom";
import type { Noticia } from "../../utilidades/tipos";
import { rutaImagen } from "../../utilidades/funciones";
export default function CardNoticias({ noticia }: { noticia: Noticia }) {
  return (
    <div className="row">
      <div
        className="col"
        style={{ fontStyle: "oblique", color: "rgb(110, 92, 75)" }}
      >
        <div className="card">
          <img
            src={rutaImagen(noticia.imagen)}
            className="card-img-top"
            alt={noticia.titulo}
          />
          <div className="card-body">
            <h5 className="card-title">{noticia.titulo}</h5>
            <p>{noticia.resumen}</p>
            <Link to={`/noticias/${noticia.id}`} className="btn btn-primary">
              Leer más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
