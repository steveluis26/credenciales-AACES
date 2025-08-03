import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';

// Componentes públicos
const Home = lazy(() => import('./pages/public/Home'));
const BuscarCredencial = lazy(() => import('./pages/public/BuscarCredencial'));
const VerCredencial = lazy(() => import('./pages/public/VerCredencial'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Componentes de admin
const AdminClientes = lazy(() => import('./pages/admin/dashboard/Clientes'));
const AdminCursos = lazy(() => import('./pages/admin/dashboard/Cursos'));
const AdminParticipantes = lazy(() => import('./pages/admin/dashboard/Participantes'));
const AdminMetricas = lazy(() => import('./pages/admin/dashboard/Metricas'));
const AdminUsuarios = lazy(() => import('./pages/admin/config/Usuarios'));

// Componentes de capacitador
const CapacitadorMisCursos = lazy(() => import('./pages/capacitador/MisCursos'));
const CapacitadorNuevoCurso = lazy(() => import('./pages/capacitador/NuevoCurso'));
const CapacitadorMisParticipantes = lazy(() => import('./pages/capacitador/MisParticipantes'));

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="app-container">
            <Navbar />
            
            <div className="content-wrapper">
              <Sidebar visible={true} onHide={() => {}} />

              <main className="main-content">
                <Suspense fallback={
                  <div className="flex justify-center items-center" style={{ height: '50vh' }}>
                    <ProgressSpinner />
                  </div>
                }>
                  <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/buscar-credencial" element={<BuscarCredencial />} />
                    <Route path="/credencial/:id" element={<VerCredencial />} />

                    {/* Rutas protegidas para admin */}
                    <Route path="/admin/clientes" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminClientes />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/cursos" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminCursos />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/participantes" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminParticipantes />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/metricas" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminMetricas />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/config/usuarios" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminUsuarios />
                      </ProtectedRoute>
                    } />

                    {/* Rutas protegidas para capacitador */}
                    <Route path="/capacitador/mis-cursos" element={
                      <ProtectedRoute allowedRoles={['capacitador']}>
                        <CapacitadorMisCursos />
                      </ProtectedRoute>
                    } />
                    <Route path="/capacitador/nuevo-curso" element={
                      <ProtectedRoute allowedRoles={['capacitador']}>
                        <CapacitadorNuevoCurso />
                      </ProtectedRoute>
                    } />
                    <Route path="/capacitador/mis-participantes" element={
                      <ProtectedRoute allowedRoles={['capacitador']}>
                        <CapacitadorMisParticipantes />
                      </ProtectedRoute>
                    } />

                    {/* Redirecciones */}
                    <Route path="/admin" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminClientes />
                      </ProtectedRoute>
                    } />
                    <Route path="/capacitador" element={
                      <ProtectedRoute allowedRoles={['capacitador']}>
                        <CapacitadorMisCursos />
                      </ProtectedRoute>
                    } />

                    {/* Ruta para páginas no encontradas */}
                    <Route path="*" element={<Home />} />
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