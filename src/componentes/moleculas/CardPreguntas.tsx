import BotonSubir from "../atomos/BotonSubir";

function CardPreguntas(){
    return(
        <section className="container my-5">
            <div className="row justify-content-center">
                {/* Columna centralizada con un ancho máximo estético para lectura */}
                <div className="col-lg-8 text-center">
                    
                    {/* Imagen principal adaptable y centrada */}
                    <img 
                        src="/imgPreguntas/preguntas.jpg"
                        className="img-fluid rounded shadow-sm mb-4"
                        alt="Imagen no disponible"
                        style={{ maxHeight: '450px', width: '50%', objectFit: 'cover' }}
                    />

                    {/* Contenido de texto centralizado */}
                    <div className="p-4">
                        <h2 className="fw-bold mb-4">1. Compras, pagos y garantía</h2>
                        
                        <p className="text-muted fs-5 mb-4">
                            • ¿Los productos son 100% originales y cuentan con garantía oficial? 
                            Sí, los instrumentos provienen de distribuidores autorizados e incluyen 
                            garantía de fábrica (generalmente por defectos de fabricación).
                        </p>

                        <p className="text-muted fs-5 mb-4">• ¿Qué medios de pago aceptan? Tarjetas de crédito, débito, transferencias 
                            bancarias y opciones de pago en cuotas.
                        </p>

                        <p className="text-muted fs-5 mb-4">• ¿Ofrecen asesoría para elegir el instrumento adecuado? Muchas tiendas 
                            guían al comprador según su nivel (principiante, intermedio, profesional), 
                            estilo musical y presupuesto.
                        </p>

                        <hr className="my-4 w-25 mx-auto" />

                        <h2 className="fw-bold mb-4">2. Envíos y entregas</h2>
                        <p className="text-muted fs-5 mb-4">
                           • ¿Cuánto tarda en llegar el pedido? Depende de la zona geográfica y del 
                           servicio de courier disponible.
                        </p>
                        
                        <p className="text-muted fs-5 mb-4">
                           • ¿Cómo se empaquetan los instrumentos para que no sufran daños? Se detalla 
                           el uso de cajas reforzadas, plástico de burbujas o estuches rígidos para productos 
                           delicados (como guitarras o violines).
                        </p>
                        <p className="text-muted fs-5 mb-4">
                           • ¿Se realizan envíos a todo el país? Cobertura nacional o retiro presencial 
                           en tienda física.
                        </p>

                        <hr className="my-4 w-25 mx-auto" />

                        <h2 className="fw-bold mb-4">3. Elección y características de los instrumentos</h2>

                        <p className="text-muted fs-5 mb-4">
                           • ¿Cómo elijo el tamaño correcto para un violín o viola (en niños)? Se mide 
                           extendiendo el brazo izquierdo del niño con el instrumento en el hombro; 
                           debe alcanzar a abrazar por completo el caracol del instrumento. No se recomienda 
                           comprar uno más grande para "que le dure", ya que afecta la postura y técnica.
                        </p>
                        
                        <p className="text-muted fs-5 mb-4">
                            • ¿Qué diferencia hay en el precio entre dos instrumentos que usan la misma madera? 
                           Influyen factores como los años de secado de la madera, el origen de los materiales 
                           y la experiencia del luthier o marca en la construcción.
                        </p>

                        <p className="text-muted fs-5 mb-4">
                            • ¿Qué calibre de cuerdas debo usar para mi guitarra? Los calibres más habituales 
                           son 0.10, 0.11 o 0.12; depende de la tensión que soporta el mástil del instrumento.
                        </p>

                        <hr className="my-4 w-25 mx-auto" />

                        <h2 className="fw-bold mb-4">4. Cambios, devoluciones y servicio técnico</h2>
                        <p className="text-muted fs-5 mb-4">
                           • ¿Qué pasa si el instrumento llega con una falla de fábrica? Se explica el plazo 
                           para reportarlo y hacer efectiva la política de cambio o reparación.
                        </p>
                        <p className="text-muted fs-5 mb-4">
                           • ¿Hacen calibración o configuración previa al envío? Muchas tiendas ofrecen 
                           el servicio de calibración (ajuste de acción, octavación, entonación) antes de 
                           entregar una guitarra o bajo.
                        </p>

                    </div>
                </div>


                <div className="mt-4">
                                <BotonSubir />
                            </div>
                </div>
            
        </section>
    );
}

export default CardPreguntas;

