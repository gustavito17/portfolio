import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Inicio from './pages/inicio/Inicio'
import SobreMi from './pages/sobre-mi/SobreMi'
import MisProyectos from './pages/proyectos/MisProyectos'
import FinanzasDetalles from './pages/proyectos/FinanzasDetalles' // Importar el nuevo componente
import Concesionaria from './pages/proyectos/Concesionaria'
import ControlStock from './pages/proyectos/controlstock'
import Habilidades from './pages/habilidades/Habilidades';
import Educacion from './pages/educacion/Educacion';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/habilidades" element={<Habilidades />} />
        <Route path="/proyectos" element={<MisProyectos />} />
        {/* Ruta para el detalle del proyecto de finanzas */}
        <Route path="/proyectos/finanzas" element={<FinanzasDetalles />} />
        <Route path="/proyectos/concesionaria" element={<Concesionaria />} />
        <Route path="/proyectos/controlstock" element={<ControlStock />} />
        <Route path="/educacion" element={<Educacion />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>,
)