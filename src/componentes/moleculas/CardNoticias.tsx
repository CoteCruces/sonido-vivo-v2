import BotonLeerMas from "../atomos/BotonLeerMas";
import BotonSubir from "../atomos/BotonSubir";

function CardNoticias(){
    return(
        <section className="container my-5">
            <div className="row justify-content-center">
                {/* Columna centralizada con un ancho máximo estético para lectura */}
                <div className="col-lg-10 text-center">
                    
                    {/* Imagen principal adaptable y centrada */}
                    <img 
                        src="/imgNoticias/1.jpg"
                        className="img-fluid rounded shadow-sm mb-4"
                        alt="Imagen no disponible"
                        style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                    />

                    {/* Contenido de texto centralizado */}
                    <div className="p-8">
                        <h2 className="fw-bold mb-4">Ignacio Ruiz vuelve a los corridos chileno-mexicano con "La Santa"</h2>
                        
                        <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
                            El cantante chileno Ignacio Ruiz estrenó su nuevo tema "La Santa", 
                            una canción que marca su regreso al universo de los corridos después 
                            del lanzamiento de su EP "1.125" en mayo pasado.
                        </p>
                        <div className="mt-4">
                                <BotonLeerMas />
                        </div>
                        

                        <hr className="my-4 w-25 mx-auto" />

                    </div>
                </div>
                <div className="col-lg-10 text-center">                    
                    <img 
                        src="/imgNoticias/2.jpg"
                        className="img-fluid rounded shadow-sm mb-4"
                        alt="Imagen no disponible"
                        style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                    />
                    
                        <h2 className="fw-bold mb-4">La "armada chilena" que llega al Rock al Parque 2026</h2>
                        <p className="text-muted  mb-4" style={{ textAlign: 'justify' }}>
                            El festival Rock al Parque se celebrará en Bogotá los días 10, 11 y 12 
                            de octubre próximo, y conmemorando 30 años del evento gratuito que convoca 
                            a miles y miles de personas en la capital colombiana.
                        </p>
                        <div className="mt-4">
                                <BotonLeerMas />
                        </div>
                </div>
                </div>
            
        </section>
    );
}

export default CardNoticias;

