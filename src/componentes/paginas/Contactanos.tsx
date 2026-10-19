
import FormularioContacto from "../organismos/FormularioContacto";

function Contactanos() {
    return (
        <main className="container my-5 flex-grow-1">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-7">

                    <div className="card shadow-lg border-0 rounded-4 text-dark">

                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold text-dark">
                                    Contáctanos
                                </h2>

                                <p className="text-muted">
                                    ¿Tienes alguna consulta?
                                    Envíanos un mensaje y
                                    estaremos encantados de ayudarte.
                                </p>

                            </div>

                            <FormularioContacto />

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Contactanos;
