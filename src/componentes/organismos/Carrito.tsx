import { Link } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import { dinero, rutaImagen } from "../../utilidades/funciones";
export default function Carrito({
  abierto,
  cerrar,
}: {
  abierto: boolean;
  cerrar: () => void;
}) {
  const { items, total, cambiarCantidad, vaciar } = useTienda();
  return (
    <>
      {abierto && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={cerrar}
          aria-hidden="true"
        />
      )}
      <div
        className={`offcanvas offcanvas-start ${abierto ? "show" : ""}`}
        tabIndex={-1}
        id="carritoOffcanvas"
        role="dialog"
        aria-modal={abierto}
        aria-labelledby="carritoOffcanvasLabel"
        style={{ visibility: abierto ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="carritoOffcanvasLabel">
            Tu Carrito
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={cerrar}
            aria-label="Cerrar"
          />
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <div className="flex-grow-1" id="carritoLista">
            {items.length === 0 ? (
              <p className="carrito-vacio">Tu carrito está vacío</p>
            ) : (
              items.map(({ producto, cantidad }) => (
                <div
                  key={producto.id}
                  className="d-flex align-items-center mb-3 border-bottom pb-3"
                >
                  <img
                    src={rutaImagen(producto.imagen)}
                    alt={producto.nombre}
                    width="70"
                    height="70"
                    style={{ objectFit: "cover" }}
                    className="me-3 rounded"
                  />
                  <div className="flex-grow-1">
                    <strong>{producto.nombre}</strong>
                    <p className="mb-1">{dinero(producto.precio)}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          cambiarCantidad(producto.id, cantidad - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{cantidad}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          cambiarCantidad(producto.id, cantidad + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger ms-3"
                        aria-label="Eliminar producto"
                        onClick={() => cambiarCantidad(producto.id, 0)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <strong className="ms-2">
                    {dinero(producto.precio * cantidad)}
                  </strong>
                </div>
              ))
            )}
          </div>
          <div className="border-top pt-3 mt-3">
            <div className="d-flex justify-content-between mb-2">
              <strong>Total:</strong>
              <strong id="carritoTotal">{dinero(total)}</strong>
            </div>
            <Link to="/pago" className="btn btn-primary w-100" onClick={cerrar}>
              Ir a pagar
            </Link>
            <button
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={vaciar}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
