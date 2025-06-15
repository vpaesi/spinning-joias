import React, { useEffect, useState } from 'react';
import CardProduto from './CardProduto';
import type { Produto } from '../types/Produto';

interface Carrossel {
  usarCarrossel?: boolean;
}

const ListaProdutos: React.FC<Carrossel> = ({ usarCarrossel = false }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetch('http://localhost:8080/produtos')
      .then((res) => res.json())
      .then(setProdutos);
  }, []);

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
