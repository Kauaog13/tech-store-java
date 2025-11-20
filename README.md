<p align="center">
  <img src="./assets/images/TechStoreBanner.png" alt="TechStore Banner" />
</p>

# 🛒 TechStore v1.1.0 — Sistema de Loja Online (Full-Stack)

Este repositório contém a versão **1.1.0** da **TechStore**, um sistema completo de e-commerce desenvolvido com:

- **Backend:** Java (Spring Boot) + Maven  
- **Frontend:** React + TypeScript + Vite  
- **Banco de Dados:** MySQL  
- **UI:** Shadcn/UI + Tailwind CSS  
- **Gerenciamento de Estado:** Zustand  

A aplicação oferece uma experiência completa para **Clientes** e **Administradores**, incluindo catálogo, carrinho, checkout, painel administrativo, relatórios e agora **novos recursos de gerenciamento de pedidos pelo cliente**.

---

# 📌 1. Introdução

A **TechStore v1.1.0** é um e-commerce especializado em **componentes e periféricos de PC**, construído com arquitetura totalmente desacoplada:

- **Backend:** API RESTful robusta em Java  
- **Frontend:** SPA moderna em React/TypeScript  
- **Banco MySQL:** Persistência consistente  

A versão **1.1.0** aprimora o sistema com:

✔ Fluxo de compras completo  
✔ Cancelamento de pedidos pelo cliente  
✔ Histórico detalhado de compras  
✔ Melhorias de CRUD e validações no Admin  
✔ Painel Administrativo refinado  

---

# 🎯 2. Objetivo do Sistema

A versão 1.1.0 busca consolidar um ecossistema completo de e-commerce com funcionalidades distintas para cada perfil de usuário.

## 👤 Fluxo do Cliente
- Criar conta e editar perfil  
- Navegar pelo catálogo de produtos  
- Gerenciar carrinho  
- Finalizar pedidos com validação de estoque  
- **Cancelar pedidos pendentes**  
- **Acessar histórico de compras detalhado**  

## 🛠️ Fluxo do Administrador
- Visualizar KPIs e métricas no Dashboard  
- Gerenciar estoque (CRUD completo)  
- Gerenciar pedidos e status  
- Cancelar pedidos  
- Visualizar relatórios de vendas e produtos  

---

# ⚙️ 3. Funcionalidades (Escopo v1.1.0)

## **3.1. Autenticação e Contas**
- Login com diferenciação de papéis (CLIENTE / ADMIN)  
- Registro de clientes  
- Logout seguro  

<img width="480" height="476" alt="image" src="https://github.com/user-attachments/assets/ce540911-fb8f-4997-9863-cfcda23b712f" />

---

## **3.2. Módulo do Cliente**

### 👤 Perfil
- Visualizar dados pessoais  
- Editar nome e endereço  
- Acessar todos os pedidos (incluindo cancelados)

<img width="944" height="633" alt="image" src="https://github.com/user-attachments/assets/57b59934-9445-4377-8753-d7a5fcdf844e" />


### 🛍️ Catálogo
- Listagem completa de produtos  
- Página de detalhes  

<img width="1902" height="925" alt="image" src="https://github.com/user-attachments/assets/e95a3891-74ed-4096-b1da-ec149192a3f0" />


### 🛒 Carrinho
- Adicionar itens  
- Atualizar quantidades  
- Remover itens  

<img width="929" height="412" alt="image" src="https://github.com/user-attachments/assets/6b26fc33-e615-496f-a3ab-c6869c38be03" />


### 🧾 Checkout
- Autopreenchimento dos dados do cliente  
- Validação de estoque  
- Finalização do pedido

<img width="933" height="597" alt="image" src="https://github.com/user-attachments/assets/c60cc114-a04f-4da9-bafe-aa2ff94ab5c2" />
  

### 📦 Meus Pedidos (NOVO v1.1.0)
- Listagem de todos os pedidos realizados  
- Visualização detalhada  
- **Cancelar pedidos pendentes**  
- Atualização automática do estoque ao cancelar  

<img width="937" height="536" alt="image" src="https://github.com/user-attachments/assets/6d8741bb-1c3f-47d2-a81f-4e639957b97f" />

---

## **3.3. Backend — Pedidos & Regras de Negócio**
- Criação de pedidos vinculados ao cliente  
- EstoqueInsuficienteException  
- Validações completas e consistentes  
- Atualização de estoque integrada  
- Cancelamento com regras específicas  

---

## **3.4. Painel Administrativo**

### 📊 Dashboard
- KPIs  
- Pedidos recentes  
- Estatísticas de vendas  
- Produtos mais vendidos  
- Alerta de baixo estoque

<img width="1920" height="760" alt="image" src="https://github.com/user-attachments/assets/27ea8864-b823-45bb-b91f-9324fcaa2914" />
 
### 📦 Gerenciamento de Estoque
- Criar produtos  
- Editar informações  
- Alterar imagem, categoria, preço e estoque  
- Excluir produtos

<img width="1920" height="929" alt="image" src="https://github.com/user-attachments/assets/9d437a08-4d82-4adc-bd15-5e673c064230" />


### 💰 Gerenciamento de Vendas
- Listagem completa  
- Detalhar pedidos  
- Atualizar status  
- Cancelar pedidos  

<img width="1920" height="928" alt="image" src="https://github.com/user-attachments/assets/26b4a669-75b1-41de-bd60-e7df13bcff41" />

---

# 📜 4. Casos de Uso (Use Cases)

## **UC Gerais**
| ID | Caso de Uso | Descrição |
|----|-------------|-----------|
| UC-001 | Login | Autenticar usuário |
| UC-002 | Registrar Conta | Criar conta de cliente |

---

## **UC — Cliente**
| ID | Ação | Descrição |
|----|-------|-----------|
| UC-101 | Visualizar Perfil | Ver informações pessoais |
| UC-102 | Editar Perfil | Alterar dados |
| UC-103 | Catálogo | Ver produtos |
| UC-104 | Adicionar ao Carrinho | Inserir item |
| UC-105 | Ajustar Carrinho | Atualizar quantidades |
| UC-106 | Remover Item | Excluir do carrinho |
| UC-107 | Finalizar Pedido | Criar pedido |
| UC-108 | Falha de Estoque | Bloquear compra inválida |
| UC-109 | Cancelar Pedido | Cancelar pedido pendente |
| UC-110 | Histórico de Pedidos | Ver lista completa de compras |

---

## **UC — Administrador**
| ID | Ação | Descrição |
|----|-------|-----------|
| UC-201 | Dashboard | Visualizar indicadores |
| UC-202 | Criar Produto | Criar novo item |
| UC-203 | Editar Produto | Atualizar dados |
| UC-204 | Excluir Produto | Remover do catálogo |
| UC-205 | Listar Vendas | Ver todos os pedidos |
| UC-206 | Gerenciar Pedido | Alterar status |
| UC-207 | Cancelar Pedido | Excluir/cancelar |

---

# 🧠 5. Ferramentas de I.A Utilizadas

### 🤖 Gemini 2.5 PRO (Google)
Usado para:
- Planejamento da arquitetura  
- Engenharia de prompts  
- Geração de documentação  
- Sugestões de design e fluxo  
- Modelagem de classes Java  

### ⚡ Bolt.new
Utilizado para:
- Scaffolding completo do frontend  
- Criação de componentes React  
- Geração da estrutura com Shadcn/UI  
- Criação de models TypeScript  
- Implementação dos serviços Axios  

---

# 📄 6. Principais Prompts Utilizados
Incluem prompts avançados para:
- Arquitetura React  
- Criação de stores Zustand  
- Configuração de rotas protegidas  
- Estrutura de layout Cliente/Admin  
- Estrutura de API REST  

> Consulte a documentação completa para ver todos os prompts detalhados.

---

# 📜 7. Licença

Este projeto está licenciado sob a **MIT License**.  
Consulte o arquivo **LICENSE** para mais informações.

---

# 👨‍💻 Desenvolvedor

**Kauã Oliveira**  
🔗 Portfólio: https://oliveirak.vercel.app  
