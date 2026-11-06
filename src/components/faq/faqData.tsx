import diferenca_semijoia from "../../assets/diferenca_semijoia.jpg";
import dadosLoja from "../../utils/DadosSpinning";
import FaqImage from "./FaqImage";
import { extrairNumeroDeUrlWhatsApp } from "../../utils/telefone";

export interface FaqItem {
  pergunta: string;
  resposta: JSX.Element;
}

const linkWhatsApp = (
  <a
    href={dadosLoja.socialMedia.whats}
    className="text-blue-600 underline"
  >
    WhatsApp ({extrairNumeroDeUrlWhatsApp(dadosLoja.socialMedia.whats)})
  </a>
);

const linkInstagram = (
  <a href={dadosLoja.socialMedia.instagram} className="text-blue-600 underline">
    Instagram
  </a>
);

export const faqData: FaqItem[] = [
  {
    pergunta: "Como encontro um produto no catálogo?",
    resposta: (
      <p>
        Use a busca para procurar pelo nome ou navegue pelas categorias. Abra um
        produto para consultar descrição, preço, fotos e informações disponíveis.
      </p>
    ),
  },
  {
    pergunta: "Como vejo as fotos e variações de um produto?",
    resposta: (
      <p>
        Na página do produto, selecione as miniaturas da galeria para ver outras
        fotos. Quando houver opções de cor, selecione uma delas para consultar as
        imagens correspondentes. Essa seleção serve apenas para visualizar o
        catálogo.
      </p>
    ),
  },
  {
    pergunta: "Como consulto disponibilidade ou faço uma compra?",
    resposta: (
      <p>
        O site é um catálogo e não recebe pedidos. Para confirmar disponibilidade,
        tirar dúvidas ou conversar sobre uma compra, entre em contato diretamente
        com a loja pelo {linkWhatsApp} ou pelo {linkInstagram}. O site não monta
        nem envia pedidos ou dados pessoais.
      </p>
    ),
  },
  {
    pergunta: "Como consulto pagamento e entrega?",
    resposta: (
      <p>
        As opções de pagamento, disponibilidade de envio, prazo e valor de entrega
        podem variar. Consulte essas informações diretamente com a loja pelo
        {" "}
        {linkWhatsApp} ou pelo {linkInstagram}.
      </p>
    ),
  },
  {
    pergunta: "Como comprar presencialmente?",
    resposta: (
      <p>
        A Spinning Joias participa de eventos de patinação artística. Acompanhe o
        {" "}
        {linkInstagram} para saber onde a loja estará e quais produtos estarão
        disponíveis.
      </p>
    ),
  },
  {
    pergunta: "Os produtos são de ouro/prata ou bijuteria?",
    resposta: (
      <>
        <p>
          <b>A Spinning trabalha com semijoias</b>, feitas com metais como prata
          925 ou com banho de ouro 18k. Consulte a descrição de cada produto para
          ver os materiais informados.
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
        Para ajudar a conservar suas semijoias, evite contato com perfumes,
        produtos químicos e de limpeza. Guarde-as em local seco e arejado, longe
        da luz direta do sol.
      </p>
    ),
  },
  {
    pergunta: "As semijoias têm garantia?",
    resposta: (
      <p>
        Consulte a descrição do produto ou fale diretamente com a loja pelo
        {" "}
        {linkWhatsApp} para confirmar as condições de garantia.
      </p>
    ),
  },
];
