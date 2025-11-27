<p align="center">
  <img src="./assets/images/BannersTechStore/TechStoreBanner.png" alt="TechStore Banner" />
</p>

# 🛒 TechStore v1.1.3 — Sistema de Loja Online (Full-Stack)

Este repositório contém a versão **1.1.3** da **TechStore**, um sistema completo de e-commerce desenvolvido com:

- **Backend:** Java (Spring Boot) + Maven  
- **Frontend:** React + TypeScript + Vite  
- **Banco de Dados:** MySQL  
- **UI:** Shadcn/UI + Tailwind CSS  
- **Gerenciamento de Estado:** Zustand  

A aplicação oferece uma experiência completa para **Clientes** e **Administradores**, incluindo catálogo, carrinho, checkout, painel administrativo, relatórios e agora **novos recursos de gerenciamento de pedidos pelo cliente**.

---

# 📌 1. Introdução

A **TechStore v1.1.3** é um e-commerce especializado em **componentes e periféricos de PC**, construído com arquitetura totalmente desacoplada:

- **Backend:** API RESTful robusta em Java  
- **Frontend:** SPA moderna em React/TypeScript  
- **Banco MySQL:** Persistência consistente  

A versão **1.1.3** aprimora o sistema com:

✔ Fluxo de compras completo  
✔ Cancelamento de pedidos pelo cliente  
✔ Histórico detalhado de compras  
✔ Melhorias de CRUD e validações no Admin  
✔ Painel Administrativo refinado  

---

# 🎯 2. Objetivo do Sistema

A versão 1.1.3 busca consolidar um ecossistema completo de e-commerce com funcionalidades distintas para cada perfil de usuário.

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

# ⚙️ 3. Funcionalidades (Escopo v1.1.3)

## **3.1. Autenticação e Contas**
- Login com diferenciação de papéis (CLIENTE / ADMIN)  
- Registro de clientes  
- Logout seguro
  
<img width="437" height="641" alt="image" src="https://github.com/user-attachments/assets/7b332b1e-d196-47b0-95c1-1309e15c4770" />
<img width="435" height="458" alt="image" src="https://github.com/user-attachments/assets/4e8fae67-c5f4-43a5-979f-6c8e777eac8c" />

## **3.2. Módulo do Cliente**

### 💻 Home
- Banners Dinâmicos rolando
- Seção de Políticas de Garantia
- Produtos em Destaque
- Dark Mode / White Mode

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/772391f4-0cf0-407f-80f3-ee17519233b7" />

### 👤 Perfil
- Visualizar dados pessoais  
- Editar nome e endereço  
- Acessar todos os pedidos (incluindo cancelados)

<img width="938" height="872" alt="image" src="https://github.com/user-attachments/assets/2ec32d69-7ad9-4b5f-a286-bfa2a8324591" />

### 🛍️ Catálogo
- Listagem completa de produtos  
- Página de detalhes
- Página Detalhada do Produto

<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/26dfc715-e73d-46b6-ade8-a707663da721" />

### 🛒 Carrinho
- Adicionar itens  
- Atualizar quantidades  
- Remover itens  

<img width="979" height="432" alt="image" src="https://github.com/user-attachments/assets/e4c5b283-7207-4cc3-b93f-626c57b56520" />

### 🧾 Checkout
- Autopreenchimento dos dados do cliente  
- Validação de estoque  
- Finalização do pedido
- Comprovante Digital

<img width="592" height="870" alt="image" src="https://github.com/user-attachments/assets/e98eb0d0-9b96-4950-b885-c8a1d1b43a4a" />
<img width="491" height="776" alt="image" src="https://github.com/user-attachments/assets/4a6e7c3f-53c4-4b13-b613-a9d024f47784" />

### 📦 Meus Pedidos
- Listagem de todos os pedidos realizados  
- Visualização detalhada  
- **Cancelar pedidos pendentes**  
- Atualização automática do estoque ao cancelar  

<img width="926" height="529" alt="image" src="https://github.com/user-attachments/assets/3e1572e9-bb6b-400e-becd-6e756ccbe6e5" />
<img width="759" height="651" alt="image" src="https://github.com/user-attachments/assets/3f5e2ed2-ff2b-4dcb-9eb6-2372178d9559" />

---

## **3.3. Regras de Negócio**
- Criação de pedidos vinculados ao cliente  
- EstoqueInsuficienteException  
- Validações completas e consistentes  
- Atualização de estoque integrada  
- Cancelamento com regras específicas  

---

## **3.4. Módulo do Administrador**

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

### 🤖 Gemini 2.5/3.0 PRO (Google)
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
