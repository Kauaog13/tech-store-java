import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <AppRoutes />
      {/* A propriedade duration={5000} define o tempo para 5 segundos (5000ms) */}
      {/* A propriedade closeButton adiciona um botão de fechar manual também */}
      <Toaster 
        position="top-right" 
        richColors 
        duration={5000} 
        closeButton 
      />
    </>
  );
}

export default App;