import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { adminService } from '@/services/apiService';
import { DashboardData } from '@/types/models';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const result = await adminService.getDashboard();
      setData(result);
    } catch (error) {
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-center mb-8">
           <Skeleton className="h-10 w-48" />
           <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral e indicadores de performance</p>
        </div>
        <Button onClick={loadDashboard} variant="outline" size="sm" className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          Atualizar Dados
        </Button>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.totalVendas)}
            </div>
            <p className="text-xs text-muted-foreground">Receita acumulada (confirmada)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPedidos}</div>
            <p className="text-xs text-muted-foreground">Total de pedidos válidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalProdutos}</div>
            <p className="text-xs text-muted-foreground">Itens ativos no catálogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
               {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.ticketMedio)}
            </div>
            <p className="text-xs text-muted-foreground">Média por pedido</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de Baixo Estoque */}
      {data.produtosBaixoEstoque.length > 0 && (
        <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-destructive text-lg">
                    <AlertTriangle className="w-5 h-5 mr-2"/>
                    Atenção: Reposição Necessária
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    {data.produtosBaixoEstoque.length} produtos atingiram o nível crítico de estoque (menos de 5 unidades).
                </p>
                <div className="flex flex-wrap gap-2">
                    {data.produtosBaixoEstoque.slice(0, 8).map((nome, i) => (
                        <Badge key={i} variant="destructive" className="px-2 py-1 font-normal">
                            {nome}
                        </Badge>
                    ))}
                    {data.produtosBaixoEstoque.length > 8 && (
                        <Link to="/admin/estoque">
                            <Badge variant="outline" className="px-2 py-1 hover:bg-accent cursor-pointer">
                                +{data.produtosBaixoEstoque.length - 8} outros
                            </Badge>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-7">
        {/* Gráfico de Produtos Mais Vendidos (Ocupa 4 colunas) */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Top Produtos</CardTitle>
            <CardDescription>Os 5 produtos com maior volume de vendas</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {data.produtosMaisVendidos.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data.produtosMaisVendidos}>
                    <XAxis
                    dataKey="nome"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 12)}...` : value}
                    />
                    <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    allowDecimals={false}
                    />
                    <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar 
                        dataKey="totalVendido" 
                        fill="currentColor" 
                        radius={[4, 4, 0, 0]} 
                        className="fill-primary" 
                        name="Unidades Vendidas"
                    />
                </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                    Sem dados de vendas suficientes para o gráfico.
                </div>
            )}
          </CardContent>
        </Card>

        {/* Lista de Pedidos Recentes (Ocupa 3 colunas) */}
        <Card className="md:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimas transações realizadas</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6">
              {data.pedidosRecentes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">Nenhum pedido recente.</div>
              ) : (
                data.pedidosRecentes.map((pedido) => (
                  <div key={pedido.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Link 
                            to={`/admin/vendas?pedidoId=${pedido.id}`} 
                            className="font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                            Pedido #{pedido.id}
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {pedido.cliente.nome}
                        </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valorTotal)}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 text-[10px] px-1.5 py-0 
                            ${pedido.status === 'PAGO' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${pedido.status === 'PENDENTE' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                        `}
                      >
                        {pedido.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}