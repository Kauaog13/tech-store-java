import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { authService } from '@/services/apiService';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';

// --- IMPORTAÇÃO DAS LOGOS ---
import logoWhite from '@/icons/logo-icon-white.ico';
import logoBlack from '@/icons/logo-icon-black.ico';

// Schema de validação
const registerSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não conferem",
  path: ["confirmarSenha"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      // O campo endereço é obrigatório no backend, enviamos um valor padrão
      // O usuário pode alterar depois no Perfil
      await authService.register({
          nome: data.nome,
          email: data.email,
          endereco: "Endereço não informado", 
          senha: data.senha
      });
      toast.success('Conta criada com sucesso! Faça login.');
      navigate('/login');
    } catch (error: any) {
      // CORREÇÃO: Tratamento robusto de erro (captura 'erro' ou 'message' do backend)
      const errorMessage = error.response?.data?.erro || error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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

      {/* --- CARD DE REGISTRO TRANSLÚCIDO --- */}
      <Card className="w-full max-w-md shadow-2xl relative z-10 bg-white/30 dark:bg-slate-950/40 backdrop-blur-md border-white/20 dark:border-slate-800/50">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          
          {/* --- LOGO --- */}
          <div className="relative h-16 w-16 mb-4 hover:scale-110 transition-transform duration-300">
             {/* Logo Preta (Light Mode) */}
             <img src={logoBlack} alt="Logo" className="h-full w-full object-contain absolute inset-0 transition-opacity opacity-100 dark:opacity-0" />
             {/* Logo Branca (Dark Mode) */}
             <img src={logoWhite} alt="Logo" className="h-full w-full object-contain absolute inset-0 transition-opacity opacity-0 dark:opacity-100" />
          </div>

          <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
          <CardDescription>
            Junte-se à TechStore para começar a comprar
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Mínimo 6 caracteres" {...field} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmarSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Repita a senha" {...field} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-semibold text-md mt-2" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar Conta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm bg-muted/30 dark:bg-muted/10 rounded-b-xl pt-4 pb-6 backdrop-blur-sm">
          <div>
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}