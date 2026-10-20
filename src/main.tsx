import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import { inicializarUsuariosDemo } from "./componentes/servicios/usuariosService";

// Crear cuentas de prueba
inicializarUsuariosDemo();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
