import { useEffect, useState } from 'react';
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
import { Eye, Loader2, Trash2 } from 'lucide-react';

export default function AdminVendasPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Estados para controlar os Modais de Confirmação (2 etapas)
  const [pendingStatusChange, setPendingStatusChange] = useState<{ id: number, status: Order['status'] } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      // Ordena por ID decrescente para ver os mais recentes primeiro
      setOrders(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Inicia o fluxo de mudança de status
  const initiateStatusChange = (orderId: number, newStatus: Order['status']) => {
    // Se for cancelar, exige confirmação extra
    if (newStatus === 'CANCELADO') {
      setPendingStatusChange({ id: orderId, status: newStatus });
    } else {
      // Se não for cancelamento, executa direto (ou pode adicionar confirmação se desejar)
      handleConfirmStatusChange(orderId, newStatus);
    }
  };

  // 2. Executa a mudança de status (Confirmado)
  const handleConfirmStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      toast.success(newStatus === 'CANCELADO' 
        ? 'Pedido cancelado e estoque estornado!' 
        : 'Status atualizado com sucesso!');
      loadOrders();
    } catch (error) {
      toast.error('Erro ao atualizar status. Verifique se o pedido já não está cancelado.');
    } finally {
      setPendingStatusChange(null);
    }
  };

  // 3. Inicia o fluxo de exclusão permanente
  const initiateDelete = (orderId: number) => {
    setPendingDeleteId(orderId);
  };

  // 4. Executa a exclusão (Confirmado)
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerenciar Vendas</h1>
        <p className="text-muted-foreground">Gerencie pedidos, cancele ou exclua vendas.</p>
      </div>

      <div className="border rounded-lg">
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
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum pedido encontrado
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.cliente.nome}</TableCell>
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
                        <SelectTrigger className="w-32">
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

      {/* Modal de Detalhes do Pedido */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>Informações completas do pedido</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedOrder.cliente.nome}</p>
                  <p className="text-sm">{selectedOrder.cliente.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <p className="font-medium">{selectedOrder.cliente.endereco}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{formatDate(selectedOrder.dataPedido)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>

              <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-center">Qtd</TableHead>
                        <TableHead className="text-right">Preço Unitário</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.itens.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.product.nome}</TableCell>
                          <TableCell className="text-center">{item.quantidade}</TableCell>
                          <TableCell className="text-right">R$ {item.product.preco.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">
                            R$ {(item.product.preco * item.quantidade).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                        <TableCell className="text-right font-bold text-lg text-primary">
                          R$ {selectedOrder.valorTotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 1. Alerta de Confirmação para CANCELAMENTO */}
      <AlertDialog open={!!pendingStatusChange} onOpenChange={() => setPendingStatusChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja cancelar?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a cancelar o Pedido <strong>#{pendingStatusChange?.id}</strong>.
              <br /><br />
              Esta ação irá <strong>estornar automaticamente</strong> todos os itens para o estoque.
              O status "Cancelado" não pode ser revertido posteriormente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não, manter pedido</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (pendingStatusChange) {
                  handleConfirmStatusChange(pendingStatusChange.id, pendingStatusChange.status);
                }
              }}
            >
              Sim, Cancelar Pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 2. Alerta de Confirmação para EXCLUSÃO PERMANENTE */}
      <AlertDialog open={!!pendingDeleteId} onOpenChange={() => setPendingDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">Excluir Permanentemente?</AlertDialogTitle>
            <AlertDialogDescription>
              Atenção! Você está prestes a <strong>apagar definitivamente</strong> o Pedido <strong>#{pendingDeleteId}</strong> do banco de dados.
              <br /><br />
              Isso removerá todo o histórico desta venda. Se o pedido ainda estava ativo, o estoque será devolvido antes da exclusão.
              <br />
              <strong>Esta ação é irreversível.</strong>
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