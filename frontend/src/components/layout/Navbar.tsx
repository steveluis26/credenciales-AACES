import { useTheme } from '@/hooks/useTheme';
import { Button } from 'primereact/button';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex justify-content-between align-items-center p-4">
      <h1>Mi Aplicación</h1>
      <Button
        icon={`pi pi-${theme === 'lara-light-blue' ? 'moon' : 'sun'}`}
        onClick={toggleTheme}
        className="p-button-rounded p-button-text"
        tooltip={`Cambiar a tema ${theme === 'lara-light-blue' ? 'oscuro' : 'claro'}`}
        aria-label="Toggle theme"
      />
    </div>
  );
};