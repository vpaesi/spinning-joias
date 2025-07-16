import { useState, useEffect } from "react";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../utils/FormataPreco";
import { Produto as ProdutoType, Cor } from "../hooks/useProdutos";

interface ProdutoModalProps {
  produto: ProdutoType | null;
  fecharModal: () => void;
}

function ModalProduto({ produto, fecharModal }: ProdutoModalProps) {
  const [corSelecionada, setCorSelecionada] = useState<Cor | null>(null);
  const [imagemPrincipal, setImagemPrincipal] = useState<string | null>(null);

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

  if (!produto) return null;

  const isCorSelecionada = (cor: Cor) =>
    corSelecionada && corSelecionada.nome === cor.nome;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={fecharModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
          onClick={fecharModal}
          aria-label="Fechar"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center">
            <img
              src={imagemPrincipal || produto.imagem}
              alt={produto.titulo}
              className="w-64 h-64 object-cover rounded mb-2"
            />
            {/* Imagens extras */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {produto.imagensExtras &&
                produto.imagensExtras.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Imagem extra"
                    className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-200 hover:border-yellow-700"
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
                    className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-200 hover:border-yellow-700"
                    onClick={() => selecionarImagemExtra(img)}
                  />
                ))}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{produto.titulo}</h2>
            <div className="mb-2 text-gray-600">{produto.categoria}</div>
            <div className="mb-2">
              <>
                <span className="line-through text-gray-400 text-sm mr-2">
                  {formatoDoPrecoSemDesconto(produto.preco)}
                </span>
                <span className="text-blue-500 font-semibold text-lg">
                  {formatoDoPreco(produto.preco)}
                </span>
              </>
            </div>
            <div className="mb-2">{produto.descricao}</div>
            {produto.informacoes_extras && (
              <div className="mb-2">
                <span className="font-semibold">informacoes_extras:</span>{" "}
                {produto.informacoes_extras}
              </div>
            )}
            {/* Cores */}
            {produto.cores && produto.cores.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Cores:</span>
                <div className="flex gap-2 mt-1">
                  {produto.cores.map((cor, idx) => (
                    <span
                      key={idx}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                        isCorSelecionada(cor)
                          ? "border-yellow-700"
                          : "border-gray-300"
                      }`}
                      style={
                        cor.codigo.includes("gradient")
                          ? { background: cor.codigo }
                          : { backgroundColor: cor.codigo }
                      }
                      title={cor.nome}
                      onClick={() => selecionarCor(cor)}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Contato WhatsApp */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href="http://wa.me/555181598553"
                className="text-blue-500 font-semibold no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp ml-1 m-2"></i>
                Encomende agora mesmo!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduto;
