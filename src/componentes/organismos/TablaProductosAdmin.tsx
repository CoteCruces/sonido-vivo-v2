
import { useState } from "react";
import FilaProductoAdmin from "../moleculas/FilaProductoAdmin";
import { obtenerProductos } from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";

function TablaProductosAdmin() {

    const [productos] = useState<Producto[]>(
        obtenerProductos
    );

    return (
        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4">

                <h4 className="fw-bold text-dark mb-3">
                    Listado de Productos
                </h4>

                <p className="text-muted">
                    Total de productos: {productos.length}
                </p>

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
                                />
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}

export default TablaProductosAdmin;
