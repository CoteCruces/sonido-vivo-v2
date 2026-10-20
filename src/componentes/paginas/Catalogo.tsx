import { useState } from "react";
import CardCatalogo from "../moleculas/CardCatalogo";
import { obtenerProductos } from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";
import FiltroCategoria from "../moleculas/FiltroCategoria";
import { useSearchParams } from "react-router-dom";

function Catalogo() {

    const [listaProductos] = useState<Producto[]>(
        obtenerProductos
    );
    
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
