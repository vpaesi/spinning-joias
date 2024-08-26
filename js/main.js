document.addEventListener("DOMContentLoaded", () => {
  const produtosContainer = document.getElementById("produtos");
  const pesquisaInput = document.getElementById("pesquisa-joia");
  const selectMenu = document.getElementById("menu__produtos-opcoes");
  const precoMenu = document.getElementById("menu__preco");
  const mensagemMenuProdutos = document.getElementById(
    "mensagem__menu-produtos"
  );
  const mensagemBarraDePesquisa = document.getElementById(
    "mensagem__barra-pesquisa"
  );
  const modal = document.getElementById("produto-modal");
  const modalClose = document.querySelector(".modal-close");
  const modalImagemPrincipal = document.getElementById(
    "modal-produto-imagem-principal"
  );
  const modalTitulo = document.getElementById("modal-produto-titulo");
  const modalDescricao = document.getElementById("modal-produto-descricao");
  const modalPreco = document.getElementById("modal-produto-preco");
  const modalPrecoPrata = document.getElementById("modal-produto-preco-prata");
  const modalPrecoOuro = document.getElementById("modal-produto-preco-ouro");
  const modalMaterial = document.getElementById("modal-produto-material");
  const modalCores = document.getElementById("modal-produto-cores");
  const modalImagensExtras = document.getElementById(
    "modal-produto-imagens-extras"
  );
  const modalFotos = document.getElementById("modal-produto-fotos");

  let produtos = [];
  let page = 1;
  const pageSize = 20;

  function mostrarProdutos(produtos) {
    if (produtos.length === 0) {
      produtosContainer.innerHTML = "";
    } else {
      const produtosHtml = produtos
        .map(
          (produto) => `
            <div class="produto" data-produto-id="${produto.id}">
              <img src="${produto.imagem}" alt="${
            produto.titulo
          }" class="produto__imagem">
              <div class="produto-img-overlay">
                <h5 class="produto-titulo">${produto.titulo}</h5>
                ${
                  produto.cores && produto.cores.length > 0
                    ? `<div class="produto-cores">Disponível em: ${produto.cores
                        .map((cor) => {
                          const corEstilo = cor.codigo.includes("gradient")
                            ? `background: ${cor.codigo};`
                            : `background-color: ${cor.codigo};`;
                          return `<span class="cor" data-cor-imagem="${cor.imagem}" style="${corEstilo};"></span>`;
                        })
                        .join("")}</div>`
                    : ""
                }
              </div>
              <p class="produto-preco">
              Preço: ${
                produto.preco !== undefined
                  ? `R$ ${produto.preco},00`
                  : `<br>de R$ ${produto.precoOuro},00 à R$ ${produto.precoPrata},00`
              }
              </p>
              <button class="btn-saiba-mais">+ Detalhes</button>
            </div>
          `
        )
        .join("");

      produtosContainer.innerHTML = produtosHtml;

      document.querySelectorAll(".produto").forEach((produtoElemento) => {
        produtoElemento.addEventListener("click", (event) => {
          const produtoId = event.currentTarget.dataset.produtoId;
          const produtoSelecionado = produtos.find((p) => p.id == produtoId);
          if (produtoSelecionado) {
            abrirModal(produtoSelecionado);
          }
        });
      });

      // Adiciona o evento de clique para o botão "Saiba Mais"
      document.querySelectorAll(".btn-saiba-mais").forEach((botao) => {
        botao.addEventListener("click", (event) => {
          // Impede o evento de clique do produto de ser acionado
          event.stopPropagation();

          // Encontra o produto associado ao botão clicado
          const produtoElemento = event.currentTarget.closest(".produto");
          const produtoId = produtoElemento.dataset.produtoId;
          const produtoSelecionado = produtos.find((p) => p.id == produtoId);
          if (produtoSelecionado) {
            abrirModal(produtoSelecionado);
          }
        });
      });
    }
  }

  function abrirModal(produto) {
    // Limpa o conteúdo do modal antes de adicionar novos dados
    modalTitulo.textContent = "";
    modalDescricao.innerHTML = "";
    modalPreco.innerHTML = "";
    modalPrecoPrata.innerHTML = "";
    modalPrecoOuro.innerHTML = "";
    modalMaterial.innerHTML = "";
    modalImagemPrincipal.src = "";
    modalCores.innerHTML = "";
    modalImagensExtras.innerHTML = "";
    modalFotos.innerHTML = "";

    // Verifica e insere o título
    if (produto.titulo) {
      modalTitulo.textContent = produto.titulo;
    }

    // Verifica e insere a descrição
    if (produto.descricao) {
      modalDescricao.innerHTML = `<strong>Descrição:</strong> ${produto.descricao}`;
    }

    // Verifica e insere o preço da prata
    if (produto.precoPrata) {
      modalPrecoPrata.innerHTML = `<strong>Preço da joia em prata 925:</strong> R$ ${produto.precoPrata},00`;
      // Esconde o preço principal se houver preço da prata
      modalPreco.innerHTML = "";
    }
    if (produto.precoOuro) {
      // Verifica e insere o preço do ouro
      modalPrecoOuro.innerHTML = `<strong>Preço da joia banhada a ouro 18k:</strong> R$ ${produto.precoOuro},00`;
      // Esconde o preço principal se houver preço do ouro
      modalPreco.innerHTML = "";
    } else if (produto.preco) {
      // Verifica e insere o preço principal se não houver preço da prata nem do ouro
      modalPreco.innerHTML = `<strong>Preço:</strong> R$ ${produto.preco},00`;
    }

    // Verifica e insere o material
    if (produto.material) {
      modalMaterial.innerHTML = `<strong>Material:</strong> ${produto.material}.`;
    }

    // Verifica e insere a imagem principal
    if (produto.imagem) {
      modalImagemPrincipal.src = produto.imagem;
    }

    // Verifica e insere as cores
    if (produto.cores && produto.cores.length > 0) {
      const textoCores = document.createElement("p");
      textoCores.innerHTML =
        "<strong>Selecione uma cor para visualizar o produto:</strong>";
      modalCores.appendChild(textoCores);

      produto.cores.forEach((cor) => {
        const corElemento = document.createElement("span");
        corElemento.className = "cor";

        // Se o código da cor for um gradiente
        if (cor.codigo.includes("gradient")) {
          corElemento.style.background = cor.codigo;
        } else {
          corElemento.style.backgroundColor = cor.codigo;
        }

        corElemento.dataset.corImagens = JSON.stringify(cor.imagens);

        corElemento.addEventListener("click", () => {
          atualizarImagemPrincipal(cor.nome, produto.id);

          // Limpa e insere as imagens adicionais para a cor selecionada
          modalFotos.innerHTML = ""; // Limpa as imagens anteriores
          if (cor.imagens && cor.imagens.length > 0) {
            cor.imagens.forEach((imagem) => {
              imgElemento.addEventListener("click", () => {
                const imgElemento = document.createElement("img");
                imgElemento.src = imagem;
                imgElemento.className = "imagem";
                // Atualiza a imagem principal quando uma imagem adicional é clicada
                modalImagemPrincipal.src = imagem;
                modalImagemPrincipal.alt = `Imagem do produto`;
              });
              modalFotos.appendChild(imgElemento);
            });
          }
        });

        modalCores.appendChild(corElemento);
      });
    }

    // Verifica e insere as imagens extras
    if (produto.imagensExtras && produto.imagensExtras.length > 0) {
      const textoImagensExtras = document.createElement("p");
      textoImagensExtras.innerHTML =
        "<strong>Selecione uma imagem adicional para visualizar mais detalhes do produto:</strong>";
      modalImagensExtras.appendChild(textoImagensExtras);

      produto.imagensExtras.forEach((imagemExtra) => {
        const imgElemento = document.createElement("img");
        imgElemento.src = imagemExtra;
        imgElemento.className = "imagem-adicional";
        imgElemento.addEventListener("click", () => {
          // Atualiza a imagem principal quando uma imagem adicional é clicada
          modalImagemPrincipal.src = imagemExtra;
          modalImagemPrincipal.alt = `Imagem adicional do produto`;
        });
        modalImagensExtras.appendChild(imgElemento); // Adiciona imagens ao modalImagensExtras
      });
    }

    // Exibe o modal
    modal.style.display = "block";
    console.log("aqui");

    // Adiciona evento para fechar o modal
    modalClose.addEventListener("click", fecharModal);

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        fecharModal();
      }
    });
  }

  function atualizarImagemPrincipal(corSelecionada, produtoSelecionadoId) {
    // Encontrar o produto correspondente
    const produto = produtos.find((p) => p.id === produtoSelecionadoId);

    if (produto && produto.cores) {
      // Encontrar a cor selecionada
      const cor = produto.cores.find((c) => c.nome === corSelecionada);
      if (cor && cor.imagens && cor.imagens.length > 0) {
        // Atualizar a imagem principal
        modalImagemPrincipal.src = cor.imagens[0];
        modalImagemPrincipal.alt = `Imagem do produto na cor ${corSelecionada}`;

        // Limpar imagens adicionais
        modalFotos.innerHTML = "";
      } else {
        // Se não houver fotos para a cor selecionada
        modalImagemPrincipal.src = produto.imagem; // Volta para a imagem principal
        modalImagemPrincipal.alt = "Imagem não disponível";
      }
    }
  }

  function fecharModal() {
    modal.style.display = "none";
  }

  modalClose.addEventListener("click", fecharModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      fecharModal();
    }
  });

  function fetchProdutos(page, pageSize) {
    return fetch("produtos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }

  function padronizaTextoDaPesquisa(text) {
    return text
      ? text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      : "";
  }

  function randomizarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function atualizarDisplayDeProdutos() {
    const consultapesquisa = padronizaTextoDaPesquisa(pesquisaInput.value);
    const categoriaSelecionada = selectMenu.value;

    let produtosFiltrados = produtos;

    if (consultapesquisa) {
      produtosFiltrados = produtos.filter((produto) => {
        const titulo = padronizaTextoDaPesquisa(produto.titulo);
        const material = padronizaTextoDaPesquisa(produto.material);
        const descricao = padronizaTextoDaPesquisa(produto.descricao);
        const categoria = padronizaTextoDaPesquisa(produto.categoria);

        // Verifica se a pesquisa está contida em qualquer um dos atributos normalizados
        return (
          titulo.includes(consultapesquisa) ||
          material.includes(consultapesquisa) ||
          descricao.includes(consultapesquisa) ||
          categoria.includes(consultapesquisa)
        );
      });
      precoMenu.addEventListener("change", () => {
        const odemDePrecoSelecionada = precoMenu.value;

        if (odemDePrecoSelecionada === "menor-maior") {
          produtosFiltrados.sort((a, b) => a.precoOculto - b.precoOculto);
        } else if (odemDePrecoSelecionada === "maior-menor") {
          produtosFiltrados.sort((a, b) => b.precoOculto - a.precoOculto);
        }

        mostrarProdutos(produtosFiltrados);
      });
    }

    if (categoriaSelecionada !== "todos") {
      produtosFiltrados = produtosFiltrados.filter(
        (produto) => produto.categoria === categoriaSelecionada
      );
      precoMenu.addEventListener("change", () => {
        const odemDePrecoSelecionada = precoMenu.value;

        if (odemDePrecoSelecionada === "menor-maior") {
          produtosFiltrados.sort((a, b) => a.precoOculto - b.precoOculto);
        } else if (odemDePrecoSelecionada === "maior-menor") {
          produtosFiltrados.sort((a, b) => b.precoOculto - a.precoOculto);
        }

        mostrarProdutos(produtosFiltrados);
      });
    } else {
      produtosFiltrados = randomizarArray(produtosFiltrados);
    }

    if (produtosFiltrados.length === 0) {
      if (categoriaSelecionada !== "todos" && !consultapesquisa) {
        mensagemMenuProdutos.textContent =
          "Nenhum produto encontrado na categoria selecionada.";
        mensagemMenuProdutos.style.display = "block";
        mensagemBarraDePesquisa.style.display = "none";
      } else if (consultapesquisa) {
        mensagemBarraDePesquisa.textContent =
          "Nenhum produto encontrado com a busca fornecida. Tente usar termos mais amplos.";
        mensagemBarraDePesquisa.style.display = "block";
        mensagemMenuProdutos.style.display = "none";
      } else {
        mensagemBarraDePesquisa.style.display = "none";
        mensagemMenuProdutos.style.display = "none";
      }
    } else {
      mensagemBarraDePesquisa.style.display = "none";
      mensagemMenuProdutos.style.display = "none";
    }

    mostrarProdutos(produtosFiltrados);
  }

  function carregarMaisProdutos() {
    fetchProdutos(page, pageSize).then((data) => {
      if (data && data.length > 0) {
        data.forEach((produto) => {
          if (!produtos.some((p) => p.id === produto.id)) {
            produtos.push(produto);
          }
        });
        atualizarDisplayDeProdutos();
        page += 1;
      }
    });
    console.log(produtos);
  }

  selectMenu.addEventListener("change", () => {
    pesquisaInput.value = "";
    pesquisaInput.placeholder = "Pesquise a joia que é a sua cara!";
    atualizarDisplayDeProdutos();
  });

  pesquisaInput.addEventListener("input", () => {
    selectMenu.value = "todos";
    atualizarDisplayDeProdutos();
  });

  precoMenu.addEventListener("change", () => {
    const odemDePrecoSelecionada = precoMenu.value;

    let produtosFiltrados = produtos;

    if (odemDePrecoSelecionada === "menor-maior") {
      produtosFiltrados.sort((a, b) => a.precoOculto - b.precoOculto);
    } else if (odemDePrecoSelecionada === "maior-menor") {
      produtosFiltrados.sort((a, b) => b.precoOculto - a.precoOculto);
    }

    mostrarProdutos(produtosFiltrados);
  });

  function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      carregarMaisProdutos();
    }
  }

  window.addEventListener("scroll", checkScroll);

  carregarMaisProdutos(); // Carrega produtos inicialmente
});
