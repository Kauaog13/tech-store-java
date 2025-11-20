export interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  descricao: string; // Novo campo
  imagemUrl: string;
}

// ... outras interfaces (User, CartItem, Order) mantêm-se iguais
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
}