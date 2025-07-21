import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function App() {
  // Menú principal
  const menuItems = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      url: '/',
      className: 'p-menuitem-active'
    },
    {
      label: 'Credenciales',
      icon: 'pi pi-id-card',
      items: [
        { label: 'Validar', icon: 'pi pi-search', url: '/validar' },
        { label: 'Generar', icon: 'pi pi-qrcode', url: '/generar' }
      ]
    }
  ];

  return (
    <BrowserRouter>
      {/* Menú superior */}
      <Menubar
        model={menuItems}
        start={<span className="text-xl font-bold">Sistema Credenciales</span>}
        className="shadow-3 mb-3"
      />

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
