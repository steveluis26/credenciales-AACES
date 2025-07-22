// src/components/credenciales/CredencialCard.tsx
import { QRGenerator } from './QRGenerator'; // Importación relativa correcta

type CredencialCardProps = {
  nombre: string;
  clabe: string;
  vencimiento: string;
};

export const CredencialCard = ({
  nombre,
  clabe,
  vencimiento,
}: CredencialCardProps) => {
  return (
    <div className="credencial-card">
      <h3>{nombre}</h3>
      <p><strong>CLABE:</strong> {clabe}</p>
      <p><strong>Vencimiento:</strong> {new Date(vencimiento).toLocaleDateString()}</p>
      <div className="qr-container">
        <QRGenerator /> {/* Uso sin props */}
      </div>
    </div>
  );
};