import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/models';
import { authService } from '@/services/apiService';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  register: (data: {
    nome: string;
    email: string;
    endereco: string;
    senha: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email: string, senha: string) => {
        const { user, token } = await authService.login(email, senha);
        localStorage.setItem('auth_token', token);
        set({ user, token });
      },

      register: async (data) => {
        const { user, token } = await authService.register(data);
        localStorage.setItem('auth_token', token);
        set({ user, token });
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null });
      },

      updateUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
