import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import { dinero, rutaImagen } from "../../utilidades/funciones";
export default function Pago() {
  const { items, total, guardarPedido } = useTienda();
  const [metodo, setMetodo] = useState("tarjeta");
  const [numero, setNumero] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const navegar = useNavigate();
  function confirmar(e: FormEvent) {
    e.preventDefault();
    if (!items.length) {
      setError(
        "Tu carrito está vacío. Agrega productos antes de procesar el pago.",
      );
      return;
    }
    if (items.some((i) => i.cantidad > i.producto.stock)) {
      setError("Uno o más productos ya no tienen stock suficiente.");
      return;
    }
    if (
      metodo === "tarjeta" &&
      (!/^\d{16}$/.test(numero.replace(/\s/g, "")) ||
        !/^\d{2}\/\d{2}$/.test(vencimiento) ||
        !/^\d{3}$/.test(cvv))
    ) {
      setError(
        "Revisa los datos de tarjeta de demostración. No utilices datos bancarios reales.",
      );
      return;
    }
    guardarPedido(metodo);
    navegar("/compra-finalizada");
  }
  return (
    <main className="w-100 my-4 d-flex justify-content-center">
      <div className="container-xxl px-2 px-sm-3">
        <h1 className="mb-4 fw-bold text-center text-md-start">
          Finalizar compra
        </h1>
        {!items.length && (
          <div className="alert alert-warning" role="alert">
            <strong>¡Atención!</strong> Tu carrito está vacío. Agrega productos
            antes de procesar el pago.
          </div>
        )}
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}
        <form id="formPago" onSubmit={confirmar}>
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="card-title h5 mb-4 fw-bold">
                      Resumen de tu pedido
                    </h3>
                    <div
                      className="mb-3"
                      style={{ maxHeight: 500, overflowY: "auto" }}
                    >
                      {items.map(({ producto, cantidad }) => (
                        <div
                          className="d-flex align-items-center gap-3 border-bottom py-2"
                          key={producto.id}
                        >
                          <img
                            src={rutaImagen(producto.imagen)}
                            alt={producto.nombre}
                            width="60"
                            height="60"
                            style={{ objectFit: "contain" }}
                          />
                          <div className="flex-grow-1">
                            <strong>{producto.nombre}</strong>
                            <p className="text-muted mb-0">
                              Cantidad: {cantidad}
                            </p>
                          </div>
                          <strong>{dinero(producto.precio * cantidad)}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-semibold">{dinero(total)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Envío</span>
                      <span className="text-success fw-semibold">Gratis</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center fs-5 pt-2 border-top">
                      <strong>Total:</strong>
                      <strong>
                        <span className="text-primary">{dinero(total)}</span>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 my-4">
            <div className="col-12 col-md-4">
              <div className="form-check border rounded p-3 bg-white d-flex align-items-start">
                <input
                  className="form-check-input mt-1 me-3 flex-shrink-0"
                  type="radio"
                  name="formaPago"
                  id="tarjeta"
                  checked={metodo === "tarjeta"}
                  onChange={() => setMetodo("tarjeta")}
                />
                <label className="form-check-label w-100" htmlFor="tarjeta">
                  <span className="d-block fw-bold text-dark">
                    💳 Tarjeta de Crédito/Débito
                  </span>
                  <small className="text-muted d-block mt-1">
                    Paga de forma segura.
                  </small>
                </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-check border rounded p-3 bg-white d-flex align-items-start">
                <input
                  className="form-check-input mt-1 me-3 flex-shrink-0"
                  type="radio"
                  name="formaPago"
                  id="webpay"
                  checked={metodo === "webpay"}
                  onChange={() => setMetodo("webpay")}
                />
                <label className="form-check-label w-100" htmlFor="webpay">
                  <span className="d-block fw-bold text-dark">💳 Webpay</span>
                  <small className="text-muted d-block mt-1">
                    Paga mediante Transbank.
                  </small>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {metodo === "tarjeta" ? (
                <div className="p-4 border rounded bg-white">
                  <h4 className="mb-3 h5 fw-bold">Datos de la tarjeta</h4>
                  <p className="small text-muted">
                    Solo simulación: no ingreses datos de tarjetas reales.
                  </p>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="numeroTarjeta">
                      Número de tarjeta
                    </label>
                    <input
                      className="form-control"
                      id="numeroTarjeta"
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="vencimiento">
                        Fecha de vencimiento
                      </label>
                      <input
                        className="form-control"
                        id="vencimiento"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="cvv">
                        CVV
                      </label>
                      <input
                        className="form-control"
                        id="cvv"
                        placeholder="123"
                        type="password"
                        inputMode="numeric"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border rounded bg-white">
                  <h4 className="mb-3 h5 fw-bold">Redirección a Webpay</h4>
                  <p className="text-muted small mb-3">
                    En esta versión demostrativa se simula el pago sin conectar
                    con Transbank.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button className="btn btn-primary btn-lg px-5" type="submit">
                Pagar Ahora
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
