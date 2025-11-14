import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { Store, LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/admin/estoque', icon: Package, label: 'Estoque' },
    { to: '/admin/vendas', icon: ShoppingBag, label: 'Vendas' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex h-screen">
        <aside className="w-64 border-r bg-background flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">TechStore</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={isActive(item.to, item.exact) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive(item.to, item.exact) && 'bg-secondary'
                  )}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="mb-3 px-2">
              <p className="text-sm font-medium">{user?.nome}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
