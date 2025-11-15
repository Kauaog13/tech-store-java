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


/*  MODO TESTE

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/models';
// O authService não é mais necessário no modo de teste
// import { authService } from '@/services/apiService';

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

/**
 * ! =================================================
 * ! MODO DE TESTE ATIVADO
 * ! As chamadas de API estão desativadas.
 * !
 * ! Para logar como ADMIN:
 * ! email: admin@teste.com
 * !
 * ! Para logar como CLIENTE:
 * ! email: (qualquer outro email)
 * !
 * ! Para REGISTRAR:
 * ! Sempre criará um novo CLIENTE.
 * ! =================================================
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email: string, senha: string) => {
        console.warn('--- MODO DE TESTE (LOGIN) ---');

        let user: User;
        const token = `fake-token-for-${email}`;

        if (email.toLowerCase() === 'admin@teste.com') {
          // --- Login de Admin ---
          console.log('Simulando login de ADMIN...');
          user = {
            id: 1,
            nome: 'Administrador (Teste)',
            email: email,
            endereco: 'Rua do Painel de Controle, 123',
            role: 'ADMIN',
          };
        } else {
          // --- Login de Cliente ---
          console.log('Simulando login de CLIENTE...');
          user = {
            id: 2,
            nome: 'Cliente (Teste)',
            email: email,
            endereco: 'Rua do Cliente Fictício, 456',
            role: 'CLIENTE',
          };
        }

        // Simula o sucesso
        localStorage.setItem('auth_token', token);
        set({ user, token });

        // --- CÓDIGO ORIGINAL (DESATIVADO) ---
        // const { user, token } = await authService.login(email, senha);
        // localStorage.setItem('auth_token', token);
        // set({ user, token });
      },

      register: async (data) => {
        console.warn('--- MODO DE TESTE (REGISTER) ---');
        console.log('Simulando registro de novo CLIENTE...');

        // No modo de teste, o registro já faz o login
        const user: User = {
          id: Math.floor(Math.random() * 1000) + 10, // ID aleatório
          nome: data.nome,
          email: data.email,
          endereco: data.endereco,
          role: 'CLIENTE', // Novos registros são sempre clientes
        };
        const token = `fake-token-for-${data.email}`;

        localStorage.setItem('auth_token', token);
        set({ user, token });

        // --- CÓDIGO ORIGINAL (DESATIVADO) ---
        // const { user, token } = await authService.register(data);
        // localStorage.setItem('auth_token', token);
        // set({ user, token });
      },

      logout: () => {
        console.log('Executando logout...');
        localStorage.removeItem('auth_token');
        set({ user: null, token: null });
      },

      updateUser: (user: User) => {
        // A atualização de perfil funciona como antes
        console.log('Atualizando dados do usuário no estado:', user);
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

*/