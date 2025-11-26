import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/models';
import { orderService } from '@/services/apiService';
import { toast } from 'sonner';
import { Eye, Loader2, Trash2, FilterX, MapPin, CreditCard, User } from 'lucide-react';

export default function AdminVendasPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const pedidoIdParam = searchParams.get('pedidoId');

  const [pendingStatusChange, setPendingStatusChange] = useState<{ id: number, status: Order['status'] } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (pedidoIdParam && orders.length > 0) {
        const orderId = parseInt(pedidoIdParam);
        const order = orders.find(o => o.id === orderId);
        if (order) {
            handleViewDetails(order);
        }
    }
  }, [pedidoIdParam, orders]);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  const initiateStatusChange = (orderId: number, newStatus: Order['status']) => {
    if (newStatus === 'CANCELADO') {
      setPendingStatusChange({ id: orderId, status: newStatus });
    } else {
      handleConfirmStatusChange(orderId, newStatus);
    }
  };

  const handleConfirmStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      toast.success(newStatus === 'CANCELADO' 
        ? 'Pedido cancelado e estoque estornado!' 
        : 'Status atualizado com sucesso!');
      loadOrders();
    } catch (error) {
      toast.error('Erro ao atualizar status.');
    } finally {
      setPendingStatusChange(null);
    }
  };

  const initiateDelete = (orderId: number) => {
    setPendingDeleteId(orderId);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await orderService.delete(pendingDeleteId);
      toast.success('Pedido excluído permanentemente!');
      loadOrders();
    } catch (error) {
      toast.error('Erro ao excluir pedido.');
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = (open: boolean) => {
      setIsDetailsOpen(open);
      if (!open && pedidoIdParam) {
          setSearchParams({});
      }
  };

  // Parse endereço para exibição detalhada (sem precisar buscar pagamento daqui)
  const parseAddressDetails = (fullString: string) => {
    let details = { rua: fullString, numero: '', cidade: '', estado: '', cep: '', referencia: '' };
    try {
        let addr = fullString;
        
        if (addr.includes('| CEP:')) {
            const parts = addr.split('| CEP:');
            addr = parts[0].trim();
            let cepPart = parts[1].trim();
            if (cepPart.includes('(')) {
                const cepSplit = cepPart.split('(');
                details.cep = cepSplit[0].trim();
                details.referencia = cepSplit[1].replace(')', '').trim();
            } else {
                details.cep = cepPart;
            }
        }

        if (addr.includes(' - ')) {
            const parts = addr.split(' - ');
            addr = parts[0].trim();
            let cityState = parts[1].trim();
            if (cityState.includes('/')) {
                const csParts = cityState.split('/');
                details.cidade = csParts[0].trim();
                details.estado = csParts[1].trim();
            } else {
                details.cidade = cityState;
            }
        }

        if (addr.includes(', Nº ')) {
            const parts = addr.split(', Nº ');
            details.rua = parts[0].trim();
            details.numero = parts[1].trim();
        } else {
            details.rua = addr;
        }

    } catch (e) { return details; }
    return details;
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
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isFiltering = !!pedidoIdParam;
  const filteredOrders = isFiltering 
      ? orders.filter(o => o.id === parseInt(pedidoIdParam)) 
      : orders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Vendas</h1>
          <p className="text-muted-foreground">Histórico completo de transações</p>
        </div>
        {isFiltering && (
            <Button variant="ghost" onClick={() => setSearchParams({})} className="text-muted-foreground">
                <FilterX className="w-4 h-4 mr-2"/>
                Limpar filtro (Pedido #{pedidoIdParam})
            </Button>
        )}
      </div>

      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  {isFiltering ? 'Pedido não encontrado.' : 'Nenhum pedido realizado.'}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className={selectedOrder?.id === order.id ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span>{order.cliente.nome}</span>
                        <span className="text-xs text-muted-foreground">{order.cliente.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.dataPedido)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="font-semibold">
                    R$ {order.valorTotal.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(order)}
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          initiateStatusChange(order.id, value as Order['status'])
                        }
                        disabled={order.status === 'CANCELADO'}
                      >
                        <SelectTrigger className="w-[110px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDENTE">Pendente</SelectItem>
                          <SelectItem value="PAGO">Pago</SelectItem>
                          <SelectItem value="ENVIADO">Enviado</SelectItem>
                          <SelectItem value="CANCELADO" className="text-destructive font-medium">
                            Cancelar
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => initiateDelete(order.id)}
                        title="Excluir Permanentemente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={handleCloseDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
                Pedido #{selectedOrder?.id}
                {selectedOrder && getStatusBadge(selectedOrder.status)}
            </DialogTitle>
            <DialogDescription>Realizado em {selectedOrder && formatDate(selectedOrder.dataPedido)}</DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (() => {
            const details = parseAddressDetails(selectedOrder.enderecoEntrega || '');
            return (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Cliente */}
                <div className="p-4 bg-muted/30 rounded-lg border space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-primary">
                    <User className="w-4 h-4" /> Dados do Cliente
                  </h4>
                  <div className="text-sm">
                    <p className="font-medium">{selectedOrder.cliente.nome}</p>
                    <p className="text-muted-foreground">{selectedOrder.cliente.email}</p>
                  </div>
                </div>

                {/* Pagamento (Lido direto do objeto) */}
                <div className="p-4 bg-muted/30 rounded-lg border space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-primary">
                    <CreditCard className="w-4 h-4" /> Pagamento
                  </h4>
                  <div className="text-sm">
                    <span className="block text-muted-foreground mb-1">Método:</span>
                    <span className="font-bold text-lg">{selectedOrder.formaPagamento}</span>
                  </div>
                </div>
              </div>

              {/* Endereço Completo */}
              <div className="p-4 bg-muted/30 rounded-lg border space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4" /> Endereço de Entrega
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <p><span className="font-medium">Rua:</span> {details.rua}</p>
                      <p><span className="font-medium">Número:</span> {details.numero}</p>
                      <p><span className="font-medium">Cidade/UF:</span> {details.cidade}/{details.estado}</p>
                      <p><span className="font-medium">CEP:</span> {details.cep}</p>
                      {details.referencia && (
                        <p className="col-span-2"><span className="font-medium">Referência:</span> {details.referencia}</p>
                      )}
                  </div>
              </div>

              {/* Itens */}
              <div>
                  <h4 className="font-semibold mb-3">Itens do Pedido</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead className="text-right">Unitário</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {selectedOrder.itens.map((item, index) => (
                            <TableRow key={index}>
                            <TableCell className="font-medium">{item.product.nome}</TableCell>
                            <TableCell className="text-center">{item.quantidade}</TableCell>
                            <TableCell className="text-right">R$ {item.product.preco.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                R$ {(item.product.preco * item.quantidade).toFixed(2)}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className="text-right bg-primary/5 px-6 py-3 rounded-lg border border-primary/10">
                        <span className="text-muted-foreground mr-4">Valor Total:</span>
                        <span className="text-2xl font-bold text-primary">
                            R$ {selectedOrder.valorTotal.toFixed(2)}
                        </span>
                    </div>
                  </div>
              </div>
            </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingStatusChange} onOpenChange={() => setPendingStatusChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Cancelamento</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a cancelar o Pedido <strong>#{pendingStatusChange?.id}</strong>.
              <br /><br />
              O estoque dos itens será <strong>automaticamente estornado</strong>.
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => pendingStatusChange && handleConfirmStatusChange(pendingStatusChange.id, pendingStatusChange.status)}
            >
              Sim, Cancelar Pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!pendingDeleteId} onOpenChange={() => setPendingDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">Excluir Permanentemente</AlertDialogTitle>
            <AlertDialogDescription>
              Isso apagará todo o registro do Pedido <strong>#{pendingDeleteId}</strong> do banco de dados.
              <br />
              Use essa opção apenas para pedidos de teste ou erros de sistema. Para devoluções, use "Cancelar".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              Excluir Definitivamente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}