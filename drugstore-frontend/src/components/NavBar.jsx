import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from 'react-router-dom'

const NavBar = () => {

	return (
		<Navbar bg="light" expand="lg" >
			<Container>
				<Navbar.Brand as={Link} to="/"></Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar" className="justify-content-center">
					<Nav>
						<Nav.Link as={Link} to="/">Dashboard</Nav.Link>
						<Nav.Link as={Link} to="/proveedores">Proveedores</Nav.Link>
						<Nav.Link as={Link} to="/productos">Inventario</Nav.Link>
						<Nav.Link as={Link} to="/registros">Registros</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	);
}

export default NavBar