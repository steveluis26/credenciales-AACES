import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface ClienteFormProps {
  onSubmit: (data: { nombre: string; email: string; password?: string }) => void;
}

const ClienteForm = ({ onSubmit }: ClienteFormProps) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nombre, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="p-fluid">
      <div className="p-field">
        <label htmlFor="nombre">Nombre</label>
        <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="p-field">
        <label htmlFor="email">Email</label>
        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="p-field">
        <label htmlFor="password">Contraseña</label>
        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button label="Guardar" type="submit" />
    </form>
  );
};

export default ClienteForm;
