import modal_encomende from "../assets/modal_encomende.png";
import diferenca_semijoia from "../assets/diferenca_semijoia.jpg";
import dadosLoja from "../utils/DadosSpinning";
import { useState } from "react";

function FAQ() {
  const tabelaDeFrete = [
    {
      regiao: "Sul",
      valor: 15.0,
    },
    {
      regiao: "Sudeste",
      valor: 25.0,
    },
    {
      regiao: "Centro-Oeste",
      valor: 35.0,
    },
    {
      regiao: "Nordeste",
      valor: 40.0,
    },
    {
      regiao: "Norte",
      valor: 50.0,
    },
  ];

  const perguntas = [
    {
      pergunta: "Como comprar online?",
      resposta: (
        <>
          <p>
            Por ora, o site da Spinning funciona como um <b>catálogo</b>. O que
            isso significa?
          </p>
          <p>
            No site está catalogada toda a coleção da Spinning Joias, dessa
            forma, você pode decidir quais produtos deseja e entrar em contato
            conosco através do WhatsApp (clicando{" "}
            <a
              href={`${dadosLoja.socialMedia.whats}`}
              className="text-blue-600 underline"
            >
              aqui
            </a>
            ) ou Instagram (clicando{" "}
            <a
              href={`${dadosLoja.socialMedia.instagram}`}
              className="text-blue-600 underline"
            >
              aqui
            </a>
            ) para fazer o pedido.
          </p>
          <p>
            Para facilitar esse processo, na página de cada produto há um botão
            que redireciona direto para o Whats, veja:
          </p>
          <img
            src={modal_encomende}
            alt="Modal de encomenda"
            className="w-full h-auto mt-4 rounded-lg shadow-lg"
          />
        </>
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
            <b>Cartão de crédito/débito</b>: Para compras presenciais em
            eventos.
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
            ² Valores aproximados, podendo variar de acordo com o peso e
            dimensões do produto, considerando o envio via Correios com origem
            de Porto Alegre/RS.
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
          <img
            src={diferenca_semijoia}
            alt="Diferença entre joia, semijoia  bijuteria"
            className="w-full h-auto mt-4 rounded-lg shadow-lg"
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pg-faq flex justify-center items-start min-h-screen bg-yellow-100 py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Perguntas Frequentes (FAQ)
        </h2>
        <div className="space-y-4">
          {perguntas.map((faq, idx) => (
            <div key={idx} className="border-b pb-2">
              <button
                className="flex justify-between items-center w-full text-left text-xl font-semibold mb-2 focus:outline-none"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span>{faq.pergunta}</span>
                <span className="ml-2">{openIndex === idx ? "▲" : "▼"}</span>
              </button>
              {openIndex === idx && (
                <div
                  id={`faq-panel-${idx}`}
                  className="pl-2 md:pl-4 animate-fadeIn"
                >
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
