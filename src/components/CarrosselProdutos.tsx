import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Produto } from "../hooks/useProdutos";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../utils/formataPreco";

interface CarrosselProdutosProps {
  produtos: Produto[];
}

function CarrosselProdutos({ produtos }: CarrosselProdutosProps) {
  const navigate = useNavigate();
  const ultimosProdutos = produtos.slice(-10).reverse();

  function irParaProduto(produto: Produto) {
    navigate(`/produto/${produto.id}`);
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-6 bg-white">
      <h2 className="py-2 text-center text-2xl md:text-2xl">Novidades</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={6500}
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
              className="carrossel-produto-individual bg-white rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full card-produto-individual"
              onClick={() => irParaProduto(produto)}
              style={{ height: "24rem" }}
            >
              <img
                src={produto.fotoDestaque}
                alt={produto.titulo}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h5 className="font-bold text-lg mb-1 text-center">
                  {produto.titulo}
                </h5>
                <div className="flex flex-col items-center justify-center flex-1 my-2 gap-1">
                  <span className="line-through text-gray-400 text-xs">
                    {formatoDoPrecoSemDesconto(produto.preco)}
                  </span>
                  <span className="text-blue-500 font-semibold text-lg">
                    {formatoDoPreco(produto.preco)}
                  </span>
                </div>
                <button
                  className="mt-auto bg-yellow-700 text-white rounded px-3 py-1 hover:bg-yellow-800 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    irParaProduto(produto);
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
