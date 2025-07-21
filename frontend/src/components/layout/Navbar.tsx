import { Menubar } from 'primereact/menubar';

export default function Navbar() {
  const items = [
    { 
      label: 'Inicio',
      icon: 'pi pi-home',
      url: '/'
    },
    {
      label: 'Admin',
      icon: 'pi pi-cog',
      items: [
        { label: 'Cursos', icon: 'pi pi-book', url: '/admin/cursos' },
        { label: 'Participantes', icon: 'pi pi-users', url: '/admin/participantes' }
      ]
    }
  ];

  return <Menubar model={items} />;
}