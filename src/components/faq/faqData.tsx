import produtoDetalhesAdicionarCarrinho from "../../assets/produto-detalhes-adicionar-carrinho.png";
import produtoDetalhesSelecaoVariacao from "../../assets/produto-detalhes-selecao-variacao.png";
import produtoDetalhesSelecaoVariacaoToast from "../../assets/produto-detalhes-selecao-variacao-toast.png";
import btnCarrinhoDesktop from "../../assets/btn-carrinho-desktop.png";
import btnCarrinhoMobileMenu from "../../assets/btn-carrinho-mobile-menu.png";
import btnCarrinhoMobileProduto from "../../assets/btn-carrinho-mobile-produto.png";
import carrinhoInfoEntrega from "../../assets/carrinho-info-entrega.png";
import carrinhoMensagemFinaliza from "../../assets/carrinho-mensagem-finaliza.png";
import diferenca_semijoia from "../../assets/diferenca_semijoia.jpg";
import dadosLoja from "../../utils/DadosSpinning";
import FaqImage from "./FaqImage";
import { extrairNumeroTelefone } from "../../utils/telefone";

export interface TabelaFreteItem {
  regiao: string;
  valor: number;
}

export interface FaqItem {
  pergunta: string;
  resposta: JSX.Element;
}

export const tabelaDeFrete: TabelaFreteItem[] = [
  { regiao: "Sul", valor: 15.0 },
  { regiao: "Sudeste", valor: 25.0 },
  { regiao: "Centro-Oeste", valor: 35.0 },
  { regiao: "Nordeste", valor: 40.0 },
  { regiao: "Norte", valor: 50.0 },
];

export const faqData: FaqItem[] = [
  {
    pergunta: "Como comprar online?",
    resposta: (
      <>
        <p>
          Ao acessar a página de um produto você pode ajustar a quantidade que
          deseja do produto e clicar em "Adicionar ao carrinho", veja:
        </p>
        <FaqImage
          src={produtoDetalhesAdicionarCarrinho}
          alt="Adicionar produto ao carrinho"
          maxWidth="md"
        />
        <p className="mt-4">
          Se o produto tiver variações (cor/tamanho), abrirá uma caixa para que
          você selecione a variação que deseja:
        </p>
        <FaqImage
          src={produtoDetalhesSelecaoVariacao}
          alt="Selecionar variação do produto"
          maxWidth="md"
        />
        <p className="mt-4">
          Pronto! O produto foi adicionado ao seu carrinho. E aparecerá uma
          notificação no canto superior direito da tela, como este:
        </p>
        <FaqImage
          src={produtoDetalhesSelecaoVariacaoToast}
          alt="Confirmação de adição ao carrinho"
          maxWidth="sm"
        />
      </>
    ),
  },
  {
    pergunta: "Como faço para ver os produtos no carrinho?",
    resposta: (
      <>
        <p>
          Se você estiver pelo celular, pode acessar o seu carrinho clicando no
          ícone de menu e então em "Ver carrinho", veja:
        </p>
        <FaqImage
          src={btnCarrinhoMobileMenu}
          alt="Botão de carrinho no mobile"
          maxWidth="sm"
        />
        <p className="mt-4">
          Ou, na página do produto, você pode clicar em "Ver carrinho", veja:
        </p>
        <FaqImage
          src={btnCarrinhoMobileProduto}
          alt="Botão de carrinho no mobile"
          maxWidth="sm"
        />
        <p className="mt-4">
          Se você estiver no computador/desktop, pode acessar o seu carrinho
          clicando no ícone de sacola no cabeçalho ou na própria página do
          produto clicando no botão "Ver carrinho", veja:
        </p>
        <FaqImage
          src={btnCarrinhoDesktop}
          alt="Botão de carrinho no desktop"
          maxWidth="md"
        />
      </>
    ),
  },
  {
    pergunta: "Como faço para finalizar meu pedido online?",
    resposta: (
      <>
        <p>
          Acessando o seu carrinho, verifique as informações dos produtos
          adicionados, desça a página e preencha os campos necessários para a
          entrega e selecione a forma de pagamento, veja:
        </p>
        <FaqImage
          src={carrinhoInfoEntrega}
          alt="Informações de entrega no carrinho"
          maxWidth="lg"
        />
        <p className="mt-4">
          Após preencher as informações, uma mensagem automática com os dados do
          seu pedido será gerada e basta clicar em "Finalizar compra (via
          WhatsApp)"
        </p>
        <FaqImage
          src={carrinhoMensagemFinaliza}
          alt="Mensagem de finalização do pedido"
          maxWidth="lg"
        />
        <p className="mt-4">
          Após o clique você será redirecionado ao WhatsApp da Spinning e basta
          enviar a mensagem pronta. Assim, um dos nossos atendentes irá
          confirmar os detalhes do seu pedido e ajudar com o pagamento.
        </p>
        <p className="mt-4 italic">
          Observação: Se preferir, você pode copiar a mensagem gerada e mandar
          para o nosso WhatsApp pelo número{" "}
          <a
            href={`${dadosLoja.socialMedia.whats}`}
            className="text-blue-600 underline"
          >
            {extrairNumeroTelefone(dadosLoja.socialMedia.whats)}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    pergunta: "Posso alterar ou remover produtos do carrinho?",
    resposta: (
      <p>
        Sim! No carrinho, você pode ajustar a quantidade e variações, remover
        produtos ou limpar todo o produto. Inclusive, nós indicamos que após
        finalizar a compra, o carrinho seja limpado para que no seu próximo
        pedido tudo esteja pronto.
      </p>
    ),
  },
  {
    pergunta: "Como comprar presencialmente?",
    resposta: (
      <>
        <p>
          A Spinning Joias participa dos principais{" "}
          <b>eventos de patinação artística do Brasil</b>, onde você pode
          encontrar nossa stand com semijoias e demais produtos relacionados à
          patinação.
        </p>
        <p>
          Fique atento(a) ao nosso{" "}
          <a
            href={`${dadosLoja.socialMedia.instagram}`}
            className="text-blue-600 underline"
          >
            Instagram
          </a>{" "}
          para saber onde estaremos! Lembramos também que para garantir a sua
          peça, você pode reservar pelo WhatsApp ou Instagram, e retirar no
          evento.
        </p>
      </>
    ),
  },
  {
    pergunta: "Quais são as formas de pagamento aceitas?",
    resposta: (
      <>
        <p>
          <b>Pix/transferência</b>: Para compras online (encomendas realizadas
          pelo{" "}
          <a
            href={`${dadosLoja.socialMedia.whats}`}
            className="text-blue-600 underline"
          >
            Whats
          </a>{" "}
          ou pelo{" "}
          <a
            href={`${dadosLoja.socialMedia.instagram}`}
            className="text-blue-600 underline"
          >
            Instagram
          </a>
          ).{" "}
        </p>
        <p>
          <b>Cartão de crédito/débito</b>: Para compras presenciais em eventos.
        </p>
      </>
    ),
  },
  {
    pergunta: "Qual é o prazo e valor de entrega?",
    resposta: (
      <>
        <p>
          O prazo e o valor de entrega{" "}
          <b>varia de acordo com a sua localização.</b>
        </p>
        <p>
          A entrega, geralmente, leva entre 5 a 10 dias úteis e tem um valor
          aproximado ao da tabela abaixo, veja:
        </p>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-yellow-200">
              <tr>
                <th className="border px-2 py-1">Região¹</th>
                <th className="border px-2 py-1">Valor do Frete (R$)²</th>
              </tr>
            </thead>
            <tbody>
              {tabelaDeFrete.map((row, i) => (
                <tr key={i} className="odd:bg-yellow-50">
                  <td className="border px-2 py-1">{row.regiao}</td>
                  <td className="border px-2 py-1">{row.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          ¹ Região de destino, ou seja, a sua localização.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ² Valores aproximados, podendo variar de acordo com o peso e dimensões
          do produto, considerando o envio via Correios com origem de Porto
          Alegre/RS.
        </p>
      </>
    ),
  },
  {
    pergunta: "Os produtos são de ouro/prata ou bijuteria?",
    resposta: (
      <>
        <p>
          <b>A Spinning trabalha com semijoia</b>. O que isso significa?
        </p>
        <p>
          As semijoias da Spinning são feitas com metais nobres, como{" "}
          <b>prata 925</b> ou banhadas a <b>ouro 18k</b>.{" "}
        </p>
        <p>
          De forma que, possuem um banho de alta qualidade que garante
          durabilidade e resistência, além de, possuirem antialérgico.
        </p>
        <FaqImage
          src={diferenca_semijoia}
          alt="Diferença entre joia, semijoia e bijuteria"
          maxWidth="lg"
        />
      </>
    ),
  },
  {
    pergunta: "Como posso cuidar das minhas semijoias?",
    resposta: (
      <p>
        Para garantir a durabilidade das suas semijoias, evite o contato com
        produtos químicos, como perfumes e produtos de limpeza. Guarde-as em
        locais secos e arejados, longe da luz direta do sol.
      </p>
    ),
  },
  {
    pergunta: "As semijoias tem garantia?",
    resposta: (
      <p>Sim, todas as nossas joias tem garantia do banho e antialérgico.</p>
    ),
  },
];
