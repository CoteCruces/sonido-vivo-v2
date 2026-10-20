import FormularioContacto from "../organismos/FormularioContacto";
export default function Contactanos() {
  return (
    <main className="container my-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="card-title text-center fw-bold mb-4">
                Contáctanos
              </h2>
              <p className="text-muted text-center mb-4">
                ¿Tienes dudas o consultas? Envíanos un mensaje y te
                responderemos a la brevedad.
              </p>
              <FormularioContacto />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
