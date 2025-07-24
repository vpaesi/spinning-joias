import { Link } from "react-router-dom";
import dadosLoja from "../utils/DadosSpinning";
import { scrollToElement } from "../utils/scrollToElement";

function Footer() {
  const handleScrollToTop = () => {
    scrollToElement();
  };

  return (
    <footer className="bg-[#b3e0fa] text-black mt-8 font-sans">
      <div className="footer container mx-auto py-10 flex flex-col items-center justify-center min-h-[60vh]">
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
            <i className="bi bi-instagram footer-icon"></i>
          </a>
          <a
            href={`${dadosLoja.socialMedia.whats}`}
            className="text-yellow-600 text-3xl hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="bi bi-chat-dots footer-icon"></i>
          </a>
          <a
            href={`${dadosLoja.socialMedia.email}`}
            className="text-yellow-600 text-3xl hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <i className="bi bi-envelope footer-icon"></i>
          </a>
        </div>
        <ul className="flex flex-col items-center gap-4 text-lg mb-8">
          <li>
            <Link
              to="/faq"
              className="hover:underline"
              onClick={handleScrollToTop}
            >
              Perguntas frequentes (FAQ)
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:underline"
              onClick={handleScrollToTop}
            >
              Sobre a {`${dadosLoja.nomeDaLoja}`}
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:underline"
              onClick={handleScrollToTop}
            >
              Retornar à página inicial
            </Link>
          </li>
        </ul>
        <div className="footer-credits text-center text-[#6bb3d6] text-sm mt-8">
          <p>© {`${dadosLoja.nomeDaLoja}`}</p>
          <p>
            v. 2.0 released 08.06.2025 by{" "}
            <a
              href="https://github.com/vitoriacamargo"
              className="hover:underline"
            >
              Vitória de Camargo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
