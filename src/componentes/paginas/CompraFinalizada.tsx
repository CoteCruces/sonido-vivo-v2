import { Link } from "react-router-dom";
export default function CompraFinalizada() {
  return (
    <main className="container py-5 text-center">
      <div className="card border-0 shadow-sm p-5 mx-auto caja-confirmacion">
        <h1 className="h2">Pedido de demostración registrado</h1>
        <p className="text-muted">
          Se actualizó tu carrito y el historial local. No se realizó ningún
          pago real.
        </p>
        <Link to="/" className="btn btn-primary mx-auto">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
