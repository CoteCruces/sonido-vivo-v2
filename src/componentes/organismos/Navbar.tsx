import { Link } from "react-router-dom";
import BuscadorNavbar from "../moleculas/BuscadorNavbar";
import MenuSesionNavbar from "../moleculas/MenuSesionNavbar";

function Navbar() {
    return (
        <nav
            className="navbar bg-dark border-bottom border-body nav-original"
            data-bs-theme="dark"
        >
            <div className="container-fluid d-flex align-items-center">

                <span className="navbar-brand text-white">
                    Sonido Vivo
                </span>

                <div className="d-flex align-items-center flex-grow-1 gap-3">

                    <Link className="nav-link" to="/">
                        <img
                            src="/imgIcons/home.png"
                            alt="Inicio"
                            width="30"
                            height="30"
                        />
                    </Link>

                    <Link className="nav-link text-primary" to="/catalogo">
                        Catálogo
                    </Link>

                    <Link className="nav-link text-primary" to="/nosotros">
                        Nosotros
                    </Link>

                    <Link className="nav-link text-primary" to="/noticias">
                        Noticias
                    </Link>

                    <Link className="nav-link text-primary" to="/contactanos">
                        Contáctanos
                    </Link>
                    
                <BuscadorNavbar />

                    <Link className="nav-link" to="/">
                        <img
                            src="/imgIcons/cart.png"
                            alt="Carrito"
                            width="30"
                            height="30"
                        />
                    </Link>

                    <div className="d-flex align-items-center ms-auto gap-3">
                        <MenuSesionNavbar />
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
