import FormularioPago from "../organismos/FormularioPago";

function Pago() {
    return (
        <main className="container my-5 flex-grow-1">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">

                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4 p-md-5">

                            <h2 className="card-title text-center fw-bold mb-3">
                                Finalizar compra
                            </h2>

                            <p className="text-muted text-center mb-4">
                                Completa tus datos para confirmar tu pedido.
                            </p>

                            <hr className="mb-4" />

                            <div className="text-start">
                                <FormularioPago />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Pago;
