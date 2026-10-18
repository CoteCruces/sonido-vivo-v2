import { Link } from "react-router-dom";
import type { Producto } from "../../utilidades/tipos";
import { dinero, rutaImagen } from "../../utilidades/funciones";
import { useTienda } from "../../contextos/TiendaContexto";
export default function CardCatalogo({
  producto,
  destacado = false,
}: {
  producto: Producto;
  destacado?: boolean;
}) {
  const { agregar, carrito } = useTienda();
  const cantidad = carrito.find((c) => c.id === producto.id)?.cantidad ?? 0;
  return (
    <div
      className="card h-100 shadow-sm"
      style={destacado ? { width: "20rem" } : undefined}
    >
      <img
        src={rutaImagen(producto.imagen)}
        className="card-img-top"
        alt={producto.nombre}
      />
      <div className={`card-body ${destacado ? "" : "d-flex flex-column"}`}>
        {destacado ? (
          <>
            <h5 className="card-title">{producto.nombre}</h5>
            <p>{producto.descripcion}</p>
            <h4>{dinero(producto.precio)}</h4>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => agregar(producto.id)}
              disabled={cantidad >= producto.stock}
            >
              Agregar al Carro
            </button>{" "}
            <Link
              to={`/producto/${producto.id}`}
              className="btn btn-outline-primary"
            >
              Detalles
            </Link>
          </>
        ) : (
          <>
            <h5 className="card-title fw-bold">{producto.nombre}</h5>
            <p className="card-text text-muted flex-grow-1">
              {producto.descripcion}
            </p>
            <h4 className="text-primary fw-bold my-2">
              {dinero(producto.precio)}
            </h4>
            <div className="d-flex gap-2 mt-2">
              <Link
                className="btn btn-outline-primary w-50"
                to={`/producto/${producto.id}`}
              >
                Ver detalle
              </Link>
              <button
                className="btn btn-primary w-50"
                type="button"
                onClick={() => agregar(producto.id)}
                disabled={cantidad >= producto.stock}
              >
                Agregar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
