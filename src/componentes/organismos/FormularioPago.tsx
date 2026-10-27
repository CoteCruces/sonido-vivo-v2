import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import CampoFormulario from "../moleculas/CampoFormulario";
import { confirmarCompra } from "../servicios/pedidosService";
import { obtenerCarrito } from "../servicios/carritoService";
import { obtenerProductos } from "../servicios/productosService";
import type { Pedido } from "../utilidades/tipos";

function FormularioPago() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [metodo, setMetodo] = useState("");

    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        metodo: ""
    });

    const [errorGeneral, setErrorGeneral] = useState("");
    const [pedido, setPedido] = useState<Pedido | null>(null);

    const carrito = obtenerCarrito();
    const productos = obtenerProductos();

    const total = carrito.reduce((suma, item) => {
        const producto = productos.find(
            (p) => p.id === item.id
        );

        return suma + (producto?.precio ?? 0) * item.cantidad;
    }, 0);

    // Validar el formulario y confirmar la compra.
    const pagar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Valida que el nombre completo no lleve números ni símbolos incorrectos.
        const soloLetras = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

        const nuevosErrores = {
            nombre: "",
            correo: "",
            metodo: ""
        };

        // Valida que el nombre completo tenga al menos dos palabras y máximo 100 caracteres.
        if (!nombre.trim()) {
            nuevosErrores.nombre = "Ingrese su nombre completo.";
        } else if (!soloLetras.test(nombre.trim())) {
            nuevosErrores.nombre = "El nombre solo puede contener letras.";
        } else if (nombre.trim().split(/\s+/).length < 2) {
            nuevosErrores.nombre = "Ingrese su nombre y apellido.";
        } else if (nombre.trim().length > 100) {
            nuevosErrores.nombre = "El nombre no puede superar 100 caracteres.";
        }

        // Valida que el correo tenga formato correcto y máximo 100 caracteres.
        if (!correo.trim()) {
            nuevosErrores.correo = "Ingrese su correo.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            nuevosErrores.correo = "Ingrese un correo válido.";
        } else if (correo.trim().length > 100) {
            nuevosErrores.correo = "El correo no puede superar 100 caracteres.";
        }

        // Valida que el método de pago sea uno de los disponibles en el formulario.
        if (!["Débito", "Crédito", "Transferencia"].includes(metodo)) {
            nuevosErrores.metodo = "Seleccione un método de pago válido.";
        }

        setErrores(nuevosErrores);
        setErrorGeneral("");

        if (Object.values(nuevosErrores).some((error) => error)) {
            return;
        }

        const compra = confirmarCompra(metodo);

        if (!compra) {
            setErrorGeneral(
                "No se pudo completar la compra. Revise el stock."
            );
            return;
        }

        setPedido(compra);
    };

    if (pedido) {
        return (
            <div className="alert alert-success">
                <h2 className="h4">¡Compra realizada!</h2>

                <p>Tu compra se completó correctamente.</p>

                <p>
                    <strong>Número de pedido:</strong> {pedido.id}
                </p>

                <p>
                    <strong>Total pagado:</strong>{" "}
                    ${pedido.total.toLocaleString("es-CL")}
                </p>

                <Link to="/catalogo" className="btn btn-primary">
                    Volver al catálogo
                </Link>
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
                <label
                    htmlFor="metodoPago"
                    className="form-label fw-semibold"
                >
                    Método de pago
                </label>

                <select
                    id="metodoPago"
                    className={`form-select ${
                        errores.metodo ? "is-invalid" : ""
                    }`}
                    value={metodo}
                    onChange={(e) => setMetodo(e.target.value)}
                    aria-invalid={Boolean(errores.metodo)}
                >
                    <option value="">Seleccione un método</option>
                    <option value="Débito">
                        Débito
                    </option>
                    <option value="Crédito">
                        Crédito
                    </option>
                    <option value="Transferencia">
                        Transferencia
                    </option>
                </select>

                {errores.metodo && (
                    <div className="invalid-feedback d-block">
                        {errores.metodo}
                    </div>
                )}
            </div>

            <h3 className="h5 mb-4">
                Total: ${total.toLocaleString("es-CL")}
            </h3>

            {errorGeneral && (
                <div className="alert alert-danger" role="alert">
                    {errorGeneral}
                </div>
            )}

            <button type="submit" className="btn btn-success">
                Confirmar compra
            </button>

        </form>
    );
}

export default FormularioPago;
