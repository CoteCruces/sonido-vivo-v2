import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { ItemCarrito, Producto } from "../utilidades/tipos";
import { obtenerProductosApi } from "../servicios/productosApi";

import {
    obtenerCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito
} from "../servicios/carritoService";

function Carrito() {
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState("");

    // Cargar carrito y productos desde los microservicios.
    useEffect(() => {
        let activo = true;

        Promise.all([
            obtenerCarrito(),
            obtenerProductosApi()
        ])
            .then(([datosCarrito, datosProductos]) => {
                if (!activo) return;

                setCarrito(datosCarrito);
                setProductos(datosProductos);
            })
            .catch(() => {
                if (activo) {
                    setError("No se pudo cargar el carrito.");
                }
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    // Relacionar los productos del carrito con el catálogo.
    const detalles = carrito.flatMap((item) => {
        const producto = productos.find(
            (p) => p.id === item.id
        );

        return producto ? [{ ...item, producto }] : [];
    });

    const total = detalles.reduce(
        (suma, item) =>
            suma + item.producto.precio * item.cantidad,
        0
    );

    const actualizar = async (
        id: number,
        cantidad: number
    ) => {
        if (procesando) return;

        setProcesando(true);
        setError("");

        try {
            const correcto = await cambiarCantidad(id, cantidad);

            if (!correcto) {
                setError("Cantidad no disponible en stock.");
                return;
            }

            setCarrito(await obtenerCarrito());
        } catch {
            setError("No se pudo actualizar el carrito.");
        } finally {
            setProcesando(false);
        }
    };

    const quitar = async (id: number) => {
        if (procesando) return;

        setProcesando(true);
        setError("");

        try {
            await eliminarDelCarrito(id);
            setCarrito(await obtenerCarrito());
        } catch {
            setError("No se pudo eliminar el producto.");
        } finally {
            setProcesando(false);
        }
    };

    const vaciar = async () => {
        if (procesando) return;

        setProcesando(true);
        setError("");

        try {
            await vaciarCarrito();
            setCarrito([]);
        } catch {
            setError("No se pudo vaciar el carrito.");
            try {
                setCarrito(await obtenerCarrito());
            } catch {
                // Se conserva el estado anterior.
            }
        } finally {
            setProcesando(false);
        }
    };

    return (
        <main className="container my-5">
            <h1 className="mb-4">Mi carrito</h1>

            {cargando && (
                <p>Cargando carrito...</p>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {!cargando && !error && carrito.length === 0 && (
                <div className="text-center bg-white text-dark rounded p-5">
                    <p>Tu carrito está vacío.</p>

                    <Link to="/catalogo" className="btn btn-primary">
                        Ver catálogo
                    </Link>
                </div>
            )}

            {!cargando && carrito.length > 0 && (
                <>
                    {detalles.length !== carrito.length && (
                        <div className="alert alert-warning">
                            Algunos productos ya no están disponibles
                            en el catálogo.
                        </div>
                    )}

                    {detalles.map((item) => (
                        <div key={item.id} className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center g-3">

                                    <div className="col-md-2 text-center">
                                        <img
                                            src={item.producto.imagen}
                                            alt={item.producto.nombre}
                                            className="img-fluid"
                                            style={{ maxHeight: "120px" }}
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
                                                disabled={
                                                    procesando ||
                                                    item.cantidad <= 1
                                                }
                                                onClick={() =>
                                                    actualizar(
                                                        item.id,
                                                        item.cantidad - 1
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span>{item.cantidad}</span>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                disabled={
                                                    procesando ||
                                                    item.cantidad >= item.producto.stock
                                                }
                                                onClick={() =>
                                                    actualizar(
                                                        item.id,
                                                        item.cantidad + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                disabled={procesando}
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

                            {detalles.length === carrito.length && (
                                <Link
                                    to="/pago"
                                    className={`btn btn-success ${
                                        procesando ? "disabled" : ""
                                    }`}
                                    onClick={(evento) => {
                                        if (procesando) {
                                            evento.preventDefault();
                                        }
                                    }}
                                >
                                    Ir a pagar
                                </Link>
                            )}

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                disabled={procesando}
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
