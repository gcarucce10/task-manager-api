# Task Manager API

Task Manager API é uma aplicação backend desenvolvida com **Node.js**, **Express**, **TypeScript** e **Prisma ORM**. O objetivo é gerenciar tarefas, com funcionalidades de autenticação de usuários e operações CRUD para tarefas. O projeto está em desenvolvimento e será expandido com um frontend no futuro.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **Express**: Framework para criação de APIs.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Prisma ORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização da aplicação e banco de dados.

## ⚙️ Funcionalidades

### Autenticação
- Registro de usuários.
- Login com geração de token JWT.

### Gerenciamento de Tarefas (em desenvolvimento)
- Criar, listar, editar e excluir tarefas.

## 🛠️ Como Executar

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **Docker** e **Docker Compose**

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Configure o arquivo `.env`:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```properties
   DATABASE_URL="postgresql://postgres:minhasenha@db:5432/taskmanager?schema=public"
   ```

3. Suba os containers:
   ```bash
   docker-compose up -d
   ```

4. Aplique as migrações do Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`.

## 🛣️ Rotas Principais

### Autenticação
- **POST** `/auth/register`: Registro de usuário.
- **POST** `/auth/login`: Login de usuário.

### Tarefas (em desenvolvimento)
- **GET** `/tasks`: Lista todas as tarefas.
- **POST** `/tasks`: Cria uma nova tarefa.
- **PUT** `/tasks/:id`: Atualiza uma tarefa.
- **DELETE** `/tasks/:id`: Remove uma tarefa.

---

**Nota**: Este projeto está em desenvolvimento ativo e pode sofrer alterações. 🚀