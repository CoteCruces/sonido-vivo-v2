import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useTienda } from "./contextos/TiendaContexto";
import Navbar from "./componentes/organismos/Navbar";
import AdminNavbar from "./componentes/organismos/AdminNavbar";
import Footer from "./componentes/organismos/Footer";
import Inicio from "./componentes/paginas/Inicio";
import Catalogo from "./componentes/paginas/Catalogo";
import DetalleProducto from "./componentes/paginas/DetalleProducto";
import Nosotros from "./componentes/paginas/Nosotros";
import Noticias from "./componentes/paginas/Noticias";
import DetalleNoticia from "./componentes/paginas/DetalleNoticia";
import Contactanos from "./componentes/paginas/Contactanos";
import MensajeEnviado from "./componentes/paginas/MensajeEnviado";
import Login from "./componentes/paginas/Login";
import Registro from "./componentes/paginas/Registro";
import Perfil from "./componentes/paginas/Perfil";
import Pago from "./componentes/paginas/Pago";
import CompraFinalizada from "./componentes/paginas/CompraFinalizada";
import AdminInicio from "./componentes/paginas/AdminInicio";
import AdminProductos from "./componentes/paginas/AdminProductos";
import AdminUsuarios from "./componentes/paginas/AdminUsuarios";
import NoEncontrada from "./componentes/paginas/NoEncontrada";
function SoloAdmin({ children }: { children: React.ReactNode }) {
  const { sesion } = useTienda();
  return sesion?.rol === "Administrador" ? (
    children
  ) : (
    <Navigate to="/iniciar-sesion" replace />
  );
}
function RedirigirDetalle({ tipo }: { tipo: "producto" | "noticias" }) {
  const [parametros] = useSearchParams();
  return <Navigate to={`/${tipo}/${parametros.get("id") || ""}`} replace />;
}
export default function App() {
  const { pathname } = useLocation();
  const tema =
    pathname === "/" || pathname === "/main.html"
      ? "tema-inicio"
      : pathname.startsWith("/catalogo")
        ? "tema-catalogo"
        : pathname.startsWith("/producto")
          ? "tema-detalle"
          : pathname.startsWith("/nosotros")
            ? "tema-nosotros"
            : pathname.startsWith("/noticias")
              ? "tema-noticias"
              : pathname.startsWith("/admin")
                ? "tema-gestion"
                : pathname.startsWith("/pago")
                  ? "tema-pago"
                  : pathname.startsWith("/perfil")
                    ? "tema-cuenta"
                    : pathname.startsWith("/contactanos")
                      ? "tema-contacto"
                      : pathname.startsWith("/iniciar-sesion")
                        ? "tema-login"
                        : pathname.startsWith("/registrarse")
                          ? "tema-registro"
                          : "tema-formulario";
  return (
    <div className={`sitio ${tema}`}>
      {pathname.startsWith("/admin") ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<DetalleNoticia />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/mensaje-enviado" element={<MensajeEnviado />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/compra-finalizada" element={<CompraFinalizada />} />
        <Route
          path="/admin"
          element={
            <SoloAdmin>
              <AdminInicio />
            </SoloAdmin>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <SoloAdmin>
              <AdminProductos />
            </SoloAdmin>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <SoloAdmin>
              <AdminUsuarios />
            </SoloAdmin>
          }
        />
        <Route path="/main.html" element={<Navigate to="/" replace />} />
        <Route path="/index.html" element={<Navigate to="/perfil" replace />} />
        <Route
          path="/catalogo.html"
          element={<Navigate to="/catalogo" replace />}
        />
        <Route
          path="/producto-detalle.html"
          element={<RedirigirDetalle tipo="producto" />}
        />
        <Route
          path="/nosotros.html"
          element={<Navigate to="/nosotros" replace />}
        />
        <Route
          path="/noticias.html"
          element={<Navigate to="/noticias" replace />}
        />
        <Route
          path="/noticia-detalle.html"
          element={<RedirigirDetalle tipo="noticias" />}
        />
        <Route
          path="/contactanos.html"
          element={<Navigate to="/contactanos" replace />}
        />
        <Route
          path="/mensajeEnviado.html"
          element={<Navigate to="/mensaje-enviado" replace />}
        />
        <Route
          path="/iniciar-sesion.html"
          element={<Navigate to="/iniciar-sesion" replace />}
        />
        <Route
          path="/registrarse.html"
          element={<Navigate to="/registrarse" replace />}
        />
        <Route path="/pago.html" element={<Navigate to="/pago" replace />} />
        <Route
          path="/admin-main.html"
          element={<Navigate to="/admin" replace />}
        />
        <Route
          path="/admin-productos.html"
          element={<Navigate to="/admin/productos" replace />}
        />
        <Route
          path="/admin-usuarios.html"
          element={<Navigate to="/admin/usuarios" replace />}
        />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <Footer />
    </div>
  );
}
