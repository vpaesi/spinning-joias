import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Produto } from "../../hooks/useProdutos";
import CardProduto from "./CardProduto";

interface CarrosselProdutosProps {
  produtos: Produto[];
}

export default function CarrosselProdutos({
  produtos,
}: CarrosselProdutosProps) {
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
            <CardProduto
              produto={produto}
              onDetalhes={() => irParaProduto(produto)}
              imgClassName="h-48"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
