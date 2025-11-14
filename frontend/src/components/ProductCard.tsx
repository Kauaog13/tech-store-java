import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/models';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (product.estoque <= 0) {
      toast.error('Produto sem estoque');
      return;
    }
    addToCart(product);
    toast.success(`${product.nome} adicionado ao carrinho`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={product.imagemUrl}
          alt={product.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.nome}</h3>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-primary">
            R$ {product.preco.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.estoque > 0 ? `${product.estoque} em estoque` : 'Sem estoque'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.estoque <= 0}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
