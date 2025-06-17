import ListaProdutos from '../components/ListaProdutos';

function Home() {
  return (
    <>
      <section>
        <h5 className="produtos-section-titulo">Encontre a joia que dança com você!</h5>
        <div className="container px-4">
        <ListaProdutos usarCarrossel={true} />
        </div>        
      </section>

      <hr className="my-4" /> 

      <section>
        <div>
          <h5 className="produtos-section-titulo">Todos os produtos</h5>
          <ListaProdutos usarCarrossel={false} />
        </div>
      </section>
    </>
  );
}

export default Home;
