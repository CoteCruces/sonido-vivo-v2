import { Link, useParams } from "react-router-dom";
import { noticias } from "../datos/noticias";

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
                            {noticia.contenidoCompleto}
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
