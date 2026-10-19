import BotonLeerMas from "../atomos/BotonLeerMas";
import { noticias } from "../datos/noticias";
import "../../CardNoticias.css";

function CardNoticias() {
    return (
        <section className="container my-5">

            {/* Encabezado */}
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3">
                    Últimas Noticias
                </h1>

                <p className="text-secondary">
                    Entérate de las últimas novedades,
                    lanzamientos y eventos del mundo musical.
                </p>
            </div>

            {/* Contenedor de noticias */}
            <div className="row g-4 justify-content-center">

                {noticias.map((noticia) => (
                    <div
                        className="col-12 col-md-6"
                        key={noticia.id}
                    >

                        <article className="card noticia-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                            {/* Imagen */}
                            <img
                                src={noticia.imagen}
                                className="card-img-top noticia-imagen"
                                alt={noticia.titulo}
                            />

                            {/* Contenido */}
                            <div className="card-body d-flex flex-column p-4">

                                <span className="noticia-categoria mb-3">
                                    {noticia.categoria}
                                </span>

                                <h2 className="card-title fs-4 fw-bold mb-3">
                                    {noticia.titulo}
                                </h2>

                                <p className="card-text text-secondary mb-4">
                                    {noticia.descripcion}
                                </p>

                                {/* Botón inferior */}
                                <div className="mt-auto">
                                    <BotonLeerMas id={noticia.id} />
                                </div>

                            </div>

                        </article>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default CardNoticias;
