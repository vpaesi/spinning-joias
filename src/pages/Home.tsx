import { useEffect, useState } from 'react';
import ListaProdutos from '../components/ListaProdutos';
import Filter from '../components/Filter';
import type { Produto } from '../types/Produto';

function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [orderAlpha, setOrderAlpha] = useState('nome-asc');
  const [orderPreco, setOrderPreco] = useState('preco-asc');
  const [precoRange, setPrecoRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/produtos`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        return res.json();
      })
      .then((data) => {
        setProdutos(data);
        // Calcula range inicial com base nos dados
        const precos = data.map((p: Produto) => p.preco);
        const min = Math.min(...precos);
        const max = Math.max(...precos);
        setPrecoRange([min, max]);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  return (
    <>
      <section>
        <h5 className="produtos-section-titulo">Todos os produtos</h5>
        <div className="container px-4">
          <ListaProdutos
          produtos={produtos}
          usarCarrossel={true}
          orderAlpha={orderAlpha}
          orderPreco={orderPreco}
          precoRange={precoRange}
        />
        </div>
      </section>

      <hr className="my-4" />

      <section>
        <h6 className="produtos-section-titulo">Encontre a joia que dança com você!</h6>
          <Filter
            produtos={produtos}
            orderAlpha={orderAlpha}
            setOrderAlpha={setOrderAlpha}
            orderPreco={orderPreco}
            setOrderPreco={setOrderPreco}
            precoRange={precoRange}
            setPrecoRange={setPrecoRange}            
          />

        <div className="container px-4">
          <ListaProdutos
            produtos={produtos}
            usarCarrossel={false}
            orderAlpha={orderAlpha}
            orderPreco={orderPreco}
            precoRange={precoRange}
          />
        </div>
      </section>
    </>
  );
}

export default Home;
