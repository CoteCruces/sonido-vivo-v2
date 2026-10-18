import { Link } from "react-router-dom";
export default function NoEncontrada() {
  return (
    <main className="container text-center py-5">
      <h1 className="display-4 fw-bold">404</h1>
      <h2>Página no encontrada</h2>
      <p className="text-muted">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}
