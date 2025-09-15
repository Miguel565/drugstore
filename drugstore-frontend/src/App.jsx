import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
//import './App.css'

function App() {

  return (
    <div className="App">
      <h1>Drugstore Management System</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/proveedores" element={<div>Proveedores</div>} />
        <Route path="/productos" element={<div>Inventario</div>} />
        <Route path="/registros" element={<div>Registros</div>} />
      </Routes>
    </div>
  )
}

export default App
