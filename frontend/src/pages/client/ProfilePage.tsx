import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { User, Package, XCircle, Eye, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Estados para Modais
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    endereco: user?.endereco || '',
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const data = await orderService.getMyOrders();
      // Ordenar: PENDENTE primeiro, depois por data
      setOrders(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Erro ao carregar histórico de pedidos');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoadingProfile(true);
    try {
      const updatedUser = await userService.updateProfile(user.id, formData);
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
      loadOrders(); // Recarrega a lista
    } catch (error: any) { // Tipagem frouxa para pegar erro customizado se houver
        // Verifica se o erro veio do backend com mensagem específica
        if (error.response && error.response.status === 500) {
            // O backend lança IllegalStateException que vira 500 se não tratado, 
            // ou podemos ajustar o GlobalExceptionHandler. 
            // Mas genericamente:
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
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
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

        {/* ABA DE PERFIL */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" /> Informações Pessoais
              </CardTitle>
              <CardDescription>Atualize seus dados cadastrais</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Padrão</Label>
                  <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
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

        {/* ABA DE PEDIDOS */}
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

      {/* Modal de Detalhes */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Pedido #{selectedOrder?.id}</DialogTitle>
                <DialogDescription>Detalhes da compra</DialogDescription>
            </DialogHeader>
            {selectedOrder && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="font-semibold">Data:</span> {formatDate(selectedOrder.dataPedido)}
                        </div>
                        <div>
                            <span className="font-semibold">Status:</span> {selectedOrder.status}
                        </div>
                         <div className="col-span-2">
                            <span className="font-semibold">Endereço de Entrega:</span><br/>
                            {selectedOrder.enderecoEntrega || user?.endereco /* Fallback visual */}
                        </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                             <TableHeader>
                                <TableRow>
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
                    <div className="text-right font-bold text-lg">
                        Total: R$ {selectedOrder.valorTotal.toFixed(2)}
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>

      {/* Confirmação de Cancelamento */}
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