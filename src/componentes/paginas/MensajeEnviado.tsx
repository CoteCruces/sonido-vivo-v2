import { Link } from "react-router-dom";
export default function MensajeEnviado() {
  return (
    <main>
      <br />
      <br />
      <h1 className="destacado">¡Gracias por contactarnos!</h1>
      <br />
      <br />
      <h4 id="titulo">
        Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo
        pronto.
      </h4>
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Link to="/" className="btn btn-outline-warning">
          Volver a Inicio
        </Link>
      </div>
    </main>
  );
}
