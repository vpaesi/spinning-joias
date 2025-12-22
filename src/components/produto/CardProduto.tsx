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
      className={`swiper-slide bg-white rounded shadow hover:shadow-lg transition ${className} dark:border dark:border-gray-700 dark:bg-gray-800 h-96 flex flex-col`}
    >
      <img
        src={produto.fotoDestaque}
        alt={produto.titulo}
        className={`w-full h-56 object-cover rounded-t ${imgClassName}`}
      />
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div className="flex flex-col items-center text-center">
          <h5 className="font-bold text-xs mb-1 line-clamp-2 min-h-[2rem]">
            {produto.titulo}
          </h5>
          <div className="flex flex-col items-center mb-2">
            <span className="line-through text-gray-400 text-xs">
              {formatoDoPrecoSemDesconto(produto.preco)}
            </span>
            <span className="text-blue-500 font-semibold text-sm">
              {formatoDoPreco(produto.preco)}
            </span>
          </div>
          {children}
        </div>
        <div className="flex gap-2">{BtnMaisDetalhes(onDetalhes)}</div>
      </div>
    </div>
  );
}
