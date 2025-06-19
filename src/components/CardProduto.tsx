import React from 'react';
import { Link } from 'react-router-dom';
import cart from '../assets/cart.png';
import type { Produto } from '../types/Produto';

interface CardProdutoProps {
  produto: Produto;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {
  return (
  <div className="card-produto-container">
      <div className="card-produto">
        <Link to={`/produtos/${produto.id}`}>
          <img
          src={produto.imagem}
          alt={produto.nome}
          style={{ height: '220px', objectFit: 'cover' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
          }}
        /></Link>

        <div className="card-body">
          <h5 className="fw-bolder text-center p-3 card-produto-nome">{produto.nome}</h5>

          <div className='card-produto-preco'>
            <span className="card-produto-preco-top">
              De:{' '}
              {(0.1 * produto.preco + produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className='card-produto-preco-bottom'>
              Por:{' '}
              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>


        <div className="bg-transparent text-center d-flex gap-2 align-items-center justify-content-center">
          <Link to={`/produtos/${produto.id}`} className="card-produto-btn">Ver produto</Link>
          <Link className="card-produto-btn" to="#">
            <img
              src={cart}
              alt="Carrinho"
              className="img-fluid"
              style={{ width: '20px', height: '20px', marginLeft: '5px' }}
            />
          </Link>
        </div>
      </div>
  </div>
  );
};

export default CardProduto;
