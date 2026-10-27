import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BuscadorNavbar from "../moleculas/BuscadorNavbar";
import MenuSesionNavbar from "../moleculas/MenuSesionNavbar";
import { contarProductosCarrito } from "../servicios/carritoService";

function Navbar() {
    const [abierto, setAbierto] = useState(false);

    
    const [cantidadCarrito, setCantidadCarrito] = useState(
        contarProductosCarrito()
    );

    useEffect(() => {
        const actualizarContador = () => {
            setCantidadCarrito(contarProductosCarrito());
        };

        window.addEventListener(
            "carritoActualizado",
            actualizarContador
        );

        return () => {
            window.removeEventListener(
                "carritoActualizado",
                actualizarContador
            );
        };
    }, []);


    return (
        <nav
            className="navbar navbar-expand-xxl bg-dark border-bottom border-body nav-original"
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <span className="navbar-brand text-white">
                    Sonido Vivo
                </span>

                {/* Menú para pantallas pequeñas */}
                <button
                    type="button"
                    className="navbar-toggler"
                    aria-label="Abrir o cerrar menú"
                    aria-controls="menuPublico"
                    aria-expanded={abierto}
                    onClick={() => setAbierto(!abierto)}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    id="menuPublico"
                    className={`collapse navbar-collapse ${abierto ? "show" : ""}`}
                    onClick={(evento) => {
                        // Cerrar el menú al usar un enlace o botón
                        if ((evento.target as HTMLElement).closest('a, button[type="button"]')) {
                            setAbierto(false);
                        }
                    }}
                >
                    <div className="navbar-nav align-items-xxl-center gap-xxl-3 me-xxl-3">
                        <Link className="nav-link" to="/">
                            <img src="/imgIcons/home.png" alt="Inicio" width="30" height="30" />
                        </Link>
                        <Link className="nav-link text-primary" to="/catalogo">Catálogo</Link>
                        <Link className="nav-link text-primary" to="/nosotros">Nosotros</Link>
                        <Link className="nav-link text-primary" to="/noticias">Noticias</Link>
                        <Link className="nav-link text-primary" to="/contactanos">Contáctanos</Link>
                        <Link className="nav-link text-primary" to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
                    </div>

                    <div
                        className="my-3 my-xxl-0 me-xxl-3"
                        style={{ width: "320px", maxWidth: "100%" }}
                    >
                        <BuscadorNavbar alBuscar={() => setAbierto(false)} />
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-3 ms-xxl-auto">
                        <Link
                            className="nav-link position-relative d-inline-block"
                            to="/carrito"
                        >
                            <img
                                src="/imgIcons/cart.png"
                                alt="Carrito"
                                width="30"
                                height="30"
                            />
                            {cantidadCarrito > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cantidadCarrito}
                                </span>
                            )}
                        </Link>
                        <MenuSesionNavbar />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
