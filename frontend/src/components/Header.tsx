import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

// --- IMPORTAÇÃO DAS LOGOS ---
import logoWhite from '@/icons/logo-icon-white.ico'; // Logo Branca (para fundo escuro)
import logoBlack from '@/icons/logo-icon-black.ico'; // Logo Preta (para fundo claro)

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Adicionei 'group' aqui para coordenar a animação da logo com o texto */}
        <Link to="/" className="flex items-center space-x-2 group">
          
          {/* --- ANIMAÇÃO DA LOGO --- */}
          {/* transition-all duration-300 ease-out: Suaviza o movimento
              hover:scale-110: Aumenta 10%
              hover:-rotate-6: Inclina levemente para a esquerda (divertido)
              hover:drop-shadow-[...]: Cria um brilho ciano atrás da logo transparente (tech) 
          */}
          <div className="relative h-10 w-10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"> 
            
            {/* 1. Logo Preta (Modo Claro) */}
            <img 
              src={logoBlack} 
              alt="TechStore Logo" 
              className="h-10 w-10 object-contain absolute inset-0 transition-opacity duration-300 opacity-100 dark:opacity-0" 
            />
            
            {/* 2. Logo Branca (Modo Escuro) */}
            <img 
              src={logoWhite} 
              alt="TechStore Logo" 
              className="h-10 w-10 object-contain absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100" 
            />
          </div>
          
          {/* Texto também reage ao hover mudando para a cor primária (Ciano/Neon) */}
          <span className="text-xl font-bold hidden md:block transition-colors duration-300 group-hover:text-primary tracking-tight">
            TechStore
          </span>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Botão de Tema */}
          <ModeToggle />

          <Link to="/carrinho">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.nome}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/perfil" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}