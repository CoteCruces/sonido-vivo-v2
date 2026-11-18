import { useEffect, useState } from "react";
import {
  obtenerProductosApi,
  crearProductoApi,
} from "../servicios/productosApi";
import type { Producto } from "../utilidades/tipos";
import { productos as productosIniciales } from "../datos/productos";

function ProductosApi() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [importando, setImportando] = useState(false);

  // Carga los productos originales que todavía no existen en MySQL.
  const importarProductos = async () => {
    setImportando(true);
    setError("");

    try {
      const actuales = await obtenerProductosApi();

      for (const producto of productosIniciales) {
        // Evita registrar dos veces un producto con el mismo nombre.
        const existe = actuales.some((p) => p.nombre === producto.nombre);

        if (!existe) {
          const nuevo = await crearProductoApi({
            nombre: producto.nombre,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            descripcionLarga: producto.descripcionLarga,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
          });

          actuales.push(nuevo);
        }
      }

      setProductos(actuales);
    } catch {
      setError("No se pudieron importar todos los productos.");
    } finally {
      setImportando(false);
    }
  };

  // Consulta los productos del backend al abrir la página.
  useEffect(() => {
    obtenerProductosApi()
      .then((datos: Producto[]) => {
        setProductos(datos);
      })
      .catch(() => {
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <main className="container my-5">
      <h1>Productos desde la API</h1>

      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={importarProductos}
        disabled={importando}
      >
        {importando ? "Importando productos..." : "Importar catálogo original"}
      </button>

      {cargando && <p>Cargando productos...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!cargando && !error && productos.length === 0 && (
        <p>No hay productos registrados.</p>
      )}

      {!cargando &&
        !error &&
        productos.map((producto) => (
          <div key={producto.id} className="card mb-3">
            <div className="card-body">
              <h2 className="h5">{producto.nombre}</h2>

              <p>{producto.descripcion}</p>

              <p>Categoría: {producto.categoria || "Sin categoría"}</p>

              <p>Precio: ${producto.precio.toLocaleString("es-CL")}</p>

              <p>Stock: {producto.stock}</p>
            </div>
          </div>
        ))}
    </main>
  );
}

export default ProductosApi;
