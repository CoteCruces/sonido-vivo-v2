import { useState } from "react";
import Boton from "../atomos/Boton";
import BotonAgregarCarrito from "../atomos/BotonAgregarCarrito";
import { agregarAlCarrito } from "../servicios/carritoService";
import type { Producto } from "../utilidades/tipos";

interface Props {
    producto: Producto;
}

function CardCatalogo({ producto }: Props) {

    const [mensaje, setMensaje] = useState("");

    const agregar = () => {
        const agregado = agregarAlCarrito(producto.id);

        if (agregado) {
            setMensaje("Producto agregado al carrito.");
        } else {
            setMensaje("No hay más unidades disponibles.");
        }
    };

    return (
        <div
            className="card catalogo h-100"
            style={{ width: "18rem" }}
        >
            <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "contain"
                }}
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

                <div className="mt-auto d-grid gap-2">
                    <Boton id={producto.id} />

                    <BotonAgregarCarrito
                        alAgregar={agregar}
                        sinStock={producto.stock <= 0}
                    />
                </div>

                {mensaje && (
                    <p className="text-success mt-2 mb-0" role="status">
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CardCatalogo;
