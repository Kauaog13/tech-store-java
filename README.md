# 🛒 TechStore — Full-Stack (Java + React)

O **TechStore** é um sistema completo de e-commerce para venda de hardware e periféricos.
O projeto utiliza uma arquitetura desacoplada, com:

* **API REST** em **Java + Spring Boot**
* **Frontend moderno** em **React + TypeScript**

---

## 🚀 Tecnologias Utilizadas

### **Backend (API)**

* Java 17
* Spring Boot 3

  * Web
  * Security
  * Data JPA
  * Validation
* MySQL (Persistência)
* JWT (Autenticação)
* Maven (Gerenciamento de dependências)

### **Frontend (Interface)**

* React + TypeScript + Vite
* Tailwind CSS + Shadcn/UI
* Zustand (Estado global)
* Axios (Requisições à API)
* Recharts (Gráficos do Dashboard)

---

## ⚙️ Pré-requisitos

Antes de iniciar o projeto, instale:

* **Java JDK 17+**
* **Node.js 18+ e npm**
* **MySQL Server**
* **Maven** (opcional se usar mvnw ou IDE)

---

## 🛠️ Como Rodar o Projeto

---

## **1️⃣ Configurar o Banco de Dados**

Acesse seu cliente MySQL e crie o banco:

```sql
CREATE DATABASE techstore_db;
```

Edite o arquivo:

```
backend/src/main/resources/application.properties
```

E configure suas credenciais:

```
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_AQUI
```

---

## **2️⃣ Executar o Backend**

No terminal, acesse a pasta do backend:

```bash
cd backend
```

Execute a aplicação:

### Usando Maven instalado:

```bash
mvn spring-boot:run
```

### Usando o Maven Wrapper:

Linux/Mac:

```bash
./mvnw spring-boot:run
```

Windows:

```bash
.\mvnw.cmd spring-boot:run
```

🔎 Na primeira execução, o sistema criará as tabelas automaticamente e inserirá dados iniciais.
🌐 **API rodando em:** `http://localhost:8080/api`

---

## **3️⃣ Executar o Frontend**

No terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

🌐 **Frontend acessível em:** `http://localhost:5173`

---

## 🔑 Credenciais de Acesso (Padrão)

O projeto já inclui dois usuários de teste:

| Perfil        | Email                                                 | Senha      | Acesso                     |
| ------------- | ----------------------------------------------------- | ---------- | -------------------------- |
| Administrador | [admin@techstore.com](mailto:admin@techstore.com)     | admin123   | Dashboard, Estoque, Vendas |
| Cliente       | [cliente@techstore.com](mailto:cliente@techstore.com) | cliente123 | Loja, Carrinho, Perfil     |

---

## 📌 Funcionalidades Principais

### 👤 **Módulo do Cliente**

* Catálogo de produtos com fotos e descrições
* Carrinho de compras completo
* Checkout com simulação de pagamento
* Histórico de pedidos
* Cancelamento de pedidos pendentes

### 🛡️ **Módulo do Administrador**

* Dashboard com gráficos e métricas
* CRUD completo de produtos
* Gerenciamento de estoque
* Gestão de pedidos e atualização de status

---

## 🐛 Solução de Problemas Comuns

### ❌ Erro de Conexão com Banco

* Confirme se o MySQL está rodando
* Verifique usuário e senha no `application.properties`

### ❌ Porta Ocupada

* Backend → Porta **8080**
* Frontend → Porta **5173**
* Altere se necessário

### ❌ Erro de CORS

* Backend aceita apenas `http://localhost:5173` por padrão
* Ajustar em `SecurityConfig.java` se mudar a porta do frontend

