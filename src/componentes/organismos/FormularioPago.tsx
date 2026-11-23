import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import CampoFormulario from "../moleculas/CampoFormulario";
import { obtenerCarrito, vaciarCarrito } from "../servicios/carritoService";
import { obtenerProductosApi } from "../servicios/productosApi";

import type { ItemCarrito, Producto } from "../utilidades/tipos";

type CompraRegistrada = {
    id: number;
    total: number;
    estado: string;
};

function FormularioPago() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [metodo, setMetodo] = useState("");

    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);

    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);
    const [errorGeneral, setErrorGeneral] = useState("");
    const [advertencia, setAdvertencia] = useState("");

    const [pedido, setPedido] = useState<CompraRegistrada | null>(null);

    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        metodo: ""
    });

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
                    setErrorGeneral(
                        "No se pudieron cargar los datos de la compra."
                    );
                }
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    const total = carrito.reduce((suma, item) => {
        const producto = productos.find(p => p.id === item.id);

        return suma + (producto?.precio ?? 0) * item.cantidad;
    }, 0);

    const productosInvalidos = carrito.some(item => {
        const producto = productos.find(p => p.id === item.id);

        return !producto ||
            !Number.isInteger(item.cantidad) ||
            item.cantidad <= 0 ||
            item.cantidad > producto.stock;
    });

    const pagar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (procesando || pedido) return;

        const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

        const nuevosErrores = {
            nombre: "",
            correo: "",
            metodo: ""
        };

        if (!nombre.trim()) {
            nuevosErrores.nombre = "Ingrese su nombre completo.";
        } else if (!soloLetras.test(nombre.trim())) {
            nuevosErrores.nombre = "El nombre solo puede contener letras.";
        } else if (nombre.trim().split(/\s+/).length < 2) {
            nuevosErrores.nombre = "Ingrese su nombre y apellido.";
        } else if (nombre.trim().length > 100) {
            nuevosErrores.nombre = "Máximo 100 caracteres.";
        }

        if (!correo.trim()) {
            nuevosErrores.correo = "Ingrese su correo.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            nuevosErrores.correo = "Ingrese un correo válido.";
        } else if (correo.trim().length > 100) {
            nuevosErrores.correo = "Máximo 100 caracteres.";
        }

        if (!["Débito", "Crédito", "Transferencia"].includes(metodo)) {
            nuevosErrores.metodo = "Seleccione un método de pago.";
        }

        setErrores(nuevosErrores);
        setErrorGeneral("");

        if (Object.values(nuevosErrores).some(Boolean)) return;

        if (carrito.length === 0 || productosInvalidos) {
            setErrorGeneral(
                "El carrito está vacío o hay productos sin stock."
            );
            return;
        }

        setProcesando(true);

        try {
            const articulos = carrito.map(item => {
                const producto = productos.find(
                    p => p.id === item.id
                )!;

                return {
                    productoId: producto.id,
                    nombre: producto.nombre,
                    cantidad: item.cantidad,
                    precio: producto.precio
                };
            });

            const respuesta = await fetch("/api/compras", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuarioId: null,
                    nombreComprador: nombre.trim(),
                    correoComprador: correo.trim(),
                    metodoPago: metodo,
                    total,
                    fecha: new Date().toISOString(),
                    estado: "PENDIENTE",
                    articulos
                })
            });

            if (!respuesta.ok) {
                throw new Error(
                    `No se pudo registrar la compra (${respuesta.status}).`
                );
            }

            const compra: CompraRegistrada = await respuesta.json();

            setPedido(compra);

            try {
                await vaciarCarrito();
                setCarrito([]);
            } catch {
                setAdvertencia(
                    "El pedido se registró, pero no se pudo vaciar el carrito."
                );
            }

        } catch (error) {
            setErrorGeneral(
                error instanceof Error
                    ? error.message
                    : "Error al registrar la compra."
            );
        } finally {
            setProcesando(false);
        }
    };

    if (pedido) {
        return (
            <div className="alert alert-success">
                <h2 className="h4">¡Pedido registrado!</h2>

                <p>
                    Número de pedido: <strong>{pedido.id}</strong>
                </p>

                <p>
                    Total: ${pedido.total.toLocaleString("es-CL")}
                </p>

                <p>
                    Estado: {pedido.estado}
                </p>

                {advertencia && (
                    <div className="alert alert-warning">
                        {advertencia}
                    </div>
                )}

                <Link to="/catalogo" className="btn btn-primary">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    if (cargando) {
        return <p>Cargando datos de la compra...</p>;
    }

    if (errorGeneral && carrito.length === 0) {
        return (
            <div className="alert alert-danger">
                {errorGeneral}
            </div>
        );
    }

    if (carrito.length === 0) {
        return (
            <div className="alert alert-info">
                <p>Tu carrito está vacío.</p>
                <Link to="/catalogo" className="btn btn-primary">
                    Ver productos
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={pagar} noValidate>
            <h2 className="h4 mb-4">Datos de la compra</h2>

            <CampoFormulario
                etiqueta="Nombre completo"
                nombre="nombrePago"
                valor={nombre}
                alCambiar={setNombre}
                error={errores.nombre}
            />

            <CampoFormulario
                etiqueta="Correo electrónico"
                nombre="correoPago"
                tipo="email"
                valor={correo}
                alCambiar={setCorreo}
                error={errores.correo}
            />

            <div className="mb-4">
                <label htmlFor="metodoPago" className="form-label">
                    Método de pago
                </label>

                <select
                    id="metodoPago"
                    className="form-select"
                    value={metodo}
                    onChange={e => setMetodo(e.target.value)}
                    disabled={procesando}
                >
                    <option value="">Seleccione un método</option>
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Transferencia">Transferencia</option>
                </select>

                {errores.metodo && (
                    <p className="text-danger">{errores.metodo}</p>
                )}
            </div>

            <h3 className="h5 mb-4">
                Total: ${total.toLocaleString("es-CL")}
            </h3>

            {errorGeneral && (
                <div className="alert alert-danger">
                    {errorGeneral}
                </div>
            )}

            {productosInvalidos && (
                <div className="alert alert-warning">
                    Hay productos sin stock suficiente.
                </div>
            )}

            <button
                type="submit"
                className="btn btn-success"
                disabled={procesando || productosInvalidos}
            >
                {procesando ? "Registrando..." : "Confirmar compra"}
            </button>
        </form>
    );
}

export default FormularioPago;
