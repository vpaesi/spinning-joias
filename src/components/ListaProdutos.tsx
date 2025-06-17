import React, { useEffect, useState } from 'react';
import CardProduto from './CardProduto';
import type { Produto } from '../types/Produto';
import CarrosselProdutos from './CarrosselProdutos';

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

  // Embaralha os produtos para exibir em ordem aleatória
  const produtosAleatorios = React.useMemo(() => {
    const copia = [...produtos];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }, [produtos]);

  const listaNormal = (
    <div className='lista-produtos'>
      {produtosAleatorios.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  );

const listaCarrossel = <CarrosselProdutos produtos={produtos} />;

  return (
    <>
      {usarCarrossel && isMobile ? listaCarrossel : listaNormal}
    </>
  );
};

export default ListaProdutos;
