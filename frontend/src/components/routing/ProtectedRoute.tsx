import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'capacitador'>;
  children: ReactNode;
  redirectUnauthenticatedTo?: string;
  redirectUnauthorizedTo?: string;
  checkAuthenticationOnly?: boolean;
}

const ProtectedRoute = ({ 
  allowedRoles = [], 
  children, 
  redirectUnauthenticatedTo = '/login', 
  redirectUnauthorizedTo = '/',
  checkAuthenticationOnly = false
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // No renderizar nada mientras carga
  }

  // Rutas públicas (incluyendo /home)
  const publicRoutes = ['/', '/home', '/login', '/forgot-password', '/buscar-credencial'];
  const isPublicRoute = publicRoutes.includes(location.pathname) || 
                       location.pathname.startsWith('/credencial/');

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectUnauthenticatedTo} replace />;
  }

  if (checkAuthenticationOnly) {
    return <>{children}</>;
  }

  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.rol))) {
    return <Navigate to={redirectUnauthorizedTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;