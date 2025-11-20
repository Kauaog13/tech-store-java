import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/models';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importar Link

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    // Evita que o clique no botão abra a página de detalhes
    e.preventDefault();
    e.stopPropagation();

    if (product.estoque <= 0) {
      toast.error('Produto sem estoque');
      return;
    }
    addToCart(product);
    toast.success(`${product.nome} adicionado ao carrinho`);
  };

  return (
    <Link to={`/produto/${product.id}`} className="block h-full">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group border-transparent hover:border-border">
        <div className="aspect-square overflow-hidden bg-white dark:bg-slate-900 p-4 flex items-center justify-center relative">
          <img
            src={product.imagemUrl}
            alt={product.nome}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {product.estoque <= 0 && (
             <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full font-bold text-sm">
                    ESGOTADO
                </span>
             </div>
          )}
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
            {product.categoria}
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.nome}
          </h3>
          <div className="mt-auto pt-2">
             <p className="text-2xl font-bold text-primary">
                R$ {product.preco.toFixed(2)}
             </p>
             <p className="text-xs text-muted-foreground mt-1">
               {product.estoque > 0 ? `${product.estoque} unidades` : 'Indisponível'}
             </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={product.estoque <= 0}
            className="w-full font-semibold"
            variant={product.estoque > 0 ? "default" : "secondary"}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}