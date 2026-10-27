import BotonLeerMas from "../atomos/BotonLeerMas";
import { noticias } from "../datos/noticias";

function CardNoticias() {
    return (
        <section className="container my-5">

            <div className="row justify-content-center">

                {noticias.map((noticia) => (
                    <div
                        key={noticia.id}
                        className="col-lg-10 text-center"
                    >

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

                        <div className="p-3">

                            <h2 className="fw-bold mb-4">
                                {noticia.titulo}
                            </h2>

                            <p
                                className="text-muted mb-4"
                                style={{ textAlign: "justify" }}
                            >
                                {noticia.resumen}
                            </p>

                            <div className="mt-4">
                                <BotonLeerMas id={noticia.id} />
                            </div>

                            <hr className="my-4 w-25 mx-auto" />

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default CardNoticias;
