import personalInfo from "../utils/DadosSpinning";

function Footer() {
  return (
    <>
      <footer className="bg-yellow-700 text-white mt-8">
        <div className="container mx-auto py-8 grid grid-cols-1 gap-8 text-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Spinning Joias</h2>
            <ul className="flex flex-col items-center">
              <li className="flex items-center gap-2 mb-1 p-2">
                <a
                  href={`${personalInfo.socialMedia.instagram}`}
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="flex items-center gap-2 mb-1 p-2">
                <a
                  href={`${personalInfo.socialMedia.whats}`}
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
              </li>
              <li className="flex items-center gap-2 mb-1 p-2">
                <a
                  href={`${personalInfo.socialMedia.email}`}
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-envelope"></i>
                </a>
              </li>
              <li className="flex items-center gap-2 mb-1 p-2">
                <a href="/faq">Perguntas frequentes (FAQ)</a>
              </li>
              <li className="flex items-center gap-2 mb-1 p-2">
                <a href="#">Mais buscados</a>
              </li>
              <li className="flex items-center gap-2 mb-1 p-2">
                <a href="/about">Sobre a Spinning Joias</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-4 bg-yellow-800 text-sm">
          <p>© Spinning Joias</p>
          <p>v. 1.2.0 released 08.06.2025 by {" "}</p>
          <a
            href="https://vitoria-de-camargo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vitória de Camargo
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
