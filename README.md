<section align="center">

# 💎 Spinning Joias - Frontend

Este repositório contém a interface web do catálogo de produtos da Spinning Joias.

</section>

---

## 📌 Sobre o Projeto

Spinning Joias é uma aplicação desenvolvida para expor produtos da loja de forma clara e interativa.  
A versão atual é estática e foi criada com HTML, CSS e JavaScript puros, permitindo navegação por produtos e exibição de informações básicas.

Atualmente, se encontra em desenvolvimento uma nova versão (v2.0), iniciada na branch `dev`, com foco em uma **aplicação moderna**, totalmente integrada ao backend e com melhores funcionalidades para usuários e administradores.

---

## ✨ Tecnologias

### 📦 Versão atual (main)
- HTML5
- CSS3
- JavaScript

### 🚧 Versão 2.0 (branch `dev`)
- [React](https://react.dev/)
- [TypeScript](https://react.dev/learn/typescript)
- [Vite](https://vitejs.dev/)
- Integração com:
  - [Java + Spring Boot (backend)](https://github.com/vpaesi/spinning-joias-backend)

---

## ⚙️ Como rodar o front localmente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18+ recomendada)
- Git instalado

### 2. Clonar o repositório

```bash
git clone https://github.com/vpaesi/spinning-joias.git
cd spinning-joias
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Criar .env

Crie na raíz do repositório um arquivo `.env.local` com a porta local do seu backend. Por exemplo:

```ts
VITE_API_URL=http://localhost:8080
```

### 5. Executar o projeto localmente

```bash
npm run dev
```

## 📁 Estrutura Inicial
└── vpaesi-spinning-joias/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── produtos.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── .prettierignore
    ├── .prettierrc
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── CardProduto.tsx
        │   ├── Footer.tsx
        │   ├── HeroSection.tsx
        │   ├── ListaProdutos.tsx
        │   └── Nav.tsx
        ├── pages/
        │   └── Home.tsx
        └── types/
            └── Produto.ts

## 🚧 Roadmap
        ✅ Catálogo com HTML/CSS/JS
        ✅ Migração completa para React + Vite + TypeScript
        ✅ Integração com o backend
        🟡 Tela de Signup
        🟡 Tela de Login
        🟡 Tela de Carrinho
        🟡 Tela de Loading (mensagem para WhatsApp)
        ✅ Tela de Home, Header(nav) e Footer
        🟡 Ordenação, filtro e busca
        🟡 Tela individual de produto
        ✅ Integração com backend

## 🚧 Integração online
> Banco: [Neon](https://neon.com/)

> Backend: [Render](https://render.com/)


## 🔗 Repositórios Relacionados
[🔸 Backend - Spinning Joias](https://github.com/vpaesi/spinning-joias_backend)

## 📊 Status do Projeto
<p> 
  <a href="https://github.com/vpaesi/spinning-joias/commits"> 
    <img src="https://img.shields.io/github/last-commit/vpaesi/spinning-joias" alt="última atualização"/> 
  </a> 
  <a href="https://github.com/vpaesi/spinning-joias/issues/"> 
    <img src="https://img.shields.io/github/issues/vpaesi/spinning-joias" alt="issues abertas" />
  </a> 
  <a href="https://github.com/vpaesi/spinning-joias/blob/main/LICENSE"> 
    <img src="https://img.shields.io/github/license/vpaesi/spinning-joias" alt="licença" />
  </a> 
</p>
