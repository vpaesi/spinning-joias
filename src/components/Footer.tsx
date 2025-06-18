import insta from '../assets/instagram.png';
import whats from '../assets/whatsapp.png';
import email from '../assets/email.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-5 text-center bg-azul">
      <Link to="/">
        <h1>Spinning Joias</h1>
      </Link>
      <div className="footer-links">
        <Link to="#">Perguntas frequentes (FAQ)</Link>
        <Link to="#">Mais buscados</Link>
        <Link to="#">Sobre a Spinning Joias</Link>
      </div>
      <div className="footer-imagens">
        <Link to="https://www.instagram.com/patricia_spinningjoias/" target="_blank" rel="noopener noreferrer">
          <img src={insta} alt="Instagram" className="img-fluid" style={{ width: '50px', height: '50px' }}/>
        </Link>
        <Link to="http://wa.me/555181598553" target="_blank" rel="noopener noreferrer">
          <img src={whats} alt="Whatsapp" className="img-fluid" style={{ width: '50px', height: '50px' }}/>
        </Link>
        <Link to="mailto:" target="_blank" rel="noopener noreferrer">
          <img src={email} alt="E-mail" className="img-fluid" style={{ width: '50px', height: '50px' }}/>
        </Link>
      </div>
      <div className="footer-creditos">
        <p>© Spinning Joias </p>
        <p>v. 2.0 released 08.06.2025 by Vitória de Camargo</p>
      </div>
    </footer>
  );
}

export default Footer;
