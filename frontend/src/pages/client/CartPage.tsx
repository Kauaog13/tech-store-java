import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { orderService } from '@/services/apiService';
import { toast } from 'sonner';
import { Order } from '@/types/models';
import { 
  Trash2, 
  ShoppingBag, 
  Minus, 
  Plus, 
  MapPin, 
  Bitcoin, 
  CreditCard, 
  QrCode, 
  Barcode,
  CheckCircle,
  Printer,
  Download,
  Store
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalValue } = useCartStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Controle dos Modais
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  
  // Dados do Pedido Confirmado (para exibir no comprovante)
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  
  const [addressForm, setAddressForm] = useState({
    cep: '',
    cidade: '',
    estado: '',
    rua: '',
    numero: '',
    referencia: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate();

  const handleInitiateCheckout = () => {
    if (items.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }
    
    let initialAddress = {
      cep: '',
      cidade: '',
      estado: '',
      rua: '',
      numero: '',
      referencia: ''
    };

    if (user?.endereco) {
      const fullAddr = user.endereco;
      // Parser simples para tentar preencher caso o user já tenha salvo
      if (fullAddr.includes('| CEP:')) {
        try {
          const [parteEndereco, parteCepRef] = fullAddr.split('| CEP:');
          const [ruaENumero, cidadeEEstado] = parteEndereco.split(' - ');
          const [rua, numero] = ruaENumero.split(', Nº ');
          
          let cidade = cidadeEEstado.trim();
          let estado = '';
          if (cidadeEEstado.includes('/')) {
             const parts = cidadeEEstado.split('/');
             cidade = parts[0].trim();
             estado = parts[1].trim();
          }

          let cep = parteCepRef.trim();
          let referencia = '';

          if (parteCepRef.includes('(')) {
             const cepSplit = parteCepRef.split('(');
             cep = cepSplit[0].trim();
             referencia = cepSplit[1].replace(')', '').trim();
          }

          initialAddress = {
            rua: rua.trim(),
            numero: numero ? numero.trim() : '',
            cidade: cidade,
            estado: estado,
            cep: cep,
            referencia: referencia
          };
        } catch (e) {
          initialAddress.rua = fullAddr;
        }
      } else {
        initialAddress.rua = fullAddr;
      }
    }
    
    setAddressForm(initialAddress);
    setPaymentMethod('');
    setIsCheckoutOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!addressForm.rua.trim() || !addressForm.numero.trim() || !addressForm.cidade.trim() || !addressForm.estado.trim()) {
      toast.error('Por favor, preencha os dados de endereço.');
      return;
    }

    if (!paymentMethod) {
      toast.error('Por favor, selecione uma forma de pagamento.');
      return;
    }

    setIsProcessing(true);
    try {
      const enderecoFormatado = `${addressForm.rua}, Nº ${addressForm.numero} - ${addressForm.cidade}/${addressForm.estado} | CEP: ${addressForm.cep} ${addressForm.referencia ? `(${addressForm.referencia})` : ''}`;

      const orderData = {
        itens: items.map((item) => ({
          produtoId: item.product.id,
          quantidade: item.quantidade,
        })),
        enderecoEntrega: enderecoFormatado,
        formaPagamento: paymentMethod 
      };

      const newOrder = await orderService.create(orderData);
      
      // Sucesso: Limpa carrinho, fecha checkout e ABRE O COMPROVANTE
      clearCart();
      setIsCheckoutOpen(false);
      setConfirmedOrder(newOrder); // Salva o pedido retornado para exibir
      setIsReceiptOpen(true); // Abre o modal de comprovante
      
    } catch (error) {
      toast.error('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    navigate('/'); // Redireciona para home ao fechar o comprovante
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

  // Formatações auxiliares para o comprovante
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (items.length === 0 && !isReceiptOpen) {
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
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => decrementQuantity(item.product.id, item.quantidade)}><Minus className="w-4 h-4" /></Button>
                      <Input type="number" min="1" value={item.quantidade} onChange={(e) => handleQuantityChange(item.product.id, e.target.value)} className="w-16 text-center" />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => incrementQuantity(item.product.id, item.quantidade)}><Plus className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto text-destructive" onClick={() => removeFromCart(item.product.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader><CardTitle>Resumo do Pedido</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.product.nome} x {item.quantidade}</span>
                  <span className="font-medium">R$ {(item.product.preco * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">R$ {totalValue.toFixed(2)}</span></div>
            </CardContent>
            <CardFooter><Button onClick={handleInitiateCheckout} className="w-full" size="lg">Continuar para Pagamento</Button></CardFooter>
          </Card>
        </div>
      </div>

      {/* --- MODAL DE CHECKOUT (Dados e Pagamento) --- */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
            <DialogDescription>Confirme os dados de entrega e escolha o pagamento.</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2 text-primary"><MapPin className="w-4 h-4" /> Dados de Entrega</h4>
              <div className="grid gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" value={addressForm.cep} onChange={(e) => setAddressForm({...addressForm, cep: e.target.value})} />
                  </div>
                  <div className="col-span-5 space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="São Paulo" value={addressForm.cidade} onChange={(e) => setAddressForm({...addressForm, cidade: e.target.value})} />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor="estado">UF</Label>
                    <Input id="estado" placeholder="SP" maxLength={2} value={addressForm.estado} onChange={(e) => setAddressForm({...addressForm, estado: e.target.value.toUpperCase()})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rua">Rua / Conjunto / Logradouro</Label>
                  <Input id="rua" value={addressForm.rua} onChange={(e) => setAddressForm({...addressForm, rua: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" value={addressForm.numero} onChange={(e) => setAddressForm({...addressForm, numero: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="referencia">Ponto de Referência</Label>
                    <Input id="referencia" value={addressForm.referencia} onChange={(e) => setAddressForm({...addressForm, referencia: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2 text-primary"><CreditCard className="w-4 h-4" /> Dados de Pagamento</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={cn("relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-accent", paymentMethod === 'Criptomoeda' ? "border-primary bg-primary/5" : "border-border")} onClick={() => setPaymentMethod('Criptomoeda')}>
                  <Badge className="absolute top-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-[10px]">Inovação</Badge>
                  <Bitcoin className="w-8 h-8 mb-2 text-orange-500" />
                  <span className="font-semibold">Criptomoeda</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">Pague com BTC, ETH, USDT</span>
                </div>
                <div className={cn("flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-accent", paymentMethod === 'PIX' ? "border-primary bg-primary/5" : "border-border")} onClick={() => setPaymentMethod('PIX')}>
                  <QrCode className="w-6 h-6 mb-2 text-emerald-600" />
                  <span className="font-medium">PIX</span>
                </div>
                <div className={cn("flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-accent", paymentMethod === 'Cartão de Crédito' ? "border-primary bg-primary/5" : "border-border")} onClick={() => setPaymentMethod('Cartão de Crédito')}>
                  <CreditCard className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="font-medium">Cartão de Crédito</span>
                </div>
                <div className={cn("flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-accent", paymentMethod === 'Boleto' ? "border-primary bg-primary/5" : "border-border")} onClick={() => setPaymentMethod('Boleto')}>
                  <Barcode className="w-6 h-6 mb-2 text-slate-600" />
                  <span className="font-medium">Boleto</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
              <span className="text-muted-foreground">Total a Pagar:</span>
              <span className="text-2xl font-bold text-primary">R$ {totalValue.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Cancelar</Button>
            <Button onClick={handleConfirmPurchase} disabled={isProcessing} className="w-full sm:w-auto">{isProcessing ? 'Processando...' : 'Confirmar Pedido'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- MODAL DE COMPROVANTE DIGITAL --- */}
      <Dialog open={isReceiptOpen} onOpenChange={handleCloseReceipt}>
        <DialogContent className="max-w-[500px] p-0 overflow-hidden border-2">
            {confirmedOrder && (
                <div className="flex flex-col bg-white dark:bg-slate-950">
                    {/* Cabeçalho do Recibo */}
                    <div className="bg-primary p-6 text-primary-foreground text-center">
                        <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold">Pedido Confirmado!</h2>
                        <p className="text-primary-foreground/80 text-sm">Obrigado pela sua compra</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Info Básica */}
                        <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">ID do Pedido</p>
                            <p className="text-xl font-mono font-bold tracking-wider">#{confirmedOrder.id.toString().padStart(6, '0')}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(confirmedOrder.dataPedido)}</p>
                        </div>

                        <Separator className="border-dashed" />

                        {/* Detalhes do Cliente e Entrega */}
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Cliente:</span>
                                <span className="font-medium text-right">{confirmedOrder.cliente.nome}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pagamento:</span>
                                <div className="text-right">
                                    <span className="font-bold block">{confirmedOrder.formaPagamento}</span>
                                    {confirmedOrder.formaPagamento === 'Criptomoeda' && (
                                        <span className="text-[10px] text-orange-500 font-semibold">⚡ Transação Blockchain</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="text-muted-foreground block mb-1">Entrega em:</span>
                                <p className="font-medium bg-muted p-2 rounded text-xs leading-relaxed">
                                    {confirmedOrder.enderecoEntrega}
                                </p>
                            </div>
                        </div>

                        <Separator className="border-dashed" />

                        {/* Lista de Itens (Resumida) */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase text-muted-foreground">Itens Adquiridos</span>
                            <div className="max-h-[150px] overflow-y-auto pr-2 space-y-2">
                                {confirmedOrder.itens.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="line-clamp-1">{item.quantidade}x {item.product.nome}</span>
                                        <span className="font-mono">R$ {(item.product.preco * item.quantidade).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="border-dashed" />

                        {/* Total */}
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-medium text-muted-foreground">Valor Total</span>
                            <span className="text-3xl font-bold text-primary">R$ {confirmedOrder.valorTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Rodapé / Ações */}
                    <div className="bg-muted/30 p-4 border-t flex gap-2 justify-center">
                        <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" /> Imprimir
                        </Button>
                        <Button className="flex-1" onClick={handleCloseReceipt}>
                            Continuar Comprando
                        </Button>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}