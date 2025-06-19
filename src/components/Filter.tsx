import React, { useState } from 'react';
import '../styles/filter.css';

interface Produto {
  preco: number;
}

interface FilterProps {
  produtos: Produto[];
  orderAlpha: string;
  setOrderAlpha: (value: string) => void;
  orderPreco: string;
  setOrderPreco: (value: string) => void;
  precoRange: [number, number];
  setPrecoRange: (range: [number, number]) => void;
}

const Filter: React.FC<FilterProps> = ({
  produtos,
  orderAlpha,
  setOrderAlpha,
  orderPreco,
  setOrderPreco,
  precoRange,
  setPrecoRange,
}) => {
  const [showFiltro, setShowFiltro] = useState(false);

  const minPreco = Math.min(...produtos.map(p => p.preco));
  const maxPreco = Math.max(...produtos.map(p => p.preco));

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    if (type === 'min') setPrecoRange([value, precoRange[1]]);
    else setPrecoRange([precoRange[0], value]);
  };

  return (
    <div className="filtro-container">
      <button
        className="filtro-toggle"
        onClick={() => setShowFiltro(!showFiltro)}
      >
        Filtros {showFiltro ? '▲' : '▼'}
      </button>

      {showFiltro && (
        <div className="filtro-box">
          <label className="filtro-label">Preço</label>
          <div className="filtro-range">
            <input
              type="range"
              min={minPreco}
              max={maxPreco}
              value={precoRange[0]}
              onChange={(e) => handleRangeChange(e, 'min')}
            />
            <input
              type="range"
              min={minPreco}
              max={maxPreco}
              value={precoRange[1]}
              onChange={(e) => handleRangeChange(e, 'max')}
            />
          </div>
          <p className="filtro-preco-text">
            R${precoRange[0].toFixed(2)} - R${precoRange[1].toFixed(2)}
          </p>

          <label className="filtro-label">Ordenar por nome</label>
          <select
            className="filtro-select"
            value={orderAlpha}
            onChange={(e) => setOrderAlpha(e.target.value)}
          >
            <option value="nome-asc">A-Z</option>
            <option value="nome-desc">Z-A</option>
            <option value="nome-random">Aleatório</option>
          </select>

          <label className="filtro-label">Ordenar por preço</label>
          <select
            className="filtro-select"
            value={orderPreco}
            onChange={(e) => setOrderPreco(e.target.value)}
          >
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
            <option value="preco-random">Aleatório</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Filter;
