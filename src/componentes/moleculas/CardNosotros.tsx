import "../../CardNosotros.css";
import BotonSubir from "../atomos/BotonSubir";

function CardNosotros() {
    return (
        <section className="container my-5">

            {/* Encabezado */}
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3">
                    Sobre Nosotros
                </h1>

                <p className="text-secondary fs-5">
                    Conoce nuestra historia, pasión y compromiso
                    con la música.
                </p>
            </div>

            {/* Primera sección: Nuestra Historia */}
            <div className="card nosotros-card border-0 shadow-sm rounded-4 overflow-hidden mb-5">

                <div className="row g-0 align-items-center">

                    {/* Imagen */}
                    <div className="col-md-5">
                        <div className="nosotros-imagen-contenedor">
                            <img
                                src="/imgNosotros/taller.jpg"
                                className="nosotros-imagen"
                                alt="Taller de Sonido Vivo"
                            />
                        </div>
                    </div>

                    {/* Información */}
                    <div className="col-md-7">
                        <div className="p-4 p-lg-5">

                            <span className="nosotros-etiqueta">
                                NUESTRA HISTORIA
                            </span>

                            <h2 className="fw-bold mt-3 mb-4">
                                El comienzo de Sonido Vivo
                            </h2>

                            <p className="text-secondary nosotros-texto">
                                El compás de nuestra historia comenzó
                                en 2015, en un pequeño taller
                                subterráneo, impulsado por la pasión
                                de un músico aficionado.
                            </p>

                            <p className="text-secondary nosotros-texto">
                                Lo que empezó como un modesto servicio
                                de reparación de guitarras se
                                transformó, con el paso de los años,
                                en la tienda de instrumentos musicales
                                más confiable de la Región de
                                Valparaíso.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Segunda sección: El Primer Acorde */}
            <div className="card nosotros-card border-0 shadow-sm rounded-4 mb-5">

                <div className="card-body p-4 p-md-5 text-center">

                    <span className="nosotros-etiqueta">
                        NUESTRA PASIÓN
                    </span>

                    <h2 className="fw-bold mt-3 mb-4">
                        El Primer Acorde: Una Pasión Compartida
                    </h2>

                    <hr className="my-4 w-25 mx-auto" />

                    <p className="text-secondary nosotros-texto mx-auto"
                       style={{ maxWidth: "850px" }}>
                        Nuestra trayectoria no se mide en los 11 años
                        que tenemos, sino en las canciones que hemos
                        ayudado a crear.
                    </p>

                    <p className="text-secondary nosotros-texto mx-auto"
                       style={{ maxWidth: "850px" }}>
                        A finales de los ochenta, encontrar un
                        instrumento de calidad era un desafío para
                        los artistas locales. Con más entusiasmo que
                        capital, decidimos abrir nuestras puertas
                        para ofrecer no solo herramientas, sino
                        asesoría real de músico a músico.
                    </p>

                    <p className="text-secondary nosotros-texto mx-auto"
                       style={{ maxWidth: "850px" }}>
                        Cada guitarra, teclado y percusión que
                        vendíamos pasaba por nuestras manos para
                        asegurar que su afinación y alma estuvieran
                        intactas.
                    </p>

                </div>
            </div>

            {/* Tercera sección: Compromiso */}
            <div className="card nosotros-card border-0 shadow-sm rounded-4 overflow-hidden">

                <div className="row g-0 align-items-center">

                    {/* Texto a la izquierda */}
                    <div className="col-md-7">
                        <div className="p-4 p-lg-5">

                            <span className="nosotros-etiqueta">
                                NUESTRO COMPROMISO
                            </span>

                            <h2 className="fw-bold mt-3 mb-4">
                                Nuestro Compromiso Hoy
                            </h2>

                            <p className="text-secondary nosotros-texto">
                                A lo largo de nuestra historia,
                                hemos visto pasar por nuestro
                                mostrador a jóvenes que compraban
                                su primera uña de guitarra y que hoy
                                regresan como profesionales
                                consagrados.
                            </p>

                            <p className="text-secondary nosotros-texto">
                                Nos enorgullece ser el puente entre
                                tu talento y el sonido perfecto.
                            </p>

                            <p className="text-secondary nosotros-texto">
                                Hoy, seguimos innovando para llevarte
                                los mejores instrumentos y audio del
                                mundo, respaldados por la misma
                                garantía y calidez humana de nuestro
                                primer día.
                            </p>

                        </div>
                    </div>

                    {/* Imagen a la derecha */}
                    <div className="col-md-5">
                        <div className="nosotros-imagen-contenedor">
                            <img
                                src="/imgNosotros/nosotros.jfif"
                                className="nosotros-imagen"
                                alt="Tienda Sonido Vivo"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Botón para volver arriba */}
            <div className="text-center mt-5">
                <BotonSubir />
            </div>

        </section>
    );
}

export default CardNosotros;
