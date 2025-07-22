import dadosLoja from "../utils/DadosSpinning";

function Footer() {
  return (
    <footer className="bg-[#b3e0fa] text-black mt-8 font-sans">
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="font-cursive text-4xl mb-8 mt-4">
          {" "}
          {`${dadosLoja.nomeDaLoja}`}
        </h1>
        <div className="flex flex-row items-center justify-center gap-10 mb-8">
          <a
            href={`${dadosLoja.socialMedia.instagram}`}
            className="text-yellow-600 text-3xl hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href={`${dadosLoja.socialMedia.whats}`}
            className="text-yellow-600 text-3xl hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="bi bi-chat-dots"></i>
          </a>
          <a
            href={`${dadosLoja.socialMedia.email}`}
            className="text-yellow-600 text-3xl hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <i className="bi bi-envelope"></i>
          </a>
        </div>
        <ul className="flex flex-col items-center gap-4 text-lg mb-8">
          <li>
            <a href="/faq" className="hover:underline">
              Perguntas frequentes (FAQ)
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              Sobre a {`${dadosLoja.nomeDaLoja}`}
            </a>
          </li>
        </ul>
        <div className="text-center text-[#6bb3d6] text-sm mt-8">
          <p>© {`${dadosLoja.nomeDaLoja}`}</p>
          <p>
            v. 2.0 released 08.06.2025 by{" "}
            <a href="github.com/vitoriacamargo" className="hover:underline">
              Vitória de Camargo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
