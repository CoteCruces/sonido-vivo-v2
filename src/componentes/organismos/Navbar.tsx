import { useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTienda } from "../../contextos/TiendaContexto";
import Carrito from "./Carrito";

export default function Navbar() {
  const { productos, unidades, sesion, cerrarSesion } = useTienda();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [buscar, setBuscar] = useState("");
  const navegar = useNavigate();
  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const cerrarMenu = () => {
    setCategoriasAbiertas(false);
    setMenuAbierto(false);
  };
  const buscarProductos = (e: FormEvent) => {
    e.preventDefault();
    navegar(`/catalogo?buscar=${encodeURIComponent(buscar.trim())}`);
    cerrarMenu();
  };
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body nav-original"
        data-bs-theme="dark"
      >
        <nav className="navbar nav-tabs navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={cerrarMenu}>
              Sonido Vivo{" "}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-controls="navbarText"
              aria-expanded={menuAbierto}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
              id="navbarText"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    title="Ir al Inicio"
                    onClick={cerrarMenu}
                  >
                    <img
                      src="/imagenes/icons/home.png"
                      alt="Inicio"
                      width="24"
                      height="24"
                    />
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className={`nav-link dropdown-toggle ${categoriasAbiertas ? "show" : ""}`}
                    type="button"
                    id="navbarDropdownCatalogo"
                    aria-expanded={categoriasAbiertas}
                    onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
                  >
                    Catálogo
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-dark ${categoriasAbiertas ? "show" : ""}`}
                    id="menuCategorias"
                    aria-labelledby="navbarDropdownCatalogo"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/catalogo"
                        onClick={cerrarMenu}
                      >
                        Todos los Productos
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {categorias.map((c) => (
                      <li key={c}>
                        <Link
                          className="dropdown-item"
                          to={`/catalogo?categoria=${encodeURIComponent(c)}`}
                          onClick={cerrarMenu}
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/nosotros"
                    onClick={cerrarMenu}
                  >
                    Nosotros
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/noticias"
                    onClick={cerrarMenu}
                  >
                    Noticias
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/contactanos"
                    onClick={cerrarMenu}
                  >
                    Contactanos
                  </NavLink>
                </li>
                <li className="nav-item nav-original-busqueda">
                  <form
                    className="d-flex"
                    onSubmit={buscarProductos}
                    role="search"
                    data-bs-theme="light"
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      value={buscar}
                      onChange={(e) => setBuscar(e.target.value)}
                      placeholder="Search"
                      aria-label="Buscar"
                      style={{ width: 500 }}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Buscar
                    </button>
                  </form>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link carrito-icono-wrapper"
                    type="button"
                    title="Ver Carrito"
                    onClick={() => setCarritoAbierto(true)}
                    aria-label="Ver carrito"
                  >
                    <img
                      src="/imagenes/icons/cart.png"
                      alt="Carrito de compras"
                      width="24"
                      height="24"
                    />
                    {unidades > 0 && (
                      <span
                        id="carritoContador"
                        className="badge rounded-pill bg-danger"
                      >
                        {unidades}
                      </span>
                    )}
                  </button>
                </li>
                {sesion ? (
                  <>
                    <li className="nav-item nav-original-sesion">
                      <NavLink
                        className="nav-link"
                        to={
                          sesion.rol === "Administrador" ? "/admin" : "/perfil"
                        }
                        onClick={cerrarMenu}
                      >
                        Mi cuenta
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        type="button"
                        onClick={() => {
                          cerrarSesion();
                          cerrarMenu();
                          navegar("/");
                        }}
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item nav-original-sesion">
                      <NavLink
                        className="nav-link"
                        to="/iniciar-sesion"
                        onClick={cerrarMenu}
                      >
                        Iniciar Sesión
                      </NavLink>
                    </li>
                    <li className="nav-item nav-original-separador">
                      <p style={{ color: "rgb(110, 92, 75)", marginTop: 8 }}>
                        |
                      </p>
                    </li>
                    <li className="nav-item nav-original-registro">
                      <NavLink
                        className="nav-link"
                        to="/registrarse"
                        onClick={cerrarMenu}
                      >
                        Registrarse
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
      <Carrito
        abierto={carritoAbierto}
        cerrar={() => setCarritoAbierto(false)}
      />
    </>
  );
}
