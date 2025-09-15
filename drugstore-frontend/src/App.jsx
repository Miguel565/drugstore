import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProveedorList from './pages/ProveedorList.jsx'
import ProductoList from './pages/ProductoList.jsx'
import Proveedor from './pages/Proveedor.jsx'
import Producto from './pages/Producto.jsx'
import RegistroList from './pages/RegistroList'
import Registro from './pages/Registro'
import 'bootstrap/dist/css/bootstrap.min.css'
//import './App.css'

function App() {

  return (
    <div className="App">
      <h1>Drugstore Management System</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/proveedores" element={<ProveedorList />} />
        <Route path="/productos" element={<ProductoList />} />
        <Route path="/registros" element={<RegistroList />} />
        <Route path="/proveedores/:id" element={<Proveedor />} />
        <Route path="/productos/:id" element={<Producto />} />
        <Route path="/registros/:id" element={<Registro />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
