import { Card } from 'primereact/card';
import { Navbar } from '@/components/layout/Navbar';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4">
        <Card title="Contenido">
          <p>Texto adaptado al tema activo</p>
        </Card>
      </div>
    </div>
  );
}