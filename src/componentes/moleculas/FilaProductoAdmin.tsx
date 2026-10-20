
import type { Producto } from "../utilidades/tipos";
import BotonAccionProducto from "../atomos/BotonAccionProducto";
import { useNavigate } from "react-router-dom";

interface Props {
    producto: Producto;
    onEliminar: (id: number) => void;
}

function FilaProductoAdmin({ producto, onEliminar }: Props) {
    const navigate = useNavigate();
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
                    <BotonAccionProducto
                        accion="Editar"
                        deshabilitado={false}
                        onClick={() =>
                            navigate(`/admin/productos/editar/${producto.id}`)
                        }
                    />

                    <BotonAccionProducto
                        accion="Eliminar"
                        deshabilitado={false}
                        onClick={() => onEliminar(producto.id)}
                    />
                </div>
            </td>

        </tr>
    );
}

export default FilaProductoAdmin;
