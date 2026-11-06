import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProdutos, Cor } from "../hooks/useProdutos";
import { formatoDoPreco } from "../utils/formataPreco";

function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { produtos, loading, erro } = useProdutos();
  const [corSelecionada, setCorSelecionada] = useState<Cor | null>(null);
  const [fotoDestaquePrincipal, setfotoDestaquePrincipal] = useState<
    string | null
  >(null);

  const produto = produtos.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (produto) {
      setCorSelecionada(null);
      setfotoDestaquePrincipal(produto.fotoDestaque);
    }
  }, [produto]);

  useEffect(() => {
    if (corSelecionada) {
      if (corSelecionada.fotoCor && corSelecionada.fotoCor.length > 0) {
        setfotoDestaquePrincipal(corSelecionada.fotoCor[0]);
      } else if (corSelecionada.fotoDestaque) {
        setfotoDestaquePrincipal(corSelecionada.fotoDestaque);
      }
    } else if (produto) {
      setfotoDestaquePrincipal(produto.fotoDestaque);
    }
  }, [corSelecionada, produto]);

  function selecionarCor(cor: Cor) {
    setCorSelecionada(cor);
  }

  const miniaturasSet = new Set<string>();
  if (produto?.fotoDestaque) miniaturasSet.add(produto.fotoDestaque);

  if (produto?.cores) {
    produto.cores.forEach((cor) => {
      if (cor.fotoCor) cor.fotoCor.forEach((img) => miniaturasSet.add(img));
    });
  }

  if (produto?.fotosAdicionais)
    produto.fotosAdicionais.forEach((img) => miniaturasSet.add(img));

  const miniaturas = Array.from(miniaturasSet);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" role="status">
        Carregando produto...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" role="alert">
        Não foi possível carregar o catálogo. {erro}
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 transition"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  const isCorSelecionada = (cor: Cor) =>
    corSelecionada && corSelecionada.nome === cor.nome;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <nav className="mb-6 flex justify-start items-center">
        <button
          onClick={() => navigate("/")}
          className="hover:underline px-2 py-1 sm:px-4 sm:py-2"
        >
          ← Voltar aos produtos
        </button>
      </nav>

      <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
        <img
          src={fotoDestaquePrincipal || produto.fotoDestaque}
          alt={produto.titulo}
          className="w-full max-w-md h-96 object-cover rounded mb-4"
        />

        {miniaturas.length > 1 && (
          <div
            role="group"
            aria-label="Galeria de fotos do produto"
            className="flex gap-2 mt-2 flex-wrap justify-center"
          >
          {miniaturas.map((img, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Ver foto ${idx + 1} de ${miniaturas.length} de ${produto.titulo}`}
              aria-pressed={fotoDestaquePrincipal === img}
              className={`w-16 h-16 overflow-hidden rounded border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700
              ${
              fotoDestaquePrincipal === img
                ? "border-yellow-700"
                : "border-gray-200 hover:border-yellow-700"
              }`}
            onClick={() => setfotoDestaquePrincipal(img)}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          </div>
        )}
        </div>

        <div className="flex-1">
        <h3 className="text-3xl font-bold mb-4">{produto.titulo}</h3>

        <div className="mb-6">
          <span className="text-blue-500 font-semibold text-2xl">
          {formatoDoPreco(produto.preco)}
          </span>
        </div>

        <div className="mb-6 text-gray-700 text-lg leading-relaxed dark:text-white">
          {produto.descricao}
        </div>

        {produto.informacoes_extras && (
          <div className="mb-6">
          <span className="font-semibold text-lg">
            Informações extras:
          </span>
          <p className="text-gray-700 mt-1 dark:text-white">
            {produto.informacoes_extras}
          </p>
          </div>
        )}

        {produto.cores && produto.cores.length > 0 && (
          <div className="mb-6">
          <span className="font-semibold text-lg mb-2 block">
            Cores disponíveis:
          </span>
          <div className="flex gap-3 mt-2" role="group" aria-label="Cores disponíveis">
            {produto.cores.map((cor, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Selecionar cor ${cor.nome}`}
              aria-pressed={Boolean(isCorSelecionada(cor))}
              className="flex flex-col items-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
              onClick={() => selecionarCor(cor)}
            >
              <span
              className={`w-8 h-8 rounded-full border-2 ${
                isCorSelecionada(cor)
                ? "border-yellow-700"
                : "border-gray-600"
              }`}
              style={
                cor.codigo.includes("gradient")
                ? { background: cor.codigo }
                : { backgroundColor: cor.codigo }
              }
              title={cor.nome}
              />
              <span className="text-xs mt-1 text-center">
              {cor.nome}
              </span>
            </button>
            ))}
          </div>
          </div>
        )}

        <div className="mt-4 text-gray-600 dark:text-white">
          <p className="text-sm">
          Obs.: Algumas imagens foram geradas por IA a partir de fotos
          reais e podem ter pequenas variações em relação ao produto
          original.
          </p>
        </div>
        </div>
      </div>
      </div>

      <div className="text-center mt-8 py-4 border-t border-gray-200">
      <p className="text-gray-600 dark:text-white">
        Tem dúvidas sobre este produto ou sobre como falar com a loja?{" "}
        <Link to="/faq" className="text-blue-500 hover:underline font-medium">
          Consulte as perguntas frequentes.
        </Link>
      </p>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;
