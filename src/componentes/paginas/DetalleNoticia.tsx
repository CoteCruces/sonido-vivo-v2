import { Link, useParams } from "react-router-dom";

const noticias = [
    {
        id: 1,
        titulo: 'Ignacio Ruiz vuelve a los corridos chileno-mexicanos con "La Santa"',
        fecha: "1 de septiembre de 2026",
        imagen: "/imgNoticias/1.jpg",
        resumen: 'El cantante chileno Ignacio Ruiz estrenó su nuevo tema "La Santa", una canción que marca su regreso a los corridos.',
        contenido: "El artista comentó que está muy feliz de volver a lanzar un corrido. Después de experimentar con estilos como la cumbia norteña y la cumbia ranchera, destacó la evolución musical de su nueva canción."
    },
    {
        id: 2,
        titulo: 'La "armada chilena" que llega al Rock al Parque 2026',
        fecha: "27 de agosto de 2026",
        imagen: "/imgNoticias/2.jpg",
        resumen: "El festival Rock al Parque se celebrará en Bogotá durante octubre de 2026.",
        contenido: "El festival reúne diversos estilos musicales, desde vallenato hasta black metal. Su programación incluye artistas internacionales y latinoamericanos, convirtiéndolo en uno de los eventos culturales más importantes de la región."
    }
];

function DetalleNoticia() {
    const { id } = useParams();

    const noticia = noticias.find(
        (item) => item.id === Number(id)
    );

    if (!noticia) {
        return (
            <main className="container my-5 text-center">
                <h1>Noticia no encontrada</h1>

                <Link to="/noticias" className="btn btn-primary">
                    Volver a Noticias
                </Link>
            </main>
        );
    }

    
    return (
        <div className="container mt-4">

            <h1>Noticias Vivo</h1>

            <section className="container my-5">
                <div className="row justify-content-center">

                    <div className="col-lg-10 text-center">

                        <img
                            src={noticia.imagen}
                            className="img-fluid rounded shadow-sm mb-4"
                            alt={noticia.titulo}
                            style={{
                                maxHeight: "450px",
                                width: "100%",
                                objectFit: "cover"
                            }}
                        />

                        <h2 className="fw-bold mb-4">
                            {noticia.titulo}
                        </h2>

                        <p
                            className="text-muted mb-4"
                            style={{ textAlign: "justify" }}
                        >
                            {noticia.resumen}
                        </p>

                        <p
                            className="text-muted mb-4"
                            style={{ textAlign: "justify" }}
                        >
                            {noticia.contenido}
                        </p>

                        <div className="mt-4">
                            <Link
                                to="/noticias"
                                className="btn btn-primary"
                            >
                                Volver a Noticias
                            </Link>
                        </div>

                        <hr className="my-4 w-25 mx-auto" />

                    </div>

                </div>
            </section>

        </div>
    );

}

export default DetalleNoticia;
