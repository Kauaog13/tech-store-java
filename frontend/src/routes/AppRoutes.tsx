import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

// Pages - Auth
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Pages - Client
import HomePage from '@/pages/client/HomePage';
import ProductDetailsPage from '@/pages/client/ProductDetailsPage';
import CartPage from '@/pages/client/CartPage';
import ProfilePage from '@/pages/client/ProfilePage';

// Pages - Admin
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminEstoquePage from '@/pages/admin/AdminEstoquePage';
import AdminVendasPage from '@/pages/admin/AdminVendasPage';

// Layouts
import ClientLayout from '@/components/layout/ClientLayout';
import AdminLayout from '@/components/layout/AdminLayout';

// Componente de Proteção para Clientes (Logado)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Componente de Proteção para Admin (Logado + Role ADMIN)
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ROTAS PÚBLICAS (SEM LAYOUT) --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- ROTAS DE CLIENTE (COM NAVBAR) --- */}
        <Route path="/" element={<ClientLayout />}>
          
          {/* Rotas Abertas */}
          <Route index element={<HomePage />} />
          <Route path="produto/:id" element={<ProductDetailsPage />} />

          {/* Rotas Protegidas (Exigem Login) */}
          <Route
            path="carrinho"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* --- ROTAS DE ADMINISTRADOR (COM SIDEBAR) --- */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="estoque" element={<AdminEstoquePage />} />
          <Route path="vendas" element={<AdminVendasPage />} />
        </Route>

        {/* Rota de "Catch-All" para 404 - Redireciona para a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}