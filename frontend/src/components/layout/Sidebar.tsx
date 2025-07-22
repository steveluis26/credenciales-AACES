import { Sidebar } from 'primereact/sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const AppSidebar = ({ visible, onHide }: { visible: boolean, onHide: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adminItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      command: () => navigate('/admin')
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      command: () => navigate('/admin/clientes')
    },
    {
      label: 'Cursos',
      icon: 'pi pi-book',
      command: () => navigate('/admin/cursos')
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => navigate('/admin/config')
    }
  ];

  const capacitadorItems = [
    {
      label: 'Mis Cursos',
      icon: 'pi pi-book',
      command: () => navigate('/capacitador/cursos')
    },
    {
      label: 'Participantes',
      icon: 'pi pi-id-card',
      command: () => navigate('/capacitador/participantes')
    }
  ];

  const commonItems = [
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        logout();
        navigate('/login');
      }
    }
  ];

  const items = user?.rol === 'admin' 
    ? [...adminItems, ...commonItems] 
    : [...capacitadorItems, ...commonItems];

  return (
    <Sidebar visible={visible} onHide={onHide} className="p-sidebar-md">
      <div className="flex flex-column h-full">
        <div className="mb-4 p-3 border-bottom-1 surface-border">
          <h3 className="m-0">Menú Principal</h3>
        </div>
        <Menubar model={items} className="p-0 border-none" />
      </div>
    </Sidebar>
  );
};

export default AppSidebar;