
import type { Producto } from "../utilidades/tipos";
import BotonAccionProducto from "../atomos/BotonAccionProducto";

interface Props {
    producto: Producto;
}

function FilaProductoAdmin({ producto }: Props) {
    return (
        <tr>

            {/* ID */}
            <td>{producto.id}</td>

            {/* Imagen */}
            <td>
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "contain"
                    }}
                />
            </td>

            {/* Nombre */}
            <td className="fw-semibold">
                {producto.nombre}
            </td>

            {/* Categoría */}
            <td>
                {producto.categoria}
            </td>

            {/* Precio */}
            <td>
                ${producto.precio.toLocaleString("es-CL")}
            </td>

            {/* Stock */}
            <td>
                {producto.stock}
            </td>

            {/* Acciones */}
            <td>
                <div className="d-flex gap-2">
                    <BotonAccionProducto accion="Editar" />

                    <BotonAccionProducto accion="Eliminar" />
                </div>
            </td>

        </tr>
    );
}

export default FilaProductoAdmin;
