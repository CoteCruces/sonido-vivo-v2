import { Link } from "react-router-dom";

function Navbar(){
    return(
        //<nav className = "navbar navbar-expand bg-dark">
        <nav className="navbar navbar-expand-lg border-bottom border-body " data-bs-theme="dark"
        style={{backgroundColor: 'darkblue', width: '100%'}} >
            
            <div className = "container-fluid">
                <span className = "navbar-brand text-white">Sonido Vivo</span>
                <div className = "navbar-nav">
                    <Link className = "nav-link text-white" to = "/">Inicio</Link>
                    <Link className = "nav-link text-white" to = "/catalogo">Catálogo</Link>
                    <Link className = "nav-link text-white" to = "/nosotros">Nosotros</Link>
                    <Link className = "nav-link text-white" to = "/noticias">Noticias</Link>
                    <Link className = "nav-link text-white" to = "/contactanos">Contactanos</Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;