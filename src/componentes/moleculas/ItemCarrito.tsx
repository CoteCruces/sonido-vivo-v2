import type { Producto } from "../../utilidades/tipos";
import { rutaImagen } from "../../utilidades/funciones";
import { useTienda } from "../../contextos/TiendaContexto";
import Precio from "../atomos/Precio";
export default function ItemCarrito({
  producto,
  cantidad,
}: {
  producto: Producto;
  cantidad: number;
}) {
  const { cambiarCantidad } = useTienda();
  return (
    <div className="d-flex align-items-center gap-3 py-3 border-bottom">
      <img
        src={rutaImagen(producto.imagen)}
        className="carrito-miniatura rounded"
        alt={producto.nombre}
      />
      <div className="flex-grow-1">
        <div className="fw-semibold small">{producto.nombre}</div>
        <Precio valor={producto.precio} className="text-muted small" />
        <div className="d-flex align-items-center gap-2 mt-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => cambiarCantidad(producto.id, cantidad - 1)}
            aria-label="Restar una unidad"
          >
            −
          </button>
          <span>{cantidad}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => cambiarCantidad(producto.id, cantidad + 1)}
            disabled={cantidad >= producto.stock}
            aria-label="Sumar una unidad"
          >
            +
          </button>
          <button
            className="btn btn-sm btn-link text-danger"
            onClick={() => cambiarCantidad(producto.id, 0)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <Precio valor={producto.precio * cantidad} className="fw-bold small" />
    </div>
  );
}
