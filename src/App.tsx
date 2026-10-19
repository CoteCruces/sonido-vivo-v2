import { Route, Routes } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar.tsx';
import Inicio from './componentes/paginas/Inicio.tsx';
import Catalogo from './componentes/paginas/Catalogo.tsx';
import Nosotros from './componentes/paginas/Nosotros.tsx';
import Noticias from './componentes/paginas/Noticias.tsx';
import Contactanos from './componentes/paginas/Contactanos.tsx';
import DetalleProducto from "./componentes/paginas/DetalleProducto";

function App(){
  return(
    <>
      <Navbar />
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
          path = "/noticias"
          element = {<Noticias />} 
        />
        <Route
          path = "/contactanos"
          element = {<Contactanos />} 
        />
        <Route
          path="/producto/:id"
          element={<DetalleProducto />}
        />

      </Routes>
    </>
  )
}
export default App;