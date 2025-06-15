import ListaProdutos from '../components/ListaProdutos';

function Home() {
  return (
    <>
      <section className="py-5">
        <h5 className="text-center">Encontre a joia que dança com você!</h5>
        <div className="container px-4 px-lg-5 mt-5">
        <ListaProdutos usarCarrossel={true} />
        </div>        
      </section>
      
      <section>
        <div>
          <h5 className="text-center">Todos os produtos</h5>
          <ListaProdutos usarCarrossel={false} />
        </div>
      </section>
    </>
  );
}

export default Home;
