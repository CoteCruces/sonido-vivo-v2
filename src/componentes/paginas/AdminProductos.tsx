import { useState } from "react";
import { useTienda } from "../../contextos/TiendaContexto";
import { dinero } from "../../utilidades/funciones";
import type { Producto } from "../../utilidades/tipos";
import FormularioProducto from "../organismos/FormularioProducto";
export default function AdminProductos() {
  const { productos, borrarProducto } = useTienda();
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);
  const [mostrar, setMostrar] = useState(false);
  const [aviso, setAviso] = useState("");
  function eliminar(p: Producto) {
    if (window.confirm(`¿Eliminar “${p.nombre}”?`)) {
      borrarProducto(p.id);
      setAviso("Producto eliminado correctamente.");
    }
  }
  return (
    <>
      <main className="container my-5 flex-grow-1">
        {aviso && (
          <div className="alert alert-success" role="status">
            {aviso}
          </div>
        )}
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body p-4 d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold text-dark mb-0">
                Mantenedor de Productos
              </h2>
              <p className="text-muted mb-0">
                Creación, edición y eliminación del inventario
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSeleccionado(null);
                setMostrar(true);
              }}
            >
              <i className="bi bi-plus-lg me-1" /> Nuevo Producto
            </button>
          </div>
        </div>
        <div
          className="card shadow-sm border-0 w-100"
          style={{ maxHeight: 500, overflowY: "auto" }}
        >
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>{dinero(p.precio)}</td>
                      <td>{p.stock}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setSeleccionado(p);
                            setMostrar(true);
                          }}
                        >
                          <i className="bi bi-pencil" /> Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminar(p)}
                        >
                          <i className="bi bi-trash" /> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {mostrar && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setMostrar(false)}
          />
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">Formulario de Producto</h5>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setMostrar(false)}
                    aria-label="Cerrar"
                  />
                </div>
                <div className="modal-body">
                  <FormularioProducto
                    key={seleccionado?.id ?? "nuevo"}
                    producto={seleccionado ?? undefined}
                    cerrar={(guardado) => {
                      setMostrar(false);
                      if (guardado)
                        setAviso("Producto guardado correctamente.");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
