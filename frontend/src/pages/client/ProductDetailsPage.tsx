import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '@/services/apiService';
import { Product } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      const data = await productService.getById(productId);
      setProduct(data);
    } catch (error) {
      toast.error('Erro ao carregar detalhes do produto');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
        if(product.estoque <= 0) {
            toast.error('Produto sem estoque!');
            return;
        }
      addToCart(product);
      toast.success(`${product.nome} adicionado ao carrinho`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Loja
      </Button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Coluna da Imagem */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 flex items-center justify-center border shadow-sm sticky top-24">
          <img 
            src={product.imagemUrl} 
            alt={product.nome} 
            className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Coluna de Detalhes */}
        <div className="space-y-8">
          <div>
            <Badge className="mb-3 text-sm px-3 py-1">{product.categoria}</Badge>
            <h1 className="text-4xl font-bold leading-tight mb-2">{product.nome}</h1>
            {product.estoque > 0 ? (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                {product.estoque} unidades em estoque
              </span>
            ) : (
              <span className="text-sm text-destructive font-medium">Esgotado</span>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
            <p>{product.descricao}</p>
          </div>

          <div className="border-t border-b py-6 space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Preço à vista:</span>
              <span className="text-5xl font-bold text-primary">
                R$ {product.preco.toFixed(2)}
              </span>
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg h-14 shadow-lg shadow-primary/20"
              onClick={handleAddToCart}
              disabled={product.estoque <= 0}
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              {product.estoque > 0 ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
            </Button>
          </div>

          {/* Informações extras simuladas para preencher layout */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>🚚</span> Entrega para todo o Brasil
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span> Garantia de 12 meses
            </div>
            <div className="flex items-center gap-2">
              <span>💳</span> Parcelamento em até 12x
            </div>
            <div className="flex items-center gap-2">
              <span>↩️</span> 7 dias para devolução
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}