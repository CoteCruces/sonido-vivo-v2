import { Route, Routes } from 'react-router-dom';
import Navbar from './componentes/organismos/Navbar.tsx';
import Inicio from './componentes/paginas/Inicio.tsx';
import Productos from './componentes/paginas/Productos.tsx';

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
          path = "/productos"
          element = {<Productos />} 
        />

      </Routes>
    </>
  )
}
export default App;