// Maps the 'usuarios' table (id: BIGINT)
export interface User {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  role: 'CLIENTE' | 'ADMIN';
}

// Maps the 'produtos' table (id: BIGINT)
export interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagemUrl: string;
}

// Logical interface for the Zustand cart store
export interface CartItem {
  product: Product;
  quantidade: number;
}

// Maps the 'pedidos' table (id: BIGINT)
export interface Order {
  id: number;
  cliente: User;
  itens: CartItem[];
  status: 'PENDENTE' | 'PAGO' | 'ENVIADO' | 'CANCELADO';
  valorTotal: number;
  dataPedido: string;
}
