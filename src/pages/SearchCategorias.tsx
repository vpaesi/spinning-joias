import { useParams } from 'react-router-dom';
import ListaProdutos from '../components/ListaProdutos';

function SearchCategorias() {
    const {categoria} = useParams();

  return (
    <>
      <section>
        <div>
          <h5 className="produtos-section-titulo">Categoria: {categoria}</h5>
          <ListaProdutos categoria={categoria} usarCarrossel={false} />
        </div>
      </section>
    </>
  );
}

export default SearchCategorias;
