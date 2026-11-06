# Spinning Joias

Site de catálogo para consultar os produtos da Spinning Joias. A pessoa visitante pode pesquisar, navegar por categorias, ordenar e paginar os produtos, além de consultar fotos, descrições, preços e variações.

O site não possui carrinho, checkout nem formulário de pedido. Para tirar dúvidas ou conversar sobre disponibilidade, a pessoa deve falar diretamente com a loja pelos canais institucionais.

## Dados e imagens

- Os dados dos produtos ficam em [`public/produtos.json`](public/produtos.json), servido pelo próprio site.
- As fotos associadas localmente ficam em `public/images/produtos/` e são referenciadas no JSON por caminhos como `/images/produtos/nome-da-foto.jpg`.
- A foto atual do produto #5 (“Colar prata: Patins maciço”) permanece hospedada externamente por decisão aprovada; os metadados do catálogo continuam locais.
- Para atualizar produtos ou fotos, altere os arquivos correspondentes, confira as referências e publique uma nova versão do site.

## Tecnologias

- React 18 e TypeScript
- Vite
- React Router
- Tailwind CSS
- Jest e Testing Library

## Executar localmente

Requisitos: Node.js 18 ou mais recente e Git.

```bash
git clone https://github.com/vpaesi/spinning-joias.git
cd spinning-joias
npm install
npm run dev
```

## Verificações

```bash
npm test
npm run lint
npm run build
```

Os testes cobrem funções de busca e catálogo, carregamento do JSON local, referências de imagens, detalhes do produto e ausência de ações de compra.

## Arquivos de planejamento

- [`SPEC-CATALOGO-NAVEGAVEL.md`](SPEC-CATALOGO-NAVEGAVEL.md): escopo, critérios de aceite e plano de execução.
- [`DECISOES-CATALOGO.md`](DECISOES-CATALOGO.md): decisões e registro das sessões.
- [`MAPA-FOTOS-PRODUTOS.md`](MAPA-FOTOS-PRODUTOS.md) e [`MAPA-FOTOS-PRODUTOS.csv`](MAPA-FOTOS-PRODUTOS.csv): associação das fotos aos produtos.
- [`INVENTARIO-SECAO-2.md`](INVENTARIO-SECAO-2.md): inventário do catálogo, imagens e referências.

## Estrutura principal

```text
public/
├── images/produtos/      # Fotos usadas pelo catálogo
└── produtos.json         # Dados locais dos produtos
src/
├── components/           # Cabeçalho, navegação, FAQ e componentes de produto
├── hooks/useProdutos.ts  # Carregamento do catálogo local
├── pages/                # Home, detalhes, FAQ e sobre
├── routes/               # Rotas do site e compatibilidade com /carrinho
└── utils/                # Busca, formatação e utilitários
```
