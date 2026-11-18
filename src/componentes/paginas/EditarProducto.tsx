import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NavbarAdmin from "../organismos/NavbarAdmin";
import FooterAdmin from "../organismos/FooterAdmin";
import FormularioNuevoProducto from "../organismos/FormularioNuevoProducto";

import { obtenerProductoApi } from "../servicios/productosApi";
import type { Producto } from "../utilidades/tipos";

function EditarProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Consulta el producto desde MySQL utilizando su ID.
  useEffect(() => {
    let activo = true;

    setCargando(true);
    setError("");
    setProducto(null);

    const productoId = Number(id);

    if (!id || !Number.isSafeInteger(productoId) || productoId <= 0) {
      setCargando(false);
      return;
    }

    obtenerProductoApi(productoId)
      .then((datos) => {
        if (!activo || !datos) return;

        // Completa los campos opcionales.
        const productoActualizado: Producto = {
          ...datos,
          categoria: datos.categoria ?? "",
          imagen: datos.imagen ?? "",
          descripcionLarga: datos.descripcionLarga ?? "",
        };

        setProducto(productoActualizado);
      })
      .catch(() => {
        if (activo) {
          setError("No se pudo cargar el producto desde el servidor.");
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
  }, [id]);

  return (
    <div className="panel-admin d-flex flex-column min-vh-100">
      <NavbarAdmin />

      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            {cargando ? (
              <p>Cargando producto...</p>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <p>{error}</p>

                <Link to="/admin/productos" className="btn btn-secondary mt-3">
                  Volver al Mantenedor
                </Link>
              </div>
            ) : !producto ? (
              <div className="alert alert-danger" role="alert">
                <h4>Producto no encontrado</h4>

                <Link to="/admin/productos" className="btn btn-secondary mt-3">
                  Volver al Mantenedor
                </Link>
              </div>
            ) : (
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-4 p-md-5 text-dark">
                  <h2 className="fw-bold mb-3">Editar Producto</h2>

                  <p className="text-muted mb-4">
                    Modifica los datos del producto seleccionado.
                  </p>

                  <FormularioNuevoProducto
                    key={producto.id}
                    producto={producto}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <FooterAdmin />
    </div>
  );
}

export default EditarProducto;
