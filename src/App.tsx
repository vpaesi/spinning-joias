import { useEffect, useRef, useState } from "react";

interface Cor {
  nome: string;
  codigo: string;
  imagem?: string;
  imagens?: string[];
}

interface Produto {
  id: number;
  titulo: string;
  nome?: string;
  descricao: string;
  preco?: number;
  precoPrata?: number;
  precoOuro?: number;
  precoOculto?: number;
  categoria: string;
  imagem: string;
  imagensExtras?: string[];
  material?: string;
  cores?: Cor[];
}

const PAGE_SIZE = 20;

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [precoOrdem, setPrecoOrdem] = useState("");
  const [modalProduto, setModalProduto] = useState<Produto | null>(null);
  const [modalCorSelecionada, setModalCorSelecionada] = useState<Cor | null>(null);
  const [modalImagemPrincipal, setModalImagemPrincipal] = useState<string | null>(null);
  const [mensagemMenuProdutos, setMensagemMenuProdutos] = useState("");
  const [mensagemBarraDePesquisa, setMensagemBarraDePesquisa] = useState("");
  const produtosContainerRef = useRef<HTMLDivElement>(null);

  // Carregar produtos (simulando fetch de um arquivo local)
  useEffect(() => {
    fetch("/produtos.json")
      .then((res) => res.json())
      .then((data: Produto[]) => {
        setProdutos(data);
        setProdutosFiltrados(randomizarArray(data));
      });
    // eslint-disable-next-line
  }, []);

  // Atualizar produtos filtrados ao mudar pesquisa/categoria/preço
  useEffect(() => {
    let filtrados = [...produtos];

    if (pesquisa) {
      const consulta = padronizaTextoDaPesquisa(pesquisa);
      filtrados = filtrados.filter((produto) => {
        const titulo = padronizaTextoDaPesquisa(produto.titulo);
        const material = padronizaTextoDaPesquisa(produto.material || "");
        const descricao = padronizaTextoDaPesquisa(produto.descricao);
        const categoriaProduto = padronizaTextoDaPesquisa(produto.categoria);
        return (
          titulo.includes(consulta) ||
          material.includes(consulta) ||
          descricao.includes(consulta) ||
          categoriaProduto.includes(consulta)
        );
      });
    }

    if (categoria !== "todos") {
      filtrados = filtrados.filter((produto) => produto.categoria === categoria);
    }

    if (precoOrdem === "menor-maior") {
      filtrados.sort((a, b) => (a.precoOculto ?? 0) - (b.precoOculto ?? 0));
    } else if (precoOrdem === "maior-menor") {
      filtrados.sort((a, b) => (b.precoOculto ?? 0) - (a.precoOculto ?? 0));
    }

    if (filtrados.length === 0) {
      if (categoria !== "todos" && !pesquisa) {
        setMensagemMenuProdutos("Nenhum produto encontrado na categoria selecionada.");
        setMensagemBarraDePesquisa("");
      } else if (pesquisa) {
        setMensagemBarraDePesquisa(
          "Nenhum produto encontrado com a busca fornecida. Tente usar termos mais amplos."
        );
        setMensagemMenuProdutos("");
      } else {
        setMensagemBarraDePesquisa("");
        setMensagemMenuProdutos("");
      }
    } else {
      setMensagemBarraDePesquisa("");
      setMensagemMenuProdutos("");
    }

    setProdutosFiltrados(filtrados);
  }, [produtos, pesquisa, categoria, precoOrdem]);

  // Scroll infinito
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      ) {
        carregarMaisProdutos();
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, [produtos, page]);

  function carregarMaisProdutos() {
    setPage((prev) => prev + 1);
  }

  function padronizaTextoDaPesquisa(text: string) {
    return text
      ? text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      : "";
  }

  function randomizarArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Modal
  function abrirModal(produto: Produto) {
    setModalProduto(produto);
    setModalCorSelecionada(null);
    setModalImagemPrincipal(produto.imagem);
  }

  function fecharModal() {
    setModalProduto(null);
    setModalCorSelecionada(null);
    setModalImagemPrincipal(null);
  }

  function selecionarCor(cor: Cor) {
    setModalCorSelecionada(cor);
    if (cor.imagens && cor.imagens.length > 0) {
      setModalImagemPrincipal(cor.imagens[0]);
    } else if (cor.imagem) {
      setModalImagemPrincipal(cor.imagem);
    }
  }

  function selecionarImagemExtra(imagem: string) {
    setModalImagemPrincipal(imagem);
  }

  // Botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTopBtn");
      if (btn) {
        btn.style.display = window.scrollY > 200 ? "block" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Renderização
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/img/logo-spinning.jpg"
            alt="Logo da Spinning Joias"
            className="w-16 h-16 object-contain"
          />
          <h1 className="text-2xl font-bold text-yellow-700">
            <a href="/" className="no-underline text-yellow-700 hover:text-yellow-800">
              <b>Spinning</b> Joias
            </a>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <img src="/img/whatsapp-claro.png" alt="Logo do whatsapp" className="w-8 h-8" />
          <a
            href="http://wa.me/555181598553"
            className="text-black no-underline hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Dúvidas? Nos chame no whatsapp!</span>
          </a>
        </div>
      </header>
      <div className="bg-yellow-100 py-2 text-center text-yellow-800 font-semibold">
        Embelezando os melhores patinadores artísticos desde 2012
      </div>

      {/* BANNER */}
      <section className="bg-yellow-50 py-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Já sabe qual joia você quer?</h2>
        <p className="mb-4">Encontre em nossa loja a joia que representa a sua paixão!</p>
        <div className="flex justify-center items-center gap-2 mb-2">
          <input
            type="search"
            className="border rounded px-3 py-2 w-72"
            id="pesquisa-joia"
            name="pesquisaJoia"
            placeholder="Pesquise a joia que é a sua cara!"
            value={pesquisa}
            onChange={e => {
              setPesquisa(e.target.value);
              setCategoria("todos");
            }}
          />
          <i className="fa fa-search text-yellow-700" aria-hidden="true"></i>
        </div>
        <p className="text-sm text-gray-700">Todas as nossas semijoias são antialérgicas!</p>
      </section>

      {/* MENU PRODUTOS */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-white py-4">
        <div>
          <label htmlFor="menu__produtos-opcoes" className="mr-2 font-semibold">
            Escolha a categoria do produto:
          </label>
          <select
            id="menu__produtos-opcoes"
            name="opcoes"
            value={categoria}
            onChange={e => {
              setCategoria(e.target.value);
              setPesquisa("");
            }}
            className="border rounded px-2 py-1"
          >
            <option value="todos">Todos os produtos</option>
            {[...new Set(produtos.map(p => p.categoria))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="menu__preco" className="mr-2 font-semibold">
            Ordenar por preço:
          </label>
          <select
            id="menu__preco"
            name="preco"
            value={precoOrdem}
            onChange={e => setPrecoOrdem(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Selecione</option>
            <option value="menor-maior">Menor para Maior</option>
            <option value="maior-menor">Maior para Menor</option>
          </select>
        </div>
      </div>

      {/* MENSAGENS */}
      {mensagemMenuProdutos && (
        <div className="text-center text-red-600 mb-4">{mensagemMenuProdutos}</div>
      )}
      {mensagemBarraDePesquisa && (
        <div className="text-center text-red-600 mb-4">{mensagemBarraDePesquisa}</div>
      )}

      {/* PRODUTOS */}
      <main className="container mx-auto px-4 py-6">
        <div
          ref={produtosContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {produtosFiltrados.slice(0, page * PAGE_SIZE).map(produto => (
            <div
              key={produto.id}
              className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col"
              onClick={() => abrirModal(produto)}
            >
              <img
                src={produto.imagem}
                alt={produto.titulo}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h5 className="font-bold text-lg mb-2">{produto.titulo}</h5>
                <div className="text-gray-500 text-sm mb-1">
                  {produto.categoria}
                </div>
                <div className="flex flex-col items-center mb-2">
                  {produto.preco !== undefined ? (
                    <>
                      <span className="line-through text-gray-400 text-xs">
                        {(produto.preco * 1.1).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <span className="text-green-700 font-semibold">
                        {produto.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </>
                  ) : (
                    <>
                      {produto.precoPrata && (
                        <span>
                          Prata:{" "}
                          {produto.precoPrata.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      )}
                      {produto.precoOuro && (
                        <span>
                          Ouro:{" "}
                          {produto.precoOuro.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <button
                  className="mt-auto bg-yellow-700 text-white rounded px-3 py-1 hover:bg-yellow-800 transition"
                  onClick={e => {
                    e.stopPropagation();
                    abrirModal(produto);
                  }}
                >
                  + Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL PRODUTO */}
      {modalProduto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={fecharModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
            onClick={e => e.stopPropagation()}
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
                  src={modalImagemPrincipal || modalProduto.imagem}
                  alt={modalProduto.titulo}
                  className="w-64 h-64 object-cover rounded mb-2"
                />
                {/* Imagens extras */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {modalProduto.imagensExtras &&
                    modalProduto.imagensExtras.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Imagem extra"
                        className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-200 hover:border-yellow-700"
                        onClick={() => selecionarImagemExtra(img)}
                      />
                    ))}
                  {modalCorSelecionada &&
                    modalCorSelecionada.imagens &&
                    modalCorSelecionada.imagens.map((img, idx) => (
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
                <h2 className="text-2xl font-bold mb-2">{modalProduto.titulo}</h2>
                <div className="mb-2 text-gray-600">{modalProduto.categoria}</div>
                <div className="mb-2">
                  {modalProduto.preco !== undefined ? (
                    <>
                      <span className="line-through text-gray-400 text-sm mr-2">
                        {(modalProduto.preco * 1.1).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <span className="text-green-700 font-semibold text-lg">
                        {modalProduto.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </>
                  ) : (
                    <>
                      {modalProduto.precoPrata && (
                        <span className="mr-2">
                          Prata:{" "}
                          {modalProduto.precoPrata.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      )}
                      {modalProduto.precoOuro && (
                        <span>
                          Ouro:{" "}
                          {modalProduto.precoOuro.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="mb-2">{modalProduto.descricao}</div>
                {modalProduto.material && (
                  <div className="mb-2">
                    <span className="font-semibold">Material:</span> {modalProduto.material}
                  </div>
                )}
                {/* Cores */}
                {modalProduto.cores && modalProduto.cores.length > 0 && (
                  <div className="mb-2">
                    <span className="font-semibold">Cores:</span>
                    <div className="flex gap-2 mt-1">
                      {modalProduto.cores.map((cor, idx) => (
                        <span
                          key={idx}
                          className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                            modalCorSelecionada === cor
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
                  <img src="/img/whatsapp-medio.png" alt="Logo do whatsapp" className="w-8 h-8" />
                  <a
                    href="http://wa.me/555181598553"
                    className="text-green-700 font-semibold no-underline hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Encomende agora mesmo!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-yellow-700 text-white mt-8">
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Spinning Joias</h2>
            <ul>
              <li className="font-semibold mb-1">Contato</li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/whatsapp.png" alt="Logo do whatsapp" className="w-5 h-5" />
                <a
                  href="http://wa.me/555181598553"
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whatsapp
                </a>
              </li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/instagram.png" alt="Logo do instagram" className="w-5 h-5" />
                <a
                  href="https://www.instagram.com/patricia_spinningjoias/"
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <ul className="mt-4">
              <li className="font-semibold mb-1">Métodos de pagamento</li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/dinheiro.png" alt="Notas de dinheiro" className="w-5 h-5" />
                Dinheiro em espécie* ou Pix
              </li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/cartao.png" alt="Cartão de banco" className="w-5 h-5" />
                Cartão de crédito ou débito*
              </li>
              <li className="text-xs text-gray-200 mt-1">
                * Cartões e dinheiro em espécie são aceitos apenas em eventos de patinação
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold mb-1">Onde nos encontrar</li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/pin.png" alt="Pino de Localização" className="w-5 h-5" />
                Porto Alegre/RS - Brasil
              </li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/delivery.gif" alt="Caminhão de entrega" className="w-5 h-5" />
                Entregamos para todo território brasileiro!
              </li>
              <li className="flex items-center gap-2 mb-1">
                <img src="/img/info.png" alt="Ícone de informação" className="w-5 h-5" />
                Estamos presentes com stands vendendo nossos produtos em diversos eventos e competições de patinação artística no Brasil.
              </li>
            </ul>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6912.428799042886!2d-51.190908000559894!3d-29.97326782512093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197a184eef1175%3A0x155e88aafab8a9fd!2sFarrapos%2C%20Porto%20Alegre%20-%20RS!5e0!3m2!1spt-PT!2sbr!4v1723582340047!5m2!1spt-PT!2sbr"
              height={250}
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Spinning Joias"
            ></iframe>
          </div>
        </div>
        <div className="text-center py-4 bg-yellow-800 text-sm">
          © Criado e desenvolvido por{" "}
          <a
            href="https://portfolio-vitoria-de-camargo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vitória de Camargo
          </a>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      <button
        id="backToTopBtn"
        title="Voltar ao Topo"
        className="fixed bottom-6 right-6 bg-yellow-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-50"
        style={{ display: "none" }}
        onClick={scrollToTop}
      >
        ⬆
      </button>
    </div>
  );
}

export default App
