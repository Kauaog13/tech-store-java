export interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  descricao: string;
  imagemUrl: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  role: 'CLIENTE' | 'ADMIN';
}

export interface CartItem {
  product: Product;
  quantidade: number;
}

export interface Order {
  id: number;
  cliente: User;
  itens: CartItem[];
  status: 'PENDENTE' | 'PAGO' | 'ENVIADO' | 'CANCELADO';
  valorTotal: number;
  dataPedido: string;
  enderecoEntrega?: string;
  formaPagamento: string;
}

export interface TopProduct {
  nome: string;
  totalVendido: number;
}

export interface DashboardData {
  totalVendas: number;
  totalPedidos: number;
  totalProdutos: number;
  ticketMedio: number;
  pedidosRecentes: Order[];
  produtosMaisVendidos: TopProduct[];
  produtosBaixoEstoque: string[];
}