import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import type { NavigateFunction } from 'react-router-dom';
import api from '../services/api';

export type UserRole = 'admin' | 'capacitador' | 'cliente';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// ✅ Creamos el contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Hook para acceder al contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// ✅ Hook para construir el valor del contexto
export const useAuthContextValue = (
  navigate: NavigateFunction
): AuthContextType => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await api.get('/auth/me');

      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      localStorage.removeItem('token');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('token', token);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      const roleRoutes: Record<UserRole, string> = {
        admin: '/admin',
        capacitador: '/capacitador',
        cliente: '/cliente',
      };

      // ✅ Solución segura para acceso a propiedad por tipo:
      navigate(roleRoutes[user.role as UserRole] ?? '/');
    } catch (error) {
      console.error('Error en login:', error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
};
