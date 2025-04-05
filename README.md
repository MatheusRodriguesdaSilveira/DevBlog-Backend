## 📦 DevBlog - Backend

> API desenvolvida com Node.js, Express, TypeScript e Prisma, responsável por gerenciar os dados de postagens, categorias e usuários do blog.

### 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod
- JWT para autenticação
- CORS
- Dotenv

### 📁 Estrutura do projeto

```
src/
├── controllers/
├── routes/
├── middlewares/
├── services/
├── schemas/
├── prisma/
├── config/
├── utils/
└── index.ts
```

### 📌 Funcionalidades

- CRUD completo de postagens
- Sistema de login e autenticação JWT
- Criação e listagem de categorias
- Criação e gerenciamento de usuários
- Validações com Zod

### ▶️ Como executar o projeto

```bash
git clone https://github.com/MatheusRodriguesdaSilveira/DevBlog-Backend.git
cd DevBlog-Backend
npm install
```

Crie um arquivo `.env` com as variáveis de ambiente:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/devblog
JWT_SECRET=seusegredo
```

Execute as migrations do banco de dados:

```bash
npx prisma migrate dev
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

---

## 🌐 DevBlog - Frontend

> Interface do blog desenvolvida com React, Vite e TailwindCSS. Permite aos usuários visualizar postagens, categorias e interagir com o conteúdo de forma rápida e responsiva.

### 🚀 Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Zod + React Hook Form
- Context API

### 📌 Funcionalidades

- Listagem de posts por categoria
- Página individual de cada post
- Sistema de login
- Área administrativa para criar e deletar postagens
- Responsividade para mobile e desktop

### ▶️ Como executar o projeto

```bash
git clone https://github.com/MatheusRodriguesdaSilveira/DevBlog-Frontend.git
cd DevBlog-Frontend
npm install
```

Crie um arquivo `.env` com a URL da API:

```env
VITE_API_URL=http://localhost:3333
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

