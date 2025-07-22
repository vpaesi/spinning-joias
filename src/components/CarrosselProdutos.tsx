import { Produto } from "../hooks/useProdutos";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../utils/FormataPreco";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarrosselProdutosProps {
  produtos: Produto[];
  onProdutoClick?: (produto: Produto) => void;
}

function CarrosselProdutos({
  produtos,
  onProdutoClick,
}: CarrosselProdutosProps) {
  const ultimosProdutos = produtos.slice(-10).reverse();
  const enableLoop = produtos.length >= 9;

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <h2 className="py-2 text-center text-2xl md:text-2xl">Novidades</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        navigation
        pagination={{ clickable: true }}
        loop={enableLoop}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        style={{
          paddingBottom: 32,
          paddingTop: 16,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {ultimosProdutos.map((produto) => (
          <SwiperSlide key={produto.id}>
            <div
              className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full card-produto-individual"
              onClick={() => { if (onProdutoClick) onProdutoClick(produto); }}
              style={{ height: "24rem" }}
            >
              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h5 className="font-bold text-lg mb-2">{produto.titulo}</h5>
                <div className="flex flex-col items-center mb-2">
                  <>
                    <span className="line-through text-gray-400 text-xs">
                      {formatoDoPrecoSemDesconto(produto.preco)}
                    </span>
                    <span className="text-blue-500 font-semibold">
                      {formatoDoPreco(produto.preco)}
                    </span>
                  </>
                </div>
                <button
                  className="mt-auto bg-yellow-700 text-white rounded px-3 py-1 hover:bg-yellow-800 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onProdutoClick) onProdutoClick(produto);
                  }}
                >
                  + Detalhes
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarrosselProdutos;
