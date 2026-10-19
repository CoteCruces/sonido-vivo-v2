
import FormularioLogin from "../organismos/FormularioLogin";

function Login() {
    return (
        <main className="container my-5 flex-grow-1">

            <div className="row justify-content-center">

                <div className="col-12 col-md-6 col-lg-5">

                    <div className="card shadow-lg border-0 rounded-3 text-dark text-start">

                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold mt-2 text-dark">
                                    Iniciar Sesión
                                </h2>

                                <p className="text-muted">
                                    Ingresa tus credenciales para acceder
                                </p>

                            </div>

                            <FormularioLogin />

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Login;
