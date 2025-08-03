import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as authLogin } from '../services/auth';
import { AuthContext } from './AuthContextBase';
import type { AuthContextType, User } from './AuthContextBase';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setInitialized(true);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authLogin(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    initialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};