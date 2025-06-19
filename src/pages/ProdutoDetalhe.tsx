import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Produto } from '../types/Produto';
import cart from '../assets/cart.png';

function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/produtos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Produto não encontrado');
        return res.json();
      })
      .then(setProduto)
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  const isDisabled = quantidade < 1;

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img className="card-img-top mb-5 mb-md-0" src={produto.imagem} alt={produto.nome} />
          </div>
          <div className="col-md-6">
            <h2 className="display-5 fw-bolder">{produto.nome}</h2>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">
                {(produto.preco * 1.1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span className="ms-2">
                {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <p className="lead">{produto.descricao}</p>
            <p className='lead'>{produto.informacoesExtras}</p>
            <div className="d-flex">
              <p style={{ paddingRight: '10px', paddingTop: '5px', margin: 0}}>Quantidade:</p>
              <input
                className="form-control text-center me-3"
                type="number"
                min={1}
                value={quantidade}
                onChange={e => setQuantidade(Math.max(1, Number(e.target.value)))}
                style={{ maxWidth: '4rem' }}
              />
              <button
                className="btn btn-outline-info"
                type="button"
                disabled={isDisabled}
                title={isDisabled ? "É necessário selecionar pelo menos 1 produto" : ""}
                style={isDisabled ? { cursor: 'not-allowed', opacity: 0.7 } : {}}
              >
                <i className="bi-cart-fill me-1"></i> Adicionar ao carrinho
                <img src={cart} alt="Adicionar ao carrinho" className="img-fluid" style={{ width: '20px', height: '20px', marginLeft: '5px' }}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProdutoDetalhe;
