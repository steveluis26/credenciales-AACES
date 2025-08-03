// src/pages/public/Home.tsx
import { Buscador } from '../../components/credenciales/Buscador';
import { CredencialCard } from '../../components/credenciales/CredencialCard';

// Cambia esto:
// export const Home = () => {

// Por esto:
export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
  };

  return (
    <div className="home-page">
      <h1>Consulta tu Credencial</h1>
      <Buscador onSearch={handleSearch} placeholder="Buscar por CLABE o Nombre..." />
      <CredencialCard 
        nombre="Juan Pérez"
        clabe="123456789"
        vencimiento="2025-12-31"
      />
    </div>
  );
}