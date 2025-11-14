import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/client/HomePage';
import CartPage from '@/pages/client/CartPage';
import ProfilePage from '@/pages/client/ProfilePage';
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminEstoquePage from '@/pages/admin/AdminEstoquePage';
import AdminVendasPage from '@/pages/admin/AdminVendasPage';
import ClientLayout from '@/components/layout/ClientLayout';
import AdminLayout from '@/components/layout/AdminLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="carrinho" element={<CartPage />} />
          <Route path="perfil" element={<ProfilePage />} />
        </Route>

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
      </Routes>
    </BrowserRouter>
  );
}
