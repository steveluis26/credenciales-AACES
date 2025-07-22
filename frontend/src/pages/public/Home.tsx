import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Home = () => {
  return (
    <Card title="Bienvenido al Sistema">
      <p className="m-0">Selecciona una opción del menú para comenzar.</p>
      <Button label="Validar" icon="pi pi-check" className="mt-3" />
    </Card>
  );
};

export default Home;
