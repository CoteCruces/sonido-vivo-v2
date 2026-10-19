
import Boton from "../atomos/Boton";
import type { Producto } from "../datos/productos";

interface Props {
    producto: Producto;
}

function CardCatalogo({ producto }: Props) {
    return (
        <div
            className="card catalogo h-100"
            style={{ width: "18rem" }}
        >
            <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    {producto.nombre}
                </h5>

                <p className="card-text">
                    {producto.descripcion}
                </p>

                <p className="card-text">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>

                <div className="mt-auto">
                    <Boton />
                </div>
            </div>
        </div>
    );
}

export default CardCatalogo;
