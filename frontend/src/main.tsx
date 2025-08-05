import { useEffect, useState } from 'react';

type Theme = 'lara-light-blue' | 'lara-dark-blue';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'lara-light-blue';
  });

  useEffect(() => {
    // 1. Eliminar el link del tema anterior si existe
    const oldLink = document.getElementById('theme-css');
    if (oldLink) document.head.removeChild(oldLink);

    // 2. Crear nuevo link para el tema actual
    const link = document.createElement('link');
    link.id = 'theme-css';
    link.rel = 'stylesheet';
    link.href = `/src/assets/styles/theme/${theme}/theme.css`;
    document.head.appendChild(link);

    // 3. Guardar preferencia
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'lara-light-blue' ? 'lara-dark-blue' : 'lara-light-blue');
  };

  return { theme, toggleTheme };
};