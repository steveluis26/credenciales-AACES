// src/pages/public/Home.tsx
import { Buscador } from '../../components/credenciales/Buscador';
import { CredencialCard } from '../../components/credenciales/CredencialCard';

export const Home = () => {
  const handleSearch = (query: string) => {
    // Lógica de búsqueda (conectar con services/api.ts luego)
    console.log("Buscando:", query);
  };

  return (
    <div className="home-page">
      <h1>Consulta tu Credencial</h1>
      <Buscador onSearch={handleSearch} placeholder="Buscar por CLABE o Nombre..." />
      {/* Ejemplo de resultado */}
      <CredencialCard 
        nombre="Juan Pérez"
        clabe="123456789"
        vencimiento="2025-12-31"
        
      />
    </div>
  );
};