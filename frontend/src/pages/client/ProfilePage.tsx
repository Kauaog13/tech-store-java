import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/useAuthStore';
import { userService, orderService } from '@/services/apiService';
import { Order } from '@/types/models';
import { toast } from 'sonner';
import { 
    User, 
    Package, 
    XCircle, 
    Eye, 
    Loader2, 
    MapPin, 
    CreditCard, 
    Printer, 
    CheckCircle, 
    Download 
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Estados para Modais
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false); // Novo estado para o comprovante
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);

  const [nome, setNome] = useState(user?.nome || '');
  
  const [addressForm, setAddressForm] = useState({
    cep: '',
    cidade: '',
    estado: '',
    rua: '',
    numero: '',
    referencia: ''
  });

  useEffect(() => {
    if (user?.endereco) {
      const parsed = parseAddressString(user.endereco);
      setAddressForm(parsed);
    }
  }, [user]);

  const parseAddressString = (fullString: string) => {
    let data = { cep: '', cidade: '', estado: '', rua: fullString, numero: '', referencia: '' };
    try {
        let addr = fullString;
        if (addr.includes('| CEP:')) {
            const [parteEndereco, parteCepRef] = addr.split('| CEP:');
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

            data = { rua: rua.trim(), numero: numero?.trim() || '', cidade, estado, cep, referencia };
        }
    } catch (e) {}
    return data;
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const data = await orderService.getMyOrders();
      setOrders(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Erro ao carregar histórico de pedidos');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!addressForm.rua.trim() || !addressForm.numero.trim() || !addressForm.cidade.trim() || !addressForm.estado.trim()) {
        toast.error('Preencha Rua, Número, Cidade e UF para salvar.');
        return;
    }

    setIsLoadingProfile(true);
    try {
      const enderecoFormatado = `${addressForm.rua}, Nº ${addressForm.numero} - ${addressForm.cidade}/${addressForm.estado} | CEP: ${addressForm.cep} ${addressForm.referencia ? `(${addressForm.referencia})` : ''}`;

      const updatedUser = await userService.updateProfile(user.id, {
          nome: nome,
          endereco: enderecoFormatado
      });
      
      updateUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;
    try {
      await orderService.cancelMyOrder(orderToCancel);
      toast.success('Pedido cancelado com sucesso!');
      loadOrders(); 
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            toast.error('Não foi possível cancelar. Verifique o status do pedido.');
        } else {
            toast.error('Erro ao cancelar pedido');
        }
    } finally {
      setOrderToCancel(null);
    }
  };

  const handleViewDetails = (order: Order) => {
      setSelectedOrder(order);
      setIsDetailsOpen(true);
  };

  // Troca do modal de detalhes para o modal de comprovante
  const handleOpenReceipt = () => {
      setIsDetailsOpen(false);
      setTimeout(() => setIsReceiptOpen(true), 100); // Pequeno delay para suavidade
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      PENDENTE: { variant: 'secondary', label: 'Pendente' },
      PAGO: { variant: 'default', label: 'Pago' },
      ENVIADO: { variant: 'outline', label: 'Enviado' },
      CANCELADO: { variant: 'destructive', label: 'Cancelado' },
    };
    const { variant, label } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const renderSelectedOrderDetails = () => {
      if (!selectedOrder) return null;
      const details = parseAddressString(selectedOrder.enderecoEntrega || '');

      return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg border">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Data do Pedido</span>
                    <span className="font-medium">{formatDate(selectedOrder.dataPedido)}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground uppercase font-bold mb-1">Status Atual</span>
                    {getStatusBadge(selectedOrder.status)}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3 bg-background">
                    <h4 className="font-semibold flex items-center gap-2 text-primary border-b pb-2">
                        <MapPin className="w-4 h-4" /> Dados de Entrega
                    </h4>
                    <div className="text-sm space-y-1">
                        <p><span className="font-medium">Rua:</span> {details.rua}</p>
                        <p><span className="font-medium">Número:</span> {details.numero}</p>
                        <p><span className="font-medium">Cidade/UF:</span> {details.cidade}/{details.estado}</p>
                        <p><span className="font-medium">CEP:</span> {details.cep}</p>
                        {details.referencia && (
                            <p><span className="font-medium">Ref:</span> {details.referencia}</p>
                        )}
                    </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3 bg-background">
                    <h4 className="font-semibold flex items-center gap-2 text-primary border-b pb-2">
                        <CreditCard className="w-4 h-4" /> Pagamento
                    </h4>
                    <div className="flex flex-col justify-center h-full pb-6">
                        <span className="text-sm text-muted-foreground">Método Escolhido</span>
                        <span className="text-lg font-bold">{selectedOrder.formaPagamento}</span>
                        
                        {selectedOrder.formaPagamento === 'Criptomoeda' && (
                            <Badge variant="outline" className="w-fit mt-2 border-orange-500 text-orange-600 bg-orange-50">
                                Pagamento Inovador
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2">Itens do Pedido</h4>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {selectedOrder.itens.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>{item.product.nome}</TableCell>
                                <TableCell className="text-center">{item.quantidade}</TableCell>
                                <TableCell className="text-right">R$ {(item.product.preco * item.quantidade).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={handleOpenReceipt}>
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir Comprovante
                    </Button>

                    <div className="text-right bg-primary/5 px-6 py-3 rounded-lg border border-primary/10">
                        <span className="text-muted-foreground mr-4">Total do Pedido:</span>
                        <span className="text-2xl font-bold text-primary">
                            R$ {selectedOrder.valorTotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Minha Conta</h1>
        <p className="text-muted-foreground">Gerencie seus dados e acompanhe seus pedidos</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" /> Informações Pessoais
              </CardTitle>
              <CardDescription>Atualize seus dados cadastrais e endereço padrão</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitProfile}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                </div>
                <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Endereço Padrão
                    </h3>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 space-y-2">
                            <Label htmlFor="cep">CEP</Label>
                            <Input id="cep" placeholder="00000-000" value={addressForm.cep} onChange={(e) => setAddressForm({...addressForm, cep: e.target.value})} />
                        </div>
                        <div className="col-span-5 space-y-2">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input id="cidade" placeholder="Ex: São Paulo" value={addressForm.cidade} onChange={(e) => setAddressForm({...addressForm, cidade: e.target.value})} required />
                        </div>
                        <div className="col-span-3 space-y-2">
                            <Label htmlFor="estado">UF</Label>
                            <Input id="estado" placeholder="SP" maxLength={2} value={addressForm.estado} onChange={(e) => setAddressForm({...addressForm, estado: e.target.value.toUpperCase()})} required />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="rua">Rua / Conjunto / Logradouro</Label>
                        <Input id="rua" placeholder="Ex: Av. Paulista" value={addressForm.rua} onChange={(e) => setAddressForm({...addressForm, rua: e.target.value})} required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-1">
                            <Label htmlFor="numero">Número</Label>
                            <Input id="numero" placeholder="123" value={addressForm.numero} onChange={(e) => setAddressForm({...addressForm, numero: e.target.value})} required />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="referencia">Ponto de Referência</Label>
                            <Input id="referencia" placeholder="Ex: Ao lado da padaria" value={addressForm.referencia} onChange={(e) => setAddressForm({...addressForm, referencia: e.target.value})} />
                        </div>
                        </div>
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoadingProfile}>
                  {isLoadingProfile ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" /> Histórico de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">Você ainda não fez nenhum pedido.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{formatDate(order.dataPedido)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>R$ {order.valorTotal.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Ver Detalhes" onClick={() => handleViewDetails(order)}>
                                <Eye className="w-4 h-4" />
                            </Button>
                            {order.status === 'PENDENTE' && (
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-destructive hover:bg-destructive/10"
                                    title="Cancelar Pedido"
                                    onClick={() => setOrderToCancel(order.id)}
                                >
                                    <XCircle className="w-4 h-4" />
                                </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle className="text-xl">Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
                <DialogDescription>Informações completas da transação</DialogDescription>
            </DialogHeader>
            {renderSelectedOrderDetails()}
        </DialogContent>
      </Dialog>

      {/* --- NOVO MODAL DE COMPROVANTE (Vindo do Histórico) --- */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="max-w-[500px] p-0 overflow-hidden border-2">
            {selectedOrder && (
                <div className="flex flex-col bg-white dark:bg-slate-950">
                    <div className="bg-primary p-6 text-primary-foreground text-center">
                        <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold">Comprovante Digital</h2>
                        <p className="text-primary-foreground/80 text-sm">TechStore Oficial</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">ID do Pedido</p>
                            <p className="text-xl font-mono font-bold tracking-wider">#{selectedOrder.id.toString().padStart(6, '0')}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(selectedOrder.dataPedido)}</p>
                        </div>

                        <Separator className="border-dashed" />

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Cliente:</span>
                                <span className="font-medium text-right">{selectedOrder.cliente.nome}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pagamento:</span>
                                <div className="text-right">
                                    <span className="font-bold block">{selectedOrder.formaPagamento}</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-muted-foreground block mb-1">Entrega em:</span>
                                <p className="font-medium bg-muted p-2 rounded text-xs leading-relaxed">
                                    {selectedOrder.enderecoEntrega}
                                </p>
                            </div>
                        </div>

                        <Separator className="border-dashed" />

                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase text-muted-foreground">Itens</span>
                            <div className="max-h-[150px] overflow-y-auto pr-2 space-y-2">
                                {selectedOrder.itens.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="line-clamp-1">{item.quantidade}x {item.product.nome}</span>
                                        <span className="font-mono">R$ {(item.product.preco * item.quantidade).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="border-dashed" />

                        <div className="flex justify-between items-end">
                            <span className="text-sm font-medium text-muted-foreground">Valor Total</span>
                            <span className="text-3xl font-bold text-primary">R$ {selectedOrder.valorTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-4 border-t flex gap-2 justify-center">
                        <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" /> Imprimir
                        </Button>
                        <Button className="flex-1" onClick={() => setIsReceiptOpen(false)}>
                            Fechar
                        </Button>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!orderToCancel} onOpenChange={() => setOrderToCancel(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Cancelar Pedido?</AlertDialogTitle>
                <AlertDialogDescription>
                    Tem certeza que deseja cancelar o pedido <strong>#{orderToCancel}</strong>?
                    <br/>O valor será estornado e a compra cancelada. Esta ação é irreversível.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Não, manter</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={handleCancelOrder}>
                    Sim, Cancelar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}