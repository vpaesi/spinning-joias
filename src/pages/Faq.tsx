function FAQ() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Perguntas Frequentes (FAQ)</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Como posso fazer um pedido?</h2>
          <p>Você pode fazer um pedido diretamente pelo nosso site, selecionando os produtos desejados e adicionando-os ao carrinho.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Quais são as formas de pagamento aceitas?</h2>
          <p>Aceitamos cartões de crédito, débito e pagamentos via Pix.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Qual é o prazo de entrega?</h2>
          <p>O prazo de entrega varia de acordo com a sua localização. Geralmente, leva entre 5 a 10 dias úteis.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Posso trocar ou devolver um produto?</h2>
          <p>Sim, você pode trocar ou devolver um produto em até 30 dias após o recebimento, desde que esteja em perfeitas condições.</p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
