import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

function App() {
  // Menú principal
  const menuItems = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      url: '/',
      className: 'p-menuitem-active' // Estilo para ítem activo
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
          <Route path="/" element={
            <div className="card">
              <h2>Bienvenido al Sistema</h2>
              <p>Seleccione una opción del menú</p>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;