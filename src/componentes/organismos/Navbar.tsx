import { Link } from "react-router-dom";

function Navbar(){
    return(
        //<nav className = "navbar navbar-expand bg-dark">
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body " data-bs-theme="dark">
            <div className = "container-fluid">
                <span className = "navbar-brand text-white">Sonido Vivo</span>
                <div className = "navbar-nav">
                    <Link className = "nav-link text-white" to = "/">Inicio</Link>
                    <Link className = "nav-link text-white" to = "/productos">Productos</Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;