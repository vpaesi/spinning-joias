import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListaProdutos from '../components/ListaProdutos';
import type { Produto } from '../types/Produto';
import Filter from '../components/Filter';

function SearchCategorias() {
  const { categoria } = useParams();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [orderAlpha, setOrderAlpha] = useState('nome-asc');
  const [orderPreco, setOrderPreco] = useState('preco-asc');
  const [precoRange, setPrecoRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!categoria) return;

    fetch(`${apiUrl}/produtos/categoria/${encodeURIComponent(categoria)}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        return res.json();
      })
      .then((data: Produto[]) => {
        setProdutos(data);

        // define faixa de preço automaticamente
        const precos = data.map(p => p.preco);
        const min = Math.min(...precos);
        const max = Math.max(...precos);
        setPrecoRange([min, max]);
      })
      .catch(err => console.error('Erro ao carregar produtos por categoria:', err));
  }, [categoria]);

  return (
    <>
      <section>
        <h5 className="produtos-section-titulo">Categoria: {categoria}</h5>
        <Filter 
          produtos={produtos}
          orderAlpha={orderAlpha}
          setOrderAlpha={setOrderAlpha}
          orderPreco={orderPreco}
          setOrderPreco={setOrderPreco}
          precoRange={precoRange}
          setPrecoRange={setPrecoRange}
        />
        <ListaProdutos
          produtos={produtos}
          usarCarrossel={false}
          orderAlpha={orderAlpha}
          orderPreco={orderPreco}
          precoRange={precoRange}
        />
      </section>
    </>
  );
}

export default SearchCategorias;
