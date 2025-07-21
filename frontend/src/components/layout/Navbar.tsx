import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Al cargar, intenta recuperar preferencia de localStorage
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      enableDarkMode();
      setDarkMode(true);
    }
  }, []);

  const enableDarkMode = () => {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (!themeLink) return;

    themeLink.href =
      '/node_modules/primereact/resources/themes/vela-blue/theme.css';
  };

  const enableLightMode = () => {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (!themeLink) return;

    themeLink.href =
      '/node_modules/primereact/resources/themes/lara-light-blue/theme.css';
  };

  const toggleTheme = () => {
    if (darkMode) {
      enableLightMode();
      localStorage.setItem('darkMode', 'false');
    } else {
      enableDarkMode();
      localStorage.setItem('darkMode', 'true');
    }
    setDarkMode(!darkMode);
  };

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      url: '/',
    },
    {
      label: 'Admin',
      icon: 'pi pi-cog',
      items: [
        { label: 'Cursos', icon: 'pi pi-book', url: '/admin/cursos' },
        { label: 'Participantes', icon: 'pi pi-users', url: '/admin/participantes' },
      ],
    },
  ];

  return (
    <Menubar
      model={items}
      start={<span className="text-xl font-bold">Sistema Credenciales</span>}
      end={
        <Button
          label={darkMode ? 'Claro' : 'Oscuro'}
          icon={darkMode ? 'pi pi-sun' : 'pi pi-moon'}
          onClick={toggleTheme}
          className="p-button-text"
        />
      }
      className="shadow-3 mb-3"
    />
  );
}
