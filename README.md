# 🛒 TechStore v1.0.0 — Sistema de Loja Online (Full-Stack)

Este repositório contém a versão **1.0.0** da **TechStore**, um sistema completo de e-commerce desenvolvido com:

- **Backend:** Java (Spring Boot) + Maven  
- **Frontend:** React + TypeScript + Vite  
- **Banco de Dados:** MySQL  
- **UI:** Shadcn/UI + Tailwind  
- **Gerenciamento de Estado:** Zustand  

A aplicação foi projetada para fornecer uma experiência completa tanto para **Clientes** quanto para **Administradores**, incluindo catálogo, carrinho, checkout, login, painel administrativo e relatórios.

---

# 📌 1. Introdução

Bem-vindo à documentação oficial do projeto **TechStore v1.0.0**.  
Esta plataforma simula um e-commerce moderno especializado em **componentes e periféricos de PC**.

A arquitetura do sistema é totalmente desacoplada:

- **Backend:** API RESTful completa em Java  
- **Frontend:** SPA moderna em React + TS  
- **Banco:** MySQL com integridade e validações  

A versão 1.0.0 introduz:
- Autenticação completa (Cliente/Admin)  
- Painel administrativo funcional  
- Carrinho, checkout e validação de estoque  
- Gestão de produtos e pedidos  

---

# 🎯 2. Objetivo do Sistema

A v1.0.0 visa oferecer um ecossistema completo de e-commerce, garantindo:

### 👤 Fluxo 1 — Cliente
- Criar conta  
- Editar perfil  
- Navegar pelo catálogo  
- Gerenciar carrinho  
- Finalizar pedidos com validação de estoque  

### 🛠️ Fluxo 2 — Administrador
- Visualizar Dashboard com KPIs  
- Gerenciar estoque (CRUD de produtos)  
- Gerenciar vendas (pedidos e status)  

---

# ⚙️ 3. Funcionalidades (Escopo v1.0.0)

## **3.1. Autenticação e Contas**
- Login (CLIENTE / ADMIN)  
- Registro de clientes  
- Logout seguro  

---

## **3.2. Módulo do Cliente (Fluxo 1)**

### 👤 Perfil
- Visualizar dados pessoais  
- Editar nome, email e endereço  

### 🛍️ Catálogo
- Listagem de todos os produtos  
- Página de detalhes do produto  

### 🛒 Carrinho
- Adicionar produtos  
- Atualizar quantidade  
- Remover itens  

### 🧾 Checkout
- Formulário automático com dados do cliente  
- Finalização do pedido

---

## **3.3. Backend — Pedido e Regras de Negócio**
- Criação de Pedidos vinculados ao Cliente  
- Validação completa de estoque  
- EstoqueInsuficienteException integrada  

---

## **3.4. Painel Administrativo (Fluxo 2 — Admin)**

### 📊 Dashboard
- KPIs  
- Relatórios  
- Produtos mais vendidos  
- Baixo estoque  

### 📦 Gerenciamento de Estoque
- Criar produtos  
- Listar e editar  
- Excluir produtos  

### 💰 Gerenciamento de Vendas
- Listagem completa de pedidos  
- Visualizar detalhes  
- Editar status  
- Cancelar pedidos  

---

# 📜 4. Casos de Uso (Use Cases)

## **UC Gerais**
| ID | Caso de Uso | Descrição |
|----|-------------|-----------|
| UC-001 | Login | Acessar o sistema com email e senha |
| UC-002 | Registrar Conta | Criar um perfil de cliente |

---

## **UC — Cliente**
| ID | Ação | Descrição |
|----|-------|-----------|
| UC-101 | Visualizar Perfil | Acessar página de perfil |
| UC-102 | Editar Perfil | Editar dados pessoais |
| UC-103 | Catálogo | Navegar por produtos |
| UC-104 | Adicionar ao Carrinho | Inserir produtos |
| UC-105 | Ajustar Carrinho | Atualizar quantidades |
| UC-106 | Remover do Carrinho | Excluir item |
| UC-107 | Finalizar Pedido | Criar pedido |
| UC-108 | Falha de Estoque | Bloquear compra sem estoque |

---

## **UC — Administrador**
| ID | Ação | Descrição |
|----|-------|-----------|
| UC-201 | Ver Dashboard | Visualizar KPIs |
| UC-202 | Criar Produto | Adicionar novos produtos |
| UC-203 | Editar Produto | Alterar produto existente |
| UC-204 | Excluir Produto | Remover do catálogo |
| UC-205 | Listar Vendas | Ver todos os pedidos |
| UC-206 | Gerenciar Pedido | Atualizar status |
| UC-207 | Cancelar Pedido | Excluir pedido |

---

# 🧠 5. Ferramentas de I.A Utilizadas

### 🤖 Gemini 2.5 PRO (Google)
Usado para:
- Engenharia de prompt  
- Arquitetura do frontend  
- Planejamento das classes Java  
- Documentação técnica  
- Design dos módulos de Admin e Cliente  

### ⚡ Bolt.new
Usado para scaffolding completo do frontend:
- Estrutura de pastas  
- Componentes React  
- Interfaces TypeScript  
- Services com Axios  
- Rotas com React Router  
- Layouts e pages iniciais  

---
