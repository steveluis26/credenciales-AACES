import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarCustom() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/src/assets/logo.png" // Reemplaza con tu logo
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          Credenciales
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <NavDropdown title="Admin" id="admin-dropdown">
              <NavDropdown.Item as={Link} to="/admin">Dashboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/cursos">Cursos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}