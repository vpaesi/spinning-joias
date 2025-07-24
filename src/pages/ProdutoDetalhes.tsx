import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProdutos, Cor } from "../hooks/useProdutos";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../utils/formataPreco";
import dadosLoja from "../utils/DadosSpinning";

function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { produtos } = useProdutos();
  const [corSelecionada, setCorSelecionada] = useState<Cor | null>(null);
  const [imagemPrincipal, setImagemPrincipal] = useState<string | null>(null);

  const produto = produtos.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (produto) {
      setCorSelecionada(null);
      setImagemPrincipal(produto.imagem);
    }
  }, [produto]);

  useEffect(() => {
    if (corSelecionada) {
      if (corSelecionada.imagens && corSelecionada.imagens.length > 0) {
        setImagemPrincipal(corSelecionada.imagens[0]);
      } else if (corSelecionada.imagem) {
        setImagemPrincipal(corSelecionada.imagem);
      }
    } else if (produto) {
      setImagemPrincipal(produto.imagem);
    }
  }, [corSelecionada, produto]);

  function selecionarCor(cor: Cor) {
    setCorSelecionada(cor);
  }

  function selecionarImagemExtra(imagem: string) {
    setImagemPrincipal(imagem);
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
      {/* Breadcrumb */}
      <nav className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="hover:underline"
        >
          ← Voltar aos produtos
        </button>
      </nav>

      <div className="bg-white rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Seção de imagens */}
          <div className="flex-1 flex flex-col items-center">
            <img
              src={imagemPrincipal || produto.imagem}
              alt={produto.titulo}
              className="w-full max-w-md h-96 object-cover rounded mb-4"
            />
            
            {/* Imagens extras */}
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {produto.imagensExtras &&
                produto.imagensExtras.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Imagem extra"
                    className="w-20 h-20 object-cover rounded cursor-pointer border border-gray-200 hover:border-yellow-700 transition"
                    onClick={() => selecionarImagemExtra(img)}
                  />
                ))}
              {corSelecionada &&
                corSelecionada.imagens &&
                corSelecionada.imagens.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Imagem cor"
                    className="w-20 h-20 object-cover rounded cursor-pointer border border-gray-200 hover:border-yellow-700 transition"
                    onClick={() => selecionarImagemExtra(img)}
                  />
                ))}
            </div>
          </div>

          {/* Seção de informações */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{produto.titulo}</h1>
            
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
                <span className="font-semibold text-lg">Informações extras:</span>
                <p className="text-gray-700 mt-1 dark:text-white">{produto.informacoes_extras}</p>
              </div>
            )}

            {/* Cores */}
            {produto.cores && produto.cores.length > 0 && (
              <div className="mb-6">
                <span className="font-semibold text-lg mb-2 block">Cores disponíveis:</span>
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
                      <span className="text-xs mt-1 text-center">{cor.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contato WhatsApp */}
            <div className="mt-8">
              <a
                href={dadosLoja.socialMedia.whats}
                className="btn-produto-detalhe-encomende inline-flex items-center bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-800 transition text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp mr-2 text-xl"></i>
                Encomende agora mesmo!
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 py-4 border-t border-gray-200">
        <p className="text-gray-600 dark:text-white">
          Dúvida de como encomendar?{" "}
          <a
            href="/faq"
            className="text-blue-500 hover:underline font-medium"
          >
            Clique aqui!
          </a>
        </p>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;