import BotonSubir from "../atomos/BotonSubir";

function CardNosotros(){
    return(
        <section className="container my-5">
            <div className="row justify-content-center">
                {/* Columna centralizada con un ancho máximo estético para lectura */}
                <div className="col-lg-8 text-center">
                    
                    {/* Imagen principal adaptable y centrada */}
                    <img 
                        src="/imgNosotros/taller.jpg"
                        className="img-fluid rounded shadow-sm mb-4"
                        alt="Taller de sonido vivo"
                        style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                    />

                    {/* Contenido de texto centralizado */}
                    <div className="p-4">
                        <h2 className="fw-bold mb-4">Nuestra Historia</h2>
                        
                        <p className="text-muted fs-5 mb-4">
                            El compás de nuestra historia comenzó en 2015, en un pequeño taller subterráneo, 
                            impulsado por la pasión de un músico aficionado. Lo que empezó como un modesto servicio 
                            de reparación de guitarras se transformó, con el paso de los años, en la tienda de 
                            instrumentos musicales más confiable de la Región de Valparaíso.
                        </p>

                        <hr className="my-4 w-25 mx-auto" />

                        <h3 className="h4 fw-semibold mb-3">El Primer Acorde: Una Pasión Compartida</h3>
                        <p className="text-muted  mb-4">
                            Nuestra trayectoria no se mide en los 11 años que tenemos, sino en las canciones 
                            que hemos ayudado a crear. A finales de los ochenta, encontrar un instrumento de 
                            calidad era un desafío para los artistas locales. Con más entusiasmo que capital, 
                            decidimos abrir nuestras puertas para ofrecer no solo herramientas, sino asesoría real 
                            de músico a músico. Cada guitarra, teclado y percusión que vendíamos pasaba por nuestras 
                            manos para asegurar que su afinación y alma estuvieran intactas.
                        </p>

                    </div>
                </div>
                <div className="col-lg-8 text-center">                    
                    <img 
                        src="/imgNosotros/nosotros.jfif"
                        className="img-fluid rounded shadow-sm mb-4"
                        alt="Tienda"
                        style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                    />
                    <h5>Nuestro Compromiso Hoy</h5>
                    <p style={{ textAlign: 'justify' }}>
                     A lo largo de nuestra historia, hemos visto pasar por nuestro mostrador 
                     a jóvenes que compraban su primera uña de guitarra y que hoy regresan como
                     profesionales consagrados. Nos enorgullece ser el puente entre tu talento 
                     y el sonido perfecto. Hoy, seguimos innovando para llevarte los mejores 
                     instrumentos y audio del mundo, respaldados por la misma garantía y calidez humana 
                     de nuestro primer día.</p>
                </div>


                <div className="mt-4">
                                <BotonSubir />
                            </div>
                </div>
            
        </section>
    );
}

export default CardNosotros;

