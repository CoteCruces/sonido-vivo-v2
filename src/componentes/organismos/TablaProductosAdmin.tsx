
import { useState } from "react";
import FilaProductoAdmin from "../moleculas/FilaProductoAdmin";
import { obtenerProductos, eliminarProducto} from "../servicios/productosService";
import type { Producto } from "../utilidades/tipos";

function TablaProductosAdmin() {

    const [productos, setProductos] = useState<Producto[]>(
        obtenerProductos
    );

    
    const manejarEliminar = (id: number) => {

        // Buscar el producto
        const producto = productos.find(
            (p) => p.id === id
        );

        if (!producto) return;

        // Pedir confirmación
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar "${producto.nombre}"?`
        );

        if (!confirmar) return;

        try {
            // Eliminar mediante el servicio
            const eliminado = eliminarProducto(id);

            if (!eliminado) {
                alert("No se encontró el producto.");
                return;
            }

            // Actualizar la tabla
            setProductos(obtenerProductos());

        } catch {
            alert("No se pudo eliminar el producto.");
        }
    };


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
                                    onEliminar={manejarEliminar}
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
