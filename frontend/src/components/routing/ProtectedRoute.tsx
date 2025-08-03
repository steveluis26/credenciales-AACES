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
  const auth = useAuth();
  const location = useLocation();

  if (!auth.initialized || auth.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const publicRoutes = ['/', '/login', '/forgot-password', '/buscar-credencial'];
  const isCredencialRoute = location.pathname.startsWith('/credencial/');

  if (publicRoutes.includes(location.pathname) || isCredencialRoute) {
    return <>{children}</>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to={redirectUnauthenticatedTo} replace />;
  }

  if (checkAuthenticationOnly) {
    return <>{children}</>;
  }

  if (allowedRoles.length > 0 && (!auth.user || !allowedRoles.includes(auth.user.rol))) {
    return <Navigate to={redirectUnauthorizedTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;