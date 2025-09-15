import { Link } from 'react-router-dom'

const NavBar = () => {
	 return (
		 <nav>
			 <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
				 <li style={{ marginRight: '1rem' }}>
					 <Link to="/">Dashboard</Link>
				 </li>
				 <li style={{ marginRight: '1rem' }}>
					 <Link to="/proveedores">Proveedores</Link>
				 </li>
				 <li style={{ marginRight: '1rem' }}>
					 <Link to="/productos">Inventario</Link>
				 </li>
				 <li>
					 <Link to="/registros">Registros</Link>
				 </li>
			 </ul>
		 </nav>
	 );
}

export default NavBar