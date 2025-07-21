import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaQrcode } from 'react-icons/fa';

function App() {
  // Componentes directamente en App.tsx (luego los moveremos a archivos separados)
  const HomePage = () => (
    <Container className="text-center my-5">
      <h1 className="mb-4">Sistema de Credenciales de Seguridad</h1>
      
      <div className="d-flex justify-content-center gap-4 flex-wrap">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <FaSearch size={40} className="mb-3 text-primary" />
            <Card.Title>Validar Credencial</Card.Title>
            <Button variant="primary" className="w-100">Buscar</Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <FaQrcode size={40} className="mb-3 text-success" />
            <Card.Title>Escanear QR</Card.Title>
            <Button variant="success" className="w-100">Escanear</Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );

  const LoginPage = () => (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" required />
            </div>
            <Button type="submit" variant="primary" className="w-100">Ingresar</Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Seguridad Industrial</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido Principal */}
      <main className="py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <Container>
          <p className="mb-0">© {new Date().getFullYear()} Sistema de Credenciales</p>
        </Container>
      </footer>
    </BrowserRouter>
  );
}

export default App;