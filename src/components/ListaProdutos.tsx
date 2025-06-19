import React from 'react';
import CardProduto from './CardProduto';
import CarrosselProdutos from './CarrosselProdutos';
import type { Produto } from '../types/Produto';

interface ListaProdutosProps {
  produtos: Produto[];
  usarCarrossel?: boolean;
  orderAlpha: string;
  orderPreco: string;
  precoRange: [number, number];
}

const ListaProdutos: React.FC<ListaProdutosProps> = ({
  produtos,
  usarCarrossel = false,
  orderAlpha,
  orderPreco,
  precoRange,
}) => {
  const [min, max] = precoRange;

  // 1. Filtra por preço
  const filtrados = produtos.filter(
    (p) => p.preco >= min && p.preco <= max
  );

  // 2. Ordena
  const ordenados = [...filtrados].sort((a, b) => {
    if (orderAlpha === 'nome-asc') return a.nome.localeCompare(b.nome);
    if (orderAlpha === 'nome-desc') return b.nome.localeCompare(a.nome);

    if (orderPreco === 'preco-asc') return a.preco - b.preco;
    if (orderPreco === 'preco-desc') return b.preco - a.preco;

    return 0; // sem ordenação
  });

  // 3. Embaralha se pedido
  const final = orderAlpha === 'random'
    ? ordenados.sort(() => Math.random() - 0.5)
    : ordenados;

  return usarCarrossel ? (
    <CarrosselProdutos produtos={final} />
  ) : (
    <div className="lista-produtos">
      {final.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  );
};

export default ListaProdutos;
