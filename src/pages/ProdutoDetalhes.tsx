import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProdutos, Cor } from "../hooks/useProdutos";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../utils/formataPreco";
import BtnAddCarrinho from "../components/produto/BtnAddCarrinho";

function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { produtos } = useProdutos();
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
      <nav className="mb-6 flex justify-between items-center">
      <button
        onClick={() => navigate("/")}
        className="hover:underline px-2 py-1 sm:px-4 sm:py-2"
      >
        ← Voltar aos produtos
      </button>
      <button
        className="flex items-center gap-1 bg-yellow-700 text-white px-2 py-1 rounded hover:bg-yellow-800 transition sm:px-4 sm:py-2"
        onClick={() => navigate("/carrinho")}
      >
        <i className="bi bi-bag"></i> Ver Carrinho
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
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {miniaturas.map((img, idx) => (
            <img
            key={idx}
            src={img}
            alt={`Miniatura ${idx + 1}`}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition
              ${
              fotoDestaquePrincipal === img
                ? "border-yellow-700"
                : "border-gray-200 hover:border-yellow-700"
              }`}
            onClick={() => setfotoDestaquePrincipal(img)}
            />
          ))}
          </div>
        )}
        </div>

        <div className="flex-1">
        <h3 className="text-3xl font-bold mb-4">{produto.titulo}</h3>

        <div className="mb-6">
          <span className="line-through text-gray-400 text-lg mr-2">
          {formatoDoPrecoSemDesconto(produto.preco)}
          </span>
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
          <div className="flex gap-3 mt-2">
            {produto.cores.map((cor, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
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
            </div>
            ))}
          </div>
          </div>
        )}

        <div className="mt-8">
          <BtnAddCarrinho
          produto={produto}
          className="btn-produto-detalhe-encomende inline-flex items-center bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-800 transition text-lg"
          />
        </div>

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
        Dúvida de como realizar a compra?{" "}
        <a href="/faq" className="text-blue-500 hover:underline font-medium">
        Clique aqui!
        </a>
      </p>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;
