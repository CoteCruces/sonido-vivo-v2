import { Link } from "react-router-dom";

function Navbar(){
    return(
        //<nav className = "navbar navbar-expand bg-dark">
        <nav className="navbar bg-dark border-bottom border-body nav-original" data-bs-theme="dark"
        >
            <nav className="navbar nav-tabs navbar-expand-lg bg-body-tertiary">
            
            <div className = "container-fluid">
                <span className = "navbar-brand text-white">Sonido Vivo</span>
                <div className = "navbar-nav">
                    <Link className = "nav-link text-primary" to = "/">Inicio</Link>
                    <img
                      src="/imagenes/icons/home.png"
                      alt="Inicio"
                      width="24"
                      height="24"
                    />
                    <Link className = "nav-link text-primary" to = "/catalogo">Catálogo</Link>
                    <Link className = "nav-link text-primary" to = "/nosotros">Nosotros</Link>
                    <Link className = "nav-link text-primary" to = "/noticias">Noticias</Link>
                    <Link className = "nav-link text-primary" to = "/contactanos">Contáctanos</Link>
                </div>
            </div>
            </nav>
        </nav>
    )
}
export default Navbar;