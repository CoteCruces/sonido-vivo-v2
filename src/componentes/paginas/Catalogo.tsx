import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CardCatalogo from "../moleculas/CardCatalogo";
import FiltroCategoria from "../moleculas/FiltroCategoria";

import { obtenerProductosApi } from "../servicios/productosApi";
import type { Producto } from "../utilidades/tipos";

function Catalogo() {
    const [listaProductos, setListaProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [errorApi, setErrorApi] = useState("");

    const [parametros, setParametros] = useSearchParams();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const busqueda = parametros.get("buscar") ?? "";

    // Obtener productos directamente desde msProducto.
    useEffect(() => {
        let activo = true;

        obtenerProductosApi()
            .then((productos) => {
                if (!activo) return;

                const productosActualizados = productos.map(
                    (producto) => ({
                        ...producto,
                        categoria: producto.categoria ?? "Sin categoría",
                        imagen: producto.imagen ?? "",
                        descripcionLarga: producto.descripcionLarga ?? ""
                    })
                );

                setListaProductos(productosActualizados);
                setErrorApi("");
            })
            .catch(() => {
                if (activo) {
                    setErrorApi(
                        "No se pudieron cargar los productos desde MySQL."
                    );
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

    // Buscar productos por nombre.
    const setBusqueda = (texto: string) => {
        const nuevosParametros = new URLSearchParams(parametros);

        if (texto.trim()) {
            nuevosParametros.set("buscar", texto);
        } else {
            nuevosParametros.delete("buscar");
        }

        setParametros(nuevosParametros, { replace: true });
    };

    // Obtener categorías del catálogo.
    const categorias = [
        ...new Set(
            listaProductos.map((producto) => producto.categoria)
        )
    ].sort();

    // Filtrar productos.
    const productosFiltrados = listaProductos.filter((producto) => {
        const coincideNombre = producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase().trim());

        const coincideCategoria =
            categoriaSeleccionada === "" ||
            producto.categoria === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });

    return (
        <div className="container mt-4">
            <h1>Productos</h1>

            {cargando && (
                <div className="alert alert-info">
                    Cargando productos...
                </div>
            )}

            {errorApi && (
                <div className="alert alert-danger" role="alert">
                    {errorApi}
                </div>
            )}

            {!cargando && !errorApi && (
                <>
                    <div className="row g-3 my-4">
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="buscarProducto"
                                className="form-label fw-semibold"
                            >
                                Buscar producto
                            </label>

                            <input
                                id="buscarProducto"
                                type="search"
                                className="form-control"
                                placeholder="Buscar productos..."
                                value={busqueda}
                                onChange={(e) =>
                                    setBusqueda(e.target.value)
                                }
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <FiltroCategoria
                                categorias={categorias}
                                valor={categoriaSeleccionada}
                                alCambiar={setCategoriaSeleccionada}
                            />
                        </div>
                    </div>

                    <p className="text-secondary">
                        Productos encontrados: {productosFiltrados.length}
                    </p>

                    <div className="row g-4 mt-2">
                        {productosFiltrados.map((producto) => (
                            <div
                                className="col-12 col-md-6 col-lg-4 col-xl-3"
                                key={producto.id}
                            >
                                <CardCatalogo producto={producto} />
                            </div>
                        ))}
                    </div>

                    {productosFiltrados.length === 0 && (
                        <div className="alert alert-warning mt-4">
                            No se encontraron productos.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Catalogo;
