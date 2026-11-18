import { useEffect, useState } from "react";
import FilaProductoAdmin from "../moleculas/FilaProductoAdmin";

import {
  obtenerProductosApi,
  eliminarProductoApi,
} from "../servicios/productosApi";

import { guardarProductos } from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";

function TablaProductosAdmin() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eliminando, setEliminando] = useState(false);

  // Obtiene los productos desde MySQL al abrir la tabla.
  useEffect(() => {
    let activo = true;

    obtenerProductosApi()
      .then((datos) => {
        if (!activo) return;

        const lista = datos.map((producto) => ({
          ...producto,
          categoria: producto.categoria ?? "Sin categoría",
          imagen: producto.imagen ?? "",
          descripcionLarga: producto.descripcionLarga ?? "",
        }));

        setProductos(lista);

        // Mantiene la copia local mientras conectamos los otros servicios.
        guardarProductos(lista);
      })
      .catch(() => {
        if (activo) {
          setError("No se pudieron cargar los productos.");
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  // Elimina un producto desde el microservicio.
  const manejarEliminar = async (id: number) => {
    if (eliminando) return;

    const producto = productos.find((p) => p.id === id);

    if (!producto) return;

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar "${producto.nombre}"?`,
    );

    if (!confirmar) return;

    setEliminando(true);
    setError("");

    try {
      await eliminarProductoApi(id);

      const listaActualizada = productos.filter((p) => p.id !== id);

      setProductos(listaActualizada);
      guardarProductos(listaActualizada);
    } catch {
      setError("No se pudo eliminar el producto.");
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-dark mb-3">Listado de Productos</h4>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {cargando ? (
          <p>Cargando productos...</p>
        ) : (
          <>
            <p className="text-muted">Total de productos: {productos.length}</p>

            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto) => (
                    <FilaProductoAdmin
                      key={producto.id}
                      producto={producto}
                      onEliminar={manejarEliminar}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TablaProductosAdmin;
