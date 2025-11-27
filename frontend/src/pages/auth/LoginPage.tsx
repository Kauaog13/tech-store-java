import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';

// --- IMPORTAÇÃO DAS LOGOS ---
import logoWhite from '@/icons/logo-icon-white.ico';
import logoBlack from '@/icons/logo-icon-black.ico';

// Schema de validação (mantido)
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirecionar para a página que o usuário tentou acessar ou para a home
  const from = location.state?.from?.pathname || '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      await login(data.email, data.senha);
      toast.success('Login realizado com sucesso!');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // Container principal com fundo e overflow hidden
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">

       {/* --- EFEITOS DE FUNDO (Blobs Animados) --- */}
       <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-purple-800 dark:mix-blend-screen dark:opacity-30"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-blue-800 dark:mix-blend-screen dark:opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-pink-800 dark:mix-blend-screen dark:opacity-30" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-cyan-800 dark:mix-blend-screen dark:opacity-30" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="absolute top-4 left-4 z-20">
         <Button variant="ghost" asChild className='hover:bg-white/20 dark:hover:bg-black/20'>
            <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar para a loja
            </Link>
         </Button>
      </div>

      {/* --- CARD DE LOGIN TRANSLÚCIDO --- */}
      {/* z-10 para ficar sobre os blobs.
          bg-white/30 e backdrop-blur-md criam o efeito de vidro. */}
      <Card className="w-full max-w-md shadow-2xl relative z-10 bg-white/30 dark:bg-slate-950/40 backdrop-blur-md border-white/20 dark:border-slate-800/50">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          
          {/* --- SUBSTITUIÇÃO DO ÍCONE PELA LOGO --- */}
          <div className="relative h-16 w-16 mb-4 hover:scale-110 transition-transform duration-300">
             {/* Logo Preta (Light Mode) */}
             <img src={logoBlack} alt="Logo" className="h-full w-full object-contain absolute inset-0 transition-opacity opacity-100 dark:opacity-0" />
             {/* Logo Branca (Dark Mode) */}
             <img src={logoWhite} alt="Logo" className="h-full w-full object-contain absolute inset-0 transition-opacity opacity-0 dark:opacity-100" />
          </div>

          <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
          <CardDescription>
            Entre com suas credenciais para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      {/* Inputs também levemente translúcidos */}
                      <Input placeholder="seu@email.com" {...field} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel>Senha</FormLabel>
                        <Link to="/esqueceu-senha" className="text-xs text-primary hover:underline">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-semibold text-md" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar na TechStore
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm bg-muted/30 dark:bg-muted/10 rounded-b-xl pt-4 pb-6 backdrop-blur-sm">
          <div>
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Cadastre-se gratuitamente
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}