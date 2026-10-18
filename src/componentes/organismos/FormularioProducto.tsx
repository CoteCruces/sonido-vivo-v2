import { useState, type FormEvent } from "react";
import type { Producto } from "../../utilidades/tipos";
import { useTienda } from "../../contextos/TiendaContexto";
export default function FormularioProducto({
  producto,
  cerrar,
}: {
  producto?: Producto;
  cerrar: (guardado?: boolean) => void;
}) {
  const { productos, guardarProducto } = useTienda();
  const [datos, setDatos] = useState({
    nombre: producto?.nombre || "",
    categoria: producto?.categoria || productos[0]?.categoria || "",
    precio: String(producto?.precio ?? ""),
    stock: String(producto?.stock ?? ""),
    imagen: producto?.imagen || "",
    descripcion: producto?.descripcion || "",
    descripcionLarga: producto?.descripcionLarga || "",
  });
  const [error, setError] = useState("");
  const actualizar = (campo: keyof typeof datos, valor: string) =>
    setDatos((ant) => ({ ...ant, [campo]: valor }));
  function guardar(e: FormEvent) {
    e.preventDefault();
    const precio = Number(datos.precio),
      stock = Number(datos.stock);
    if (
      !datos.nombre.trim() ||
      !datos.categoria ||
      !datos.descripcion.trim() ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError(
        "Completa todos los campos obligatorios y verifica precio y stock.",
      );
      return;
    }
    const id = producto?.id ?? Math.max(0, ...productos.map((p) => p.id)) + 1;
    guardarProducto({
      id,
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      precio,
      stock,
      imagen: datos.imagen.trim() || "imagenes/cards/1.png",
      descripcion: datos.descripcion.trim(),
      descripcionLarga: datos.descripcionLarga.trim(),
    });
    cerrar(true);
  }
  return (
    <form className="row g-3" onSubmit={guardar} noValidate>
      <div className="col-md-8">
        <label className="form-label fw-bold" htmlFor="p-nombre">
          Nombre del Producto
        </label>
        <input
          className="form-control"
          id="p-nombre"
          placeholder="Ej: Guitarra Eléctrica Fender"
          value={datos.nombre}
          onChange={(e) => actualizar("nombre", e.target.value)}
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label fw-bold" htmlFor="p-categoria">
          Categoría
        </label>
        <select
          className="form-select"
          id="p-categoria"
          value={datos.categoria}
          onChange={(e) => actualizar("categoria", e.target.value)}
          required
        >
          {[
            ...new Set(productos.map((p) => p.categoria)),
            ...(datos.categoria &&
            !productos.some((p) => p.categoria === datos.categoria)
              ? [datos.categoria]
              : []),
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold" htmlFor="p-precio">
          Precio ($)
        </label>
        <input
          className="form-control"
          id="p-precio"
          placeholder="199990"
          type="number"
          min="0"
          required
          value={datos.precio}
          onChange={(e) => actualizar("precio", e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-bold" htmlFor="p-stock">
          Stock
        </label>
        <input
          className="form-control"
          id="p-stock"
          placeholder="10"
          type="number"
          min="0"
          required
          value={datos.stock}
          onChange={(e) => actualizar("stock", e.target.value)}
        />
      </div>
      <div className="col-12">
        <label className="form-label fw-bold" htmlFor="p-imagen">
          Ruta Imagen
        </label>
        <input
          className="form-control"
          id="p-imagen"
          placeholder="imagenes/cards/1.png"
          value={datos.imagen}
          onChange={(e) => actualizar("imagen", e.target.value)}
        />
      </div>
      <div className="col-12">
        <label className="form-label fw-bold" htmlFor="p-descripcion">
          Descripción Corta
        </label>
        <textarea
          className="form-control"
          id="p-descripcion"
          rows={2}
          required
          value={datos.descripcion}
          onChange={(e) => actualizar("descripcion", e.target.value)}
        />
      </div>
      {error && (
        <div className="col-12">
          <p className="alert alert-danger mb-0">{error}</p>
        </div>
      )}
      <div className="col-12">
        <button className="btn btn-primary w-100" type="submit">
          Guardar Producto
        </button>
      </div>
    </form>
  );
}
