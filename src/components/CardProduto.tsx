import React from 'react';
import cart from '../assets/cart.png';
import type { Produto } from '../types/Produto';

interface CardProdutoProps {
  produto: Produto;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {
  return (
    <div className="col mb-5 card-produto">
      <div className="card h-100">
        <img 
        src={produto.imagem} 
        alt={produto.nome} 
        className="card-img-top"
        style={{ height: '220px', objectFit: 'cover' }}
        onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
          }}
        />

        <div className="card-body p-4">
          <h5 className="fw-bolder text-center">{produto.nome}</h5>

          <div className='produto-preco'>
              <span className="produto-preco-top">
                De:{' '}
                {(0.1 * produto.preco + produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span className='produto-preco-bottom'>
                Por:{' '}
                {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
          </div>
        </div>


        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
            <a className="btn btn-outline-info mt-auto p-2" href="#">
              Adicionar ao
              <img
              src={cart}
              alt="Carrinho"
              className="img-fluid"
              style={{ width: '20px', height: '20px', marginLeft: '5px' }}
              />
            </a>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
