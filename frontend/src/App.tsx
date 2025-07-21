import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function App() {
  return (
    <BrowserRouter>
      {/* Menú superior */}
      <Navbar />

      {/* Contenido principal */}
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <Card title="Bienvenido al Sistema" className="mb-3">
                <p className="m-0">
                  Seleccione una opción del menú para comenzar a trabajar con las credenciales.
                </p>
                <Button
                  label="Validar Credencial"
                  icon="pi pi-search"
                  className="mt-3"
                />
              </Card>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
