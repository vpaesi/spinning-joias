import logoInstagram from '../assets/instagram.png';
import logoWhatsapp from '../assets/whatsapp.png';
import info from '../assets/info.png';

function Footer() {
  return (
    <>
      <footer className="bg-yellow-700 text-white mt-8">
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Spinning Joias</h2>
            <ul>
              <li className="flex items-center gap-2 mb-1">
                <img
                  src={logoInstagram}
                  alt="Logo do instagram"
                  className="w-5 h-5"
                />
                <a
                  href="https://www.instagram.com/patricia_spinningjoias/"
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </li>
              <li className="flex items-center gap-2 mb-1">
                <img
                  src={logoWhatsapp}
                  alt="Logo do whatsapp"
                  className="w-5 h-5"
                />
                <a
                  href="http://wa.me/555181598553"
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"/>
              </li>
              <li className="flex items-center gap-2 mb-1">
                <img
                  src={info}
                  alt="Logo do email"
                  className="w-5 h-5"
                />
                <a
                  href="mailto:"
                  className="text-white no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </li>
              <li className="flex items-center gap-2 mb-1">
                <a href="/faq">Perguntas frequentes (FAQ)</a>
              </li>
              <li className="flex items-center gap-2 mb-1">
                <a href="#">Mais buscados</a>
              </li>
              <li className="flex items-center gap-2 mb-1">
                <a href="/about">Sobre a Spinning Joias</a>
              </li>
            </ul>            
          </div>
          </div>
        <div className="text-center py-4 bg-yellow-800 text-sm">
          <p>© Spinning Joias</p>
          <p>v. 1.2.0 released 08.06.2025 by{" "}</p>          
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
    </>
  );
}

export default Footer;
