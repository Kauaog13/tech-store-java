import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { HomeBanner } from '@/components/HomeBanner';
import { Product } from '@/types/models';
import { productService } from '@/services/apiService';
import { toast } from 'sonner';
import { 
  Loader2, 
  ShieldCheck, 
  Truck, 
  Bitcoin, 
  Headphones 
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="fade-in relative min-h-screen w-full overflow-hidden">
      
      {/* --- EFEITOS DE FUNDO --- */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* --- CONTEÚDO DA PÁGINA --- */}
      <div className="relative z-10 pb-16">
        <HomeBanner />

        {/* --- SESSÃO: GARANTIAS --- */}
        <section className="my-16 px-4 md:px-0">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-2 text-foreground">Por que comprar na TechStore?</h2>
                <p className="text-muted-foreground">Segurança, garantia e tecnologia de ponta a ponta</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Garantia Total</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Todos os produtos acompanham nota fiscal e garantia de até 12 meses diretamente conosco.
                    </p>
                </div>

                <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border-2 border-orange-500/20 bg-orange-500/5 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-300 group">
                    <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full border border-orange-200 dark:border-orange-800">
                            Exclusivo
                        </span>
                    </div>
                    <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Bitcoin className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Pagamento Crypto</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        A <strong>1ª loja de Brasília</strong> a aceitar Bitcoin, Ethereum e USDT. Pague com o futuro.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                        <Truck className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Entrega Flash</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Receba seus componentes com rapidez e segurança em todo o Distrito Federal e região.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-4 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-4">
                        <Headphones className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Suporte Gamer</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Equipe técnica especializada pronta para tirar dúvidas sobre compatibilidade e setups.
                    </p>
                </div>
            </div>
        </section>

        {/* --- ÂNCORA PARA PRODUTOS --- */}
        {/* id="produtos" permite que o botão do banner role até aqui */}
        {/* scroll-mt-24 garante que o título não fique escondido pelo header fixo */}
        <div id="produtos" className="mb-8 mt-8 scroll-mt-24">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Produtos em Destaque</h1>
          <p className="text-muted-foreground">
            Explore nossa seleção de produtos de tecnologia de alta performance
          </p>
        </div>

        {/* Grid de Produtos */}
        {products.length === 0 ? (
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-dashed">
            <p className="text-muted-foreground">Nenhum produto disponível no momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}