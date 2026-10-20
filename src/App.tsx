import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar.tsx';
import Inicio from './componentes/paginas/Inicio.tsx';
import Catalogo from './componentes/paginas/Catalogo.tsx';
import Nosotros from './componentes/paginas/Nosotros.tsx';
import Noticias from './componentes/paginas/Noticias.tsx';
import Contactanos from './componentes/paginas/Contactanos.tsx';
import DetalleProducto from "./componentes/paginas/DetalleProducto";
import Login from "./componentes/paginas/Login";
import Registro from "./componentes/paginas/Registro";
import Footer from "./componentes/organismos/Footer";
import NuevoProducto from "./componentes/paginas/NuevoProducto";
import PanelAdmin from "./componentes/paginas/PanelAdmin";
import AdministrarProductos from "./componentes/paginas/AdministrarProductos";
import EditarProducto from "./componentes/paginas/EditarProducto";
import MiCuenta from "./componentes/paginas/MiCuenta";
import AdministrarUsuarios from "./componentes/paginas/AdministrarUsuarios";
import EditarUsuario from "./componentes/paginas/EditarUsuario";
import NuevoUsuario from "./componentes/paginas/NuevoUsuario";
import RutaAdmin from "./componentes/utilidades/RutaAdmin";


function App() {
    const esAdmin = useLocation().pathname.startsWith("/admin");

    return (
        <div className="d-flex flex-column min-vh-100">

            {!esAdmin && <Navbar />}

            <div className={`flex-grow-1 ${esAdmin ? "" : "pb-5"}`}>

                <Routes>
                    <Route
                      path = "/"
                      element = {<Inicio />} 
                    />
                    <Route
                      path = "/catalogo"
                      element = {<Catalogo />} 
                    />
                    <Route
                      path = "/nosotros"
                      element = {<Nosotros />} 
                    />
                    <Route 
                      path="/noticias" 
                      element={<Noticias />} 
                    />
                    
                    <Route
                      path = "/contactanos"
                      element = {<Contactanos />} 
                    />
                    <Route
                      path="/producto/:id"
                      element={<DetalleProducto />}
                    />
                    <Route
                      path="/login"
                      element={<Login />}
                    />
                    <Route 
                      path="/registro" 
                      element={<Registro />} 
                    />

                    <Route 
                      path="/mi-cuenta" 
                      element={<MiCuenta />} 
                    />

                    
                {/* Rutas exclusivas del administrador */}
                <Route element={<RutaAdmin />}>

                    <Route
                        path="/admin"
                        element={<PanelAdmin />}
                    />

                    <Route
                        path="/admin/productos"
                        element={<AdministrarProductos />}
                    />

                    <Route
                        path="/admin/productos/nuevo"
                        element={<NuevoProducto />}
                    />

                    <Route
                        path="/admin/productos/editar/:id"
                        element={<EditarProducto />}
                    />

                    <Route
                        path="/admin/usuarios"
                        element={<AdministrarUsuarios />}
                    />

                    <Route
                        path="/admin/usuarios/nuevo"
                        element={<NuevoUsuario />}
                    />

                    <Route
                        path="/admin/usuarios/editar/:run"
                        element={<EditarUsuario />}
                    />

                </Route>


                </Routes>

            </div>

            {!esAdmin && <Footer />}

        </div>
    );
}

export default App;