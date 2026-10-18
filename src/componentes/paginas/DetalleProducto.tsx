import { Link, useParams } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import { dinero, rutaImagen } from "../../utilidades/funciones";
export default function DetalleProducto() {
  const { id } = useParams();
  const { productos, agregar, carrito } = useTienda();
  const p = productos.find((x) => x.id === Number(id));
  if (!p)
    return (
      <main className="container mt-4 text-center py-5">
        <p className="fs-5 text-muted">Producto no encontrado.</p>
        <Link to="/catalogo" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </main>
    );
  const cantidad = carrito.find((x) => x.id === p.id)?.cantidad ?? 0;
  return (
    <main>
      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/catalogo">Catálogo</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Detalle de producto
            </li>
          </ol>
        </nav>
        <div
          className="row g-4 align-items-start"
          style={{ color: "rgb(110, 92, 75)" }}
        >
          <div className="col-md-5">
            <img
              src={rutaImagen(p.imagen)}
              className="img-fluid rounded shadow-sm"
              alt={p.nombre}
            />
          </div>
          <div className="col-md-7">
            <span className="badge text-bg-secondary mb-2">{p.categoria}</span>
            <h2 className="fw-bold">{p.nombre}</h2>
            <h3 className="text-primary fw-bold my-3">{dinero(p.precio)}</h3>
            <p className="lead text-secondary">
              {p.descripcionLarga || p.descripcion}
            </p>
            <p className="text-muted">
              Stock disponible: <strong>{p.stock}</strong> unidades
            </p>
            <div className="d-flex gap-2 mt-4">
              <button
                className="btn btn-primary"
                type="button"
                disabled={cantidad >= p.stock}
                onClick={() => agregar(p.id)}
              >
                Agregar al carrito
              </button>
              <Link to="/catalogo" className="btn btn-outline-secondary">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </main>
  );
}
