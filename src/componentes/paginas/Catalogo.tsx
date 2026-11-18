import { useState, useEffect } from "react";
import CardCatalogo from "../moleculas/CardCatalogo";
import { obtenerProductos } from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";
import FiltroCategoria from "../moleculas/FiltroCategoria";
import { useSearchParams } from "react-router-dom";
import { obtenerProductosApi } from "../servicios/productosApi";
import { guardarProductos } from "../servicios/productosService";
import { obtenerCarrito, vaciarCarrito } from "../servicios/carritoService";

function Catalogo() {

    const [listaProductos, setListaProductos] = useState<Producto[]>(
        obtenerProductos
    );

    const [errorApi, setErrorApi] = useState("");

    // Consulta los productos de MySQL al abrir el catálogo.
    useEffect(() => {
        let activo = true;

        obtenerProductosApi()
            .then((productosApi) => {
                if (!activo) return;

                // Completa los campos opcionales que puedan venir vacíos.
                const productosActualizados = productosApi.map((producto) => ({
                    ...producto,
                    categoria: producto.categoria ?? "Sin categoría",
                    imagen: producto.imagen ?? "",
                    descripcionLarga: producto.descripcionLarga ?? ""
                }));

                const productosAnteriores = obtenerProductos();
                const carrito = obtenerCarrito();

                // Evita conservar productos con IDs que ahora pertenecen a otros artículos.
                const carritoIncompatible = carrito.some((item) => {
                    const anterior = productosAnteriores.find(
                        (producto) => producto.id === item.id
                    );

                    const actual = productosActualizados.find(
                        (producto) => producto.id === item.id
                    );

                    return !anterior || !actual ||
                        anterior.nombre !== actual.nombre;
                });

                if (carritoIncompatible) {
                    vaciarCarrito();
                }

                // Sincroniza temporalmente los datos para el detalle y el carrito local.
                guardarProductos(productosActualizados);
                setListaProductos(productosActualizados);
                setErrorApi("");
            })
            .catch(() => {
                if (activo) {
                    setErrorApi(
                        "No se pudo conectar con el servidor. Se muestran los datos locales."
                    );
                }
            });

        return () => {
            activo = false;
        };
    }, []);

    
    const [parametros, setParametros] = useSearchParams();

    const busqueda = parametros.get("buscar") ?? "";

    const setBusqueda = (texto: string) => {
        const nuevosParametros = new URLSearchParams(parametros);

        if (texto.trim()) {
            nuevosParametros.set("buscar", texto);
        } else {
            nuevosParametros.delete("buscar");
        }

        setParametros(nuevosParametros, { replace: true });
    };


    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const categorias = [
        ...new Set(listaProductos.map(
            (producto) => producto.categoria
        ))
    ].sort();

    // Filtrar productos según el nombre
    
    const productosFiltrados = listaProductos.filter((producto) => {

        // Filtrar por nombre
        const coincideNombre = producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase().trim());

        // Filtrar por categoría
        const coincideCategoria =
            categoriaSeleccionada === "" ||
            producto.categoria === categoriaSeleccionada;

        // Debe cumplir ambos filtros
        return coincideNombre && coincideCategoria;
    });


    return (
        <div className="container mt-4">

            <h1>Productos</h1>

            {errorApi && (
                <div className="alert alert-warning" role="alert">
                    {errorApi}
                </div>
            )}

            {/* Barra de búsqueda */}
            
            <div className="row g-3 my-4">

                {/* Búsqueda por nombre */}
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
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                {/* Filtro por categoría */}
                <div className="col-12 col-md-6">
                    <FiltroCategoria
                        categorias={categorias}
                        valor={categoriaSeleccionada}
                        alCambiar={setCategoriaSeleccionada}
                    />
                </div>

            </div>

            {/* Cantidad de resultados */}
            <p className="text-secondary">
                Productos encontrados: {productosFiltrados.length}
            </p>

            {/* Productos */}
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

            {/* Sin resultados */}
            {productosFiltrados.length === 0 && (
                <div className="alert alert-warning mt-4">
                    No se encontraron productos.
                </div>
            )}

        </div>
    );
}

export default Catalogo;
