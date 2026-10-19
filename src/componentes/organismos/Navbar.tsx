
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
                    
                    //Barra de busqueda
                    <div className="hstack gap-2" role="search">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Buscar"
                            style={{ width: "450px" }}
                        />

                        <Link
                            to="/catalogo"
                            className="btn btn-outline-primary"
                            aria-label="Ir al catálogo"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-4-4" />
                            </svg>
                        </Link>
                    </div>


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
