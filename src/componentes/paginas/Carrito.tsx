import { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../servicios/productosService";
import {
    obtenerCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito
} from "../servicios/carritoService";

function Carrito() {
    const [carrito, setCarrito] = useState(obtenerCarrito());

    const productos = obtenerProductos();

    // Relacionar los productos guardados con sus datos.
    const detalles = carrito.flatMap((item) => {
        const producto = productos.find((p) => p.id === item.id);

        return producto
            ? [{ ...item, producto }]
            : [];
    });

    const total = detalles.reduce(
        (suma, item) => suma + item.producto.precio * item.cantidad,
        0
    );

    const actualizar = (id: number, cantidad: number) => {
        if (cambiarCantidad(id, cantidad)) {
            setCarrito(obtenerCarrito());
        }
    };

    const quitar = (id: number) => {
        eliminarDelCarrito(id);
        setCarrito(obtenerCarrito());
    };

    const vaciar = () => {
        vaciarCarrito();
        setCarrito([]);
    };

    return (
        <main className="container my-5">
            <h1 className="mb-4">Mi carrito</h1>

            {detalles.length === 0 ? (
                <div className="text-center bg-white text-dark rounded p-5">
                    <p>Tu carrito está vacío.</p>

                    <Link to="/catalogo" className="btn btn-primary">
                        Ver catálogo
                    </Link>
                </div>
            ) : (
                <>
                    {detalles.map((item) => (
                        <div
                            key={item.id}
                            className="card mb-3"
                        >
                            <div className="card-body">
                                <div className="row align-items-center g-3">

                                    <div className="col-md-2 text-center">
                                        <img
                                            src={item.producto.imagen}
                                            alt={item.producto.nombre}
                                            className="img-fluid"
                                            style={{
                                                maxHeight: "120px"
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <h2 className="h5">
                                            {item.producto.nombre}
                                        </h2>

                                        <p className="mb-0">
                                            ${item.producto.precio.toLocaleString("es-CL")}
                                        </p>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                disabled={item.cantidad <= 1}
                                                onClick={() => actualizar(
                                                    item.id,
                                                    item.cantidad - 1
                                                )}
                                            >
                                                -
                                            </button>

                                            <span>{item.cantidad}</span>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                disabled={
                                                    item.cantidad >= item.producto.stock
                                                }
                                                onClick={() => actualizar(
                                                    item.id,
                                                    item.cantidad + 1
                                                )}
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => quitar(item.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-white text-dark rounded p-4 mt-4">
                        <h2 className="h4">
                            Total: ${total.toLocaleString("es-CL")}
                        </h2>
                        <div className="d-flex gap-3 flex-wrap mt-3">

                            <Link
                                to="/catalogo"
                                className="btn btn-primary"
                            >
                                Seguir comprando
                            </Link>

                            <Link
                                to="/pago"
                                className="btn btn-success"
                            >
                                Ir a pagar
                            </Link>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={vaciar}
                            >
                                Vaciar carrito
                            </button>

                        </div>

                    </div>
                </>
            )}
        </main>
    );
}

export default Carrito;
