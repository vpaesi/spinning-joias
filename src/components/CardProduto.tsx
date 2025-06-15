import React from 'react';
import type { Produto } from '../types/Produto';

interface CardProdutoProps {
  produto: Produto;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* Product image*/}
        <img 
        src={produto.imagem} 
        alt={produto.nome} 
        className="card-img-top"
        style={{ height: '220px', objectFit: 'cover' }}
        onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
          }}
        />
        {/* Product details*/}
        <div className="card-body p-4">
          {/* Product name*/}
          <h5 className="fw-bolder text-center">{produto.nome}</h5>

          {/* Product price*/}
          <div className="produto-preco">
            <span className="text-muted text-decoration-line-through">
              De:{' '}
              {(0.1 * produto.preco + produto.preco).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className="produto-preco-bottom">
            Por:{' '}
            {produto.preco.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>

        {/* Product actions*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <a className="btn btn-outline-dark mt-auto" href="#">
              Adicionar ao
              <img
                src="/src/assets/cart.png"
                alt="Carrinho"
                className="img-fluid"
                style={{ width: '20px', height: '20px', marginLeft: '5px' }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
