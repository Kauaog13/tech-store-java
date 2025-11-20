import axios from 'axios';
import { User, Product, Order, DashboardData } from '@/types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, senha: string) => {
    const response = await api.post<{ user: User; token: string }>('/auth/login', {
      email,
      senha,
    });
    return response.data;
  },

  register: async (data: {
    nome: string;
    email: string;
    endereco: string;
    senha: string;
  }) => {
    const response = await api.post<{ user: User; token: string }>('/auth/register', data);
    return response.data;
  },
};

export const userService = {
  updateProfile: async (userId: number, data: { nome: string; endereco: string }) => {
    const response = await api.put<User>(`/usuarios/${userId}`, data);
    return response.data;
  },
};

export const productService = {
  getAll: async () => {
    const response = await api.get<Product[]>('/produtos');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<Product>(`/produtos/${id}`);
    return response.data;
  },
  create: async (data: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/admin/produtos', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Omit<Product, 'id'>>) => {
    const response = await api.put<Product>(`/admin/produtos/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/admin/produtos/${id}`);
  },
};

export const orderService = {
  // Cliente: Criar Pedido
  create: async (data: { itens: { produtoId: number; quantidade: number }[], enderecoEntrega: string }) => {
    const response = await api.post<Order>('/pedidos', data);
    return response.data;
  },
  
  // Cliente: Meus Pedidos
  getMyOrders: async () => {
    const response = await api.get<Order[]>('/pedidos/meus');
    return response.data;
  },
  
  // Cliente: Cancelar Meu Pedido
  cancelMyOrder: async (id: number) => {
    const response = await api.put<Order>(`/pedidos/${id}/cancelar`);
    return response.data;
  },

  // Admin: Listar Todos
  getAll: async () => {
    const response = await api.get<Order[]>('/admin/vendas');
    return response.data;
  },
  
  // Admin: Atualizar Status
  updateStatus: async (id: number, status: Order['status']) => {
    const response = await api.put<Order>(`/admin/vendas/${id}/status`, { status });
    return response.data;
  },
  
  // Admin: Excluir
  delete: async (id: number) => {
    await api.delete(`/admin/vendas/${id}`);
  },
  
  // Comum (se necessário)
  getById: async (id: number) => {
    const response = await api.get<Order>(`/pedidos/${id}`);
    return response.data;
  },
};

export const adminService = {
  getDashboard: async () => {
    const response = await api.get<DashboardData>('/admin/dashboard');
    return response.data;
  }
};

export default api;