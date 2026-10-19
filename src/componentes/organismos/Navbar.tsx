
import { Link } from "react-router-dom";

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

                    <div className="d-flex align-items-center ms-auto gap-3">

                        <Link className="nav-link text-primary" to="/login">
                            Iniciar Sesión
                        </Link>

                        <span className="text-primary">|</span>

                        <Link className="nav-link text-primary" to="/registro">
                            Crear Cuenta
                        </Link>

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
