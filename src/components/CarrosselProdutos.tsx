// CarrosselProdutos.tsx
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';
import CardProduto from './CardProduto';
import type { Produto } from '../types/Produto';

interface Props {
  produtos: Produto[];
}

const CarrosselProdutos: React.FC<Props> = ({ produtos }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={3}
      slidesPerView={2}
      className='carrossel-produtos'
    >
      {[...produtos]
      .sort((a, b) => (b.id as number) - (a.id as number))
      .map((produto) => (
        <SwiperSlide key={produto.id}>
        <CardProduto produto={produto} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarrosselProdutos;
