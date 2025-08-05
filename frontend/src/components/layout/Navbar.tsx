import { useTheme } from '@/hooks/useTheme';
import { Button } from 'primereact/button';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex justify-content-between p-4">
      <h1>Mi App</h1>
      <Button 
        icon={`pi pi-${theme.includes('dark') ? 'sun' : 'moon'}`}
        onClick={toggleTheme}
        className="p-button-rounded"
        tooltip={`Cambiar a tema ${theme.includes('dark') ? 'claro' : 'oscuro'}`}
      />
    </div>
  );
};