import { Produto } from "../../hooks/useProdutos";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../../utils/formataPreco";
import BtnMaisDetalhes from "./BtnMaisDetalhes";

interface CardProdutoProps {
  produto: Produto;
  onDetalhes: () => void;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

export default function CardProduto({
  produto,
  onDetalhes,
  className = "",
  imgClassName = "",
  children,
}: CardProdutoProps) {
  return (
    <div
      className={`swiper-slide bg-white rounded shadow hover:shadow-lg transition ${className}`}
    >
      <img
        src={produto.fotoDestaque}
        alt={produto.titulo}
        className={`w-full h-44 object-cover rounded-t ${imgClassName}`}
      />
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex flex-col items-center justify-center flex-1">
          <h5 className="text-center font-bold text-base mb-2">
            {produto.titulo}
          </h5>
          <div className="flex flex-col items-center mb-2">
            <span className="line-through text-gray-400 text-xs">
              {formatoDoPrecoSemDesconto(produto.preco)}
            </span>
            <span className="text-blue-500 font-semibold">
              {formatoDoPreco(produto.preco)}
            </span>
          </div>
          {children}
        </div>
        <div className="flex gap-2 mt-auto">{BtnMaisDetalhes(onDetalhes)}</div>
      </div>
    </div>
  );
}
