import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuth } from '../../hooks/useAuth';
import { Card } from 'primereact/card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Credenciales incorrectas. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen">
      <Card title="Iniciar Sesión" className="w-full md:w-4">
        {error && (
          <div className="p-message p-message-error mb-3">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="p-field mb-3">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div className="p-field mb-4">
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              className="w-full"
              required
            />
          </div>
          <Button
            label="Ingresar"
            type="submit"
            loading={loading}
            className="w-full"
          />
        </form>
        <div className="mt-3 text-center">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
