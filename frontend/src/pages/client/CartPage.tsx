import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore'; // Para pegar o endereço padrão
import { orderService } from '@/services/apiService';
import { toast } from 'sonner';
import { Trash2, ShoppingBag, Minus, Plus, MapPin } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalValue } = useCartStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(''); // Estado para o endereço
  const navigate = useNavigate();

  // Abre o modal e preenche o endereço com o do cadastro
  const handleInitiateCheckout = () => {
    if (items.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }
    setDeliveryAddress(user?.endereco || '');
    setIsCheckoutOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!deliveryAddress.trim()) {
      toast.error('Por favor, informe um endereço de entrega.');
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        itens: items.map((item) => ({
          produtoId: item.product.id,
          quantidade: item.quantidade,
        })),
        enderecoEntrega: deliveryAddress, // Envia o endereço editado/confirmado
      };

      await orderService.create(orderData);
      clearCart();
      setIsCheckoutOpen(false);
      toast.success('Pedido realizado com sucesso!');
      navigate('/'); // Ou redirecionar para uma página de "Meus Pedidos" se existisse
    } catch (error) {
      toast.error('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(productId, quantity);
    }
  };

  const incrementQuantity = (productId: number, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const totalValue = getTotalValue();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
        <p className="text-muted-foreground mb-6">
          Adicione produtos ao carrinho para continuar
        </p>
        <Button onClick={() => navigate('/')}>Ver Produtos</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de Produtos (Esquerda) */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0">
                    <img
                      src={item.product.imagemUrl}
                      alt={item.product.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{item.product.nome}</h3>
                    <p className="text-lg font-bold text-primary">
                      R$ {item.product.preco.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => decrementQuantity(item.product.id, item.quantidade)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantidade}
                        onChange={(e) =>
                          handleQuantityChange(item.product.id, e.target.value)
                        }
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => incrementQuantity(item.product.id, item.quantidade)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo do Pedido (Direita) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.nome} x {item.quantidade}
                  </span>
                  <span className="font-medium">
                    R$ {(item.product.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleInitiateCheckout} // Abre o modal
                className="w-full"
                size="lg"
              >
                Continuar para Entrega
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Modal de Confirmação e Endereço */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
            <DialogDescription>
              Confirme o endereço de entrega para este pedido.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Endereço de Entrega
              </Label>
              <Input
                id="address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Rua, número, bairro, cidade..."
              />
              <p className="text-xs text-muted-foreground">
                Este endereço será usado apenas para este pedido e não altera seu perfil.
              </p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between font-semibold">
                <span>Total a Pagar:</span>
                <span>R$ {totalValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmPurchase} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}