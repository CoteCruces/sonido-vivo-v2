import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BotonAgregarCarrito from "../atomos/BotonAgregarCarrito";
import { agregarAlCarrito } from "../servicios/carritoService";
import { obtenerProductoApi } from "../servicios/productosApi";

import type { Producto } from "../utilidades/tipos";

function DetalleProducto() {
    const { id } = useParams();

    const [producto, setProducto] = useState<Producto | null>(null);
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState("");
    const [errorCarrito, setErrorCarrito] = useState("");

    // Consultar el producto desde msProducto.
    useEffect(() => {
        let activo = true;

        setCargando(true);
        setError("");
        setProducto(null);
        setMensaje("");
        setErrorCarrito("");

        const productoId = Number(id);

        if (!id || !Number.isInteger(productoId) || productoId <= 0) {
            setCargando(false);
            return;
        }

        obtenerProductoApi(productoId)
            .then((datos) => {
                if (!activo || !datos) return;

                setProducto({
                    ...datos,
                    categoria: datos.categoria ?? "Sin categoría",
                    imagen: datos.imagen ?? "",
                    descripcionLarga: datos.descripcionLarga ?? ""
                });
            })
            .catch(() => {
                if (activo) {
                    setError("No se pudo cargar el producto.");
                }
            })
            .finally(() => {
                if (activo) {
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, [id]);

    // Agregar al carrito mediante msCarrito.
    const agregar = async () => {
        if (!producto || procesando) return;

        setProcesando(true);
        setMensaje("");
        setErrorCarrito("");

        try {
            const agregado = await agregarAlCarrito(producto.id);

            if (agregado) {
                setMensaje("Producto agregado al carrito.");
            } else {
                setErrorCarrito(
                    "No se puede agregar más unidades de este producto."
                );
            }
        } catch {
            setErrorCarrito(
                "No se pudo agregar el producto al carrito."
            );
        } finally {
            setProcesando(false);
        }
    };

    if (cargando) {
        return (
            <div className="container my-5">
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>

                <Link to="/catalogo" className="btn btn-primary">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="container mt-5">
                <h2>Producto no encontrado</h2>

                <Link to="/catalogo" className="btn btn-primary">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div
                className="bg-white rounded-4 shadow p-4 p-md-5 text-dark"
                style={{ maxWidth: "1100px", margin: "auto" }}
            >
                <div className="row g-4 align-items-center">

                    <div className="col-md-6 text-center">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid"
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "contain",
                                padding: "15px"
                            }}
                        />
                    </div>

                    <div className="col-md-6">
                        <h2 className="fw-bold mb-3">
                            {producto.nombre}
                        </h2>

                        <p className="text-secondary">
                            {producto.categoria}
                        </p>

                        <h3 className="text-primary fw-bold mb-4">
                            ${producto.precio.toLocaleString("es-CL")}
                        </h3>

                        <hr />

                        <h4 className="fw-semibold mt-4">
                            Descripción
                        </h4>

                        <p
                            className="mt-3"
                            style={{
                                lineHeight: "1.8",
                                textAlign: "justify"
                            }}
                        >
                            {producto.descripcionLarga || producto.descripcion}
                        </p>

                        <p className="mt-4">
                            <strong>Stock disponible:</strong>{" "}
                            {producto.stock}
                        </p>

                        <div className="mt-3">
                            <fieldset
                                disabled={procesando}
                                className="border-0 p-0 m-0"
                            >
                                <BotonAgregarCarrito
                                    alAgregar={agregar}
                                    sinStock={producto.stock <= 0}
                                />
                            </fieldset>
                        </div>

                        {mensaje && (
                            <div
                                className="alert alert-success mt-3"
                                role="status"
                            >
                                {mensaje}
                            </div>
                        )}

                        {errorCarrito && (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                {errorCarrito}
                            </div>
                        )}

                        <Link
                            to="/catalogo"
                            className="btn btn-secondary mt-3"
                        >
                            Volver al catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;
