import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeProveedores } from '../reducers/proveedorReducer'

const NavBar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeProveedores())
    }, [dispatch])

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