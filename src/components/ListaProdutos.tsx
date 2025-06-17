import React, { useEffect, useState } from 'react';
import CardProduto from './CardProduto';
import type { Produto } from '../types/Produto';

interface Carrossel {
  categoria?: string;
  usarCarrossel?: boolean;
}

const ListaProdutos: React.FC<Carrossel> = ({ categoria, usarCarrossel = false }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = categoria 
    ? `${apiUrl}/produtos/categoria/${encodeURIComponent(categoria)}`
    : `${apiUrl}/produtos`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        return res.json();
      })
      .then(setProdutos)
      .catch((err) => {
        console.error('Erro ao carregar produtos:', err);
      });
  }, [categoria]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const listaNormal = (
    <div className='lista-produtos'>
      {produtos.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  );

  const listaCarrossel = (
    <div className="lista-carrossel">
      {produtos.map((produto) => (
        <div key={produto.id} className="lista-carrossel-card">
          <CardProduto produto={produto} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {usarCarrossel && isMobile ? listaCarrossel : listaNormal}
    </>
  );
};

export default ListaProdutos;
