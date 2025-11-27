import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      
      {/* --- GLOBAL AURORA BACKGROUND (Blobs Fixos) --- */}
      {/* Camada z-0 fixa no fundo, com opacidade ajustada para Light/Dark mode */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        
        {/* Blob 1: Roxo (Topo Esquerda) */}
        <div className="absolute top-0 -left-4 w-96 h-96 rounded-full blur-3xl animate-blob
            bg-purple-300 mix-blend-multiply opacity-70
            dark:bg-purple-800 dark:mix-blend-screen dark:opacity-30">
        </div>
        
        {/* Blob 2: Azul (Topo Direita) - Com delay na animação */}
        <div className="absolute top-0 -right-4 w-96 h-96 rounded-full blur-3xl animate-blob
            bg-blue-300 mix-blend-multiply opacity-70
            dark:bg-blue-800 dark:mix-blend-screen dark:opacity-30"
            style={{ animationDelay: '2s' }}>
        </div>
        
        {/* Blob 3: Rosa (Baixo Esquerda) */}
        <div className="absolute -bottom-8 left-20 w-96 h-96 rounded-full blur-3xl animate-blob
            bg-pink-300 mix-blend-multiply opacity-70
            dark:bg-pink-800 dark:mix-blend-screen dark:opacity-30"
            style={{ animationDelay: '4s' }}>
        </div>
        
        {/* Blob 4: Ciano (Centro Direita) */}
        <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full blur-3xl animate-blob
            bg-cyan-300 mix-blend-multiply opacity-70
            dark:bg-cyan-800 dark:mix-blend-screen dark:opacity-30"
            style={{ animationDelay: '6s' }}>
        </div>

        {/* Blob 5: Índigo (Centro/Baixo) */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 rounded-full blur-3xl animate-blob
            bg-indigo-300 mix-blend-multiply opacity-70
            dark:bg-indigo-800 dark:mix-blend-screen dark:opacity-30"
            style={{ animationDelay: '3s' }}>
        </div>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      {/* z-10 garante que o conteúdo fique sobre os blobs e interativo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header (Navegação) */}
        <Header />

        {/* Área Central (Páginas Renderizadas) */}
        <main className="container mx-auto px-4 py-8 flex-1">
          <Outlet />
        </main>

        {/* Rodapé */}
        <Footer />
      </div>
    </div>
  );
}