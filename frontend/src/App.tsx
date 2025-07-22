import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import { ProgressSpinner } from 'primereact/progressspinner';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';

const Home = lazy(() => import('./pages/public/Home'));
const BuscarCredencial = lazy(() => import('./pages/public/BuscarCredencial'));
const VerCredencial = lazy(() => import('./pages/public/VerCredencial'));

const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

const Clientes = lazy(() => import('./pages/admin/dashboard/Clientes'));
const Cursos = lazy(() => import('./pages/admin/dashboard/Cursos'));
const Participantes = lazy(() => import('./pages/admin/dashboard/Participantes'));
const Metricas = lazy(() => import('./pages/admin/dashboard/Metricas'));
const Usuarios = lazy(() => import('./pages/admin/config/Usuarios'));

const MisCursos = lazy(() => import('./pages/capacitador/MisCursos'));
const NuevoCurso = lazy(() => import('./pages/capacitador/NuevoCurso'));
const MisParticipantes = lazy(() => import('./pages/capacitador/MisParticipantes'));

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="app-container">
            <Navbar />

            <div className="content-wrapper">
              <ProtectedRoute>
                <Sidebar visible={true} onHide={() => {}} />
              </ProtectedRoute>

              <main className="main-content">
                <Suspense
                  fallback={
                    <div
                      className="flex justify-content-center align-items-center"
                      style={{ height: '50vh' }}
                    >
                      <ProgressSpinner />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/buscar-credencial" element={<BuscarCredencial />} />
                    <Route path="/credencial/:id" element={<VerCredencial />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route
                      path="/admin/clientes"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Clientes />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/cursos"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Cursos />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/participantes"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Participantes />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/metricas"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Metricas />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/config/usuarios"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Usuarios />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/capacitador/mis-cursos"
                      element={
                        <ProtectedRoute allowedRoles={['capacitador']}>
                          <MisCursos />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/capacitador/nuevo-curso"
                      element={
                        <ProtectedRoute allowedRoles={['capacitador']}>
                          <NuevoCurso />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/capacitador/mis-participantes"
                      element={
                        <ProtectedRoute allowedRoles={['capacitador']}>
                          <MisParticipantes />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="/admin" element={<Navigate to="/admin/clientes" replace />} />
                    <Route path="/capacitador" element={<Navigate to="/capacitador/mis-cursos" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
            </div>

            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
