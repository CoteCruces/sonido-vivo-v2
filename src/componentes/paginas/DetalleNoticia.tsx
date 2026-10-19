
import { Link, useParams } from "react-router-dom";
import { noticias } from "../datos/noticias";

function DetalleNoticia() {
    const { id } = useParams();

    // Buscar noticia según su ID
    const noticia = noticias.find(
        (n) => n.id === Number(id)
    );

    // Si la noticia no existe
    if (!noticia) {
        return (
            <div className="container my-5 text-center">
                <h2>Noticia no encontrada</h2>

                <Link
                    to="/noticias"
                    className="btn btn-primary mt-3"
                >
                    Volver a Noticias
                </Link>
            </div>
        );
    }

    return (
        <main className="container my-5">

            <article
                className="bg-white rounded-4 shadow p-4 p-md-5 text-dark mx-auto"
                style={{ maxWidth: "950px" }}
            >

                {/* Categoría */}
                <span className="noticia-categoria mb-3">
                    {noticia.categoria}
                </span>

                {/* Título */}
                <h1 className="fw-bold my-4">
                    {noticia.titulo}
                </h1>

                {/* Imagen */}
                <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="img-fluid rounded-3 mb-4"
                    style={{
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "cover"
                    }}
                />

                <hr />

                {/* Contenido */}
                <div className="mt-4">

                    <p
                        style={{
                            fontSize: "18px",
                            lineHeight: "1.9",
                            textAlign: "justify"
                        }}
                    >
                        {noticia.contenidoCompleto}
                    </p>

                </div>

                <hr className="my-4" />

                {/* Volver */}
                <Link
                    to="/noticias"
                    className="btn btn-secondary"
                >
                    ← Volver a Noticias
                </Link>

            </article>

        </main>
    );
}

export default DetalleNoticia;
