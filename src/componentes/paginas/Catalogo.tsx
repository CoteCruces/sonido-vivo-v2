
import { useState } from "react";
import CardCatalogo from "../moleculas/CardCatalogo";
import { obtenerProductos } from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";

function Catalogo() {

    const [listaProductos] = useState<Producto[]>(
        obtenerProductos
    );

    return (
        <div className="container mt-4">
            <h1>Productos</h1>

            <div className="row g-4 mt-2">
                {listaProductos.map((producto) => (
                    <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3"
                        key={producto.id}
                    >
                        <CardCatalogo producto={producto} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;
