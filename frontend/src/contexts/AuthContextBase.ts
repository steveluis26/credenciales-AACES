import { createContext } from 'react';

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'capacitador';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);