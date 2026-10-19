
import FormularioRegistro from "../organismos/FormularioRegistro";

function Registro() {
    return (
        <main className="container my-5 flex-grow-1">

            <div className="row justify-content-center">

                <div className="col-md-10 col-lg-8">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <h2 className="card-title text-center fw-bold mb-4">
                                Registro de Usuario
                            </h2>

                            <FormularioRegistro />

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Registro;
