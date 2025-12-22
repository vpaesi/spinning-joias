<section align="center">

# 💎 Spinning Joias

Este repositório contém a interface web do catálogo de produtos da Spinning Joias.

</section>

---

## 📌 Sobre o Projeto

A versão 2.0 foi criada utilizando React, Vite e TypeScript, trazendo uma arquitetura moderna e escalável para o projeto. Foram implementadas funcionalidades como navegação entre produtos, exibição detalhada de informações, integração com GitHub Gist para listagem dinâmica dos produtos e melhorias na experiência do usuário. Além disso, a estrutura do código foi organizada para facilitar a manutenção e a adição de novas features.

Mas a maior novidade nessa versão é a implementação de um carrinho que armazena dados em localStorage e permite que o usuário realize pedidos através de uma mensagem gerada automaticamente e em um clique todas as informações necessárias para finalizar a compra são enviadas para o WhatsApp da Spinning Joias.

**📦 Catálogo de Produtos**: Os dados dos produtos são armazenados em um GitHub Gist público, permitindo atualizações rápidas do catálogo sem necessidade de redeploy da aplicação. Isso facilita a gestão do inventário e a adição de novos produtos.

---

## ✨ Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://react.dev/learn/typescript)
- [Vite](https://vitejs.dev/)

---

## ⚙️ Como rodar localmente

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

### 4. Executar o projeto localmente

```bash
npm run dev
```

---

## 🧪 Como rodar os Testes

```bash
npm test
```

### Rodar cobertura de testes

```bash
npm test -- --coverage
```

Após rodar o comando acima, será gerada uma pasta `coverage/` com o relatório. Para visualizar o relatório detalhado, abra o arquivo `coverage/lcov-report/index.html` no seu navegador.

---

## 📁 Estrutura do diretorio
```
└── spinning-joias/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    │   └── produtos.json
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── BtnBackToTop.tsx
        │   ├── Footer.tsx
        │   ├── Header.tsx
        │   ├── Search.tsx
        │   ├── ThemeToggle.tsx
        │   ├── carrinho/
        │   │   ├── BtnLimparCarrinho.tsx
        │   │   ├── GeradorMensagemCarrinho.tsx
        │   │   ├── GrupoDadosPessoais.tsx
        │   │   ├── GrupoEndereco.tsx
        │   │   ├── InfoEntregaCarrinho.tsx
        │   │   ├── InfoProdutoCarrinho.tsx
        │   │   ├── InputFormCarrinho.tsx
        │   │   ├── PagamentoRadio.tsx
        │   │   ├── TabelaProdutoCarrinhoDesktop.tsx
        │   │   └── TabelaProdutoCarrinhoMobile.tsx
        │   ├── faq/
        │   │   ├── faqData.tsx
        │   │   ├── FaqImage.tsx
        │   │   ├── FaqItem.tsx
        │   │   └── FaqList.tsx
        │   ├── home/
        │   │   ├── Filter.tsx
        │   │   ├── HeroSection.tsx
        │   │   ├── Letreiro.tsx
        │   │   ├── LetreiroConteudo.tsx
        │   │   └── NavProdutosPrincipais.tsx
        │   ├── menu-hamburger/
        │   │   ├── MenuDropdownCategorias.tsx
        │   │   └── MenuHamburgerButton.tsx
        │   └── produto/
        │       ├── BtnAddCarrinho.tsx
        │       ├── BtnMaisDetalhes.tsx
        │       ├── CardProduto.tsx
        │       ├── CarrosselProdutos.tsx
        │       ├── ListaProdutos.tsx
        │       ├── ModalSelecionaCor.tsx
        │       ├── PaginacaoBotao.tsx
        │       ├── PaginacaoProdutos.tsx
        │       ├── ProdutosPorPaginaSelect.tsx
        │       ├── RenderizaProdutos.tsx
        │       └── TextoMostrandoProdutos.tsx
        ├── context/
        │   └── CarrinhoContext.tsx
        ├── hooks/
        │   └── useProdutos.ts
        ├── pages/
        │   ├── About.tsx
        │   ├── Carrinho.tsx
        │   ├── Faq.tsx
        │   ├── Home.tsx
        │   └── ProdutoDetalhes.tsx
        ├── routes/
        │   └── AppRoutes.tsx
        ├── styles/
        │   └── globals.css
        └── utils/
            ├── DadosSpinning.ts
            ├── formatadores.ts
            ├── formataPreco.ts
            ├── padronizaTextoDaPesquisa.ts
            ├── produtosUtils.ts
            ├── scrollToElement.ts
            ├── telefone.ts
            └── validacoesForm.ts
```

## 📊 Status do Projeto
<p> <a href="https://github.com/vpaesi/spinning-joias/commits"> <img src="https://img.shields.io/github/last-commit/vpaesi/spinning-joias" alt="última atualização"/> </a> <a href="https://github.com/vpaesi/spinning-joias/issues/"> <img src="https://img.shields.io/github/issues/vpaesi/spinning-joias" alt="issues abertas" /> </a> <a href="https://github.com/vpaesi/spinning-joias/blob/main/LICENSE"> <img src="https://img.shields.io/github/license/vpaesi/spinning-joias" alt="licença" /> </a> </p>
