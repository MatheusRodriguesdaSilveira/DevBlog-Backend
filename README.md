<h1 align="center">📂 DevBlog - Backend</h1>

<p align="center">
  API RESTful desenvolvida para o projeto DevBlog, com gerenciamento de posts, usuários, curtidas, comentários, seguidores/seguindo e autenticação segura.<br />
  <br />
  <a href="https://github.com/MatheusRodriguesdaSilveira/DevBlog-Backend/issues">Reportar Bug</a>
  ·
  <a href="https://github.com/MatheusRodriguesdaSilveira/DevBlog-Backend/pulls">Solicitar Feature</a>
</p>

---

## 🚀 Tecnologias Utilizadas

<div align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,ts,express,postgres,prisma,git,vscode" />
</div>

- **Node.js** + **TypeScript**
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Auth

---

## ⚙️ Funcionalidades

- 📝 CRUD de users
- 📝 CRUD de posts
- 📝 CRUD de comentários
- 📝 CRUD de likes
- 📝 CRUD de follows
- 👤 Autenticação de usuários
- 🔐 Roteamento com proteção por token JWT
- 📁 Upload de imagens
- 🔎 Filtro de posts por autor ou data

---

## 📂 Estrutura do Projeto

```
backend/
├─ dist/
├─ prisma/
├─ src/
│  ├─ @types/
│  ├─ config/
│  ├─ controllers/
│  │  ├─ follower/
│  │  ├─ like/
│  │  ├─ post/
│  │  └─ user/
│  ├─ middlewares/
│  ├─ prisma/
│  ├─ services/
│  │  ├─ follower/
│  │  ├─ like/
│  │  ├─ post/
│  │  └─ user/
│  ├─ utils/
│  ├─ views/
│  ├─ routes.ts
│  └─ server.ts
├─ .env
├─ .gitignore
├─ copia.env
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.json
└─ vercel.json
```

---

## 🛠️ Como usar

```bash
# Clone o repositório
git clone https://github.com/MatheusRodriguesdaSilveira/DevBlog-Backend

# Instale as dependências
npm install

# Configure o banco de dados em .env

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

---

## 📬 Contato

[![LinkedIn](https://img.shields.io/badge/-Matheus%20Rodrigues-0A66C2?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-rodrigues-da-silveira/)
[![Portfólio](https://img.shields.io/badge/-Portfólio-000?style=flat&logo=ko-fi&logoColor=white)](https://portfolio-matheussilveira.vercel.app)

---

<p align="center">
  Feito com 💙 por Matheus Rodrigues
</p>
