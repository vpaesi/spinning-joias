function Footer() {
  return (
    <footer className="py-5 text-center bg-azul">
      <a href="/">
        <h1>Spinning Joias</h1>
      </a>
      <div className="footer-links">
        <a href="#">Perguntas frequentes (FAQ)</a>
        <a href="#">Mais buscados</a>
        <a href="#">Sobre a Spinning Joias</a>
      </div>
      <div className="footer-imagens">
        <a href="https://www.instagram.com/patricia_spinningjoias/" target="_blank" rel="noopener noreferrer">
          <img
            src="/src/assets/instagram.png"
            alt="Instagram"
            className="img-fluid"
            style={{ width: '50px', height: '50px' }}
          />
        </a>
        <a href="http://wa.me/555181598553" target="_blank" rel="noopener noreferrer">
          <img
            src="/src/assets/whatsapp.png"
            alt="Whatsapp"
            className="img-fluid"
            style={{ width: '50px', height: '50px' }}
          />
        </a>
        <a href="#">
          <img
            src="/src/assets/email.png"
            alt="E-mail"
            className="img-fluid"
            style={{ width: '50px', height: '50px' }}
          />
        </a>
      </div>
      <div className="footer-creditos">
        <p>© Spinning Joias </p>
        <p>v. 2.0 released 08.06.2025 by Vitória de Camargo</p>
      </div>
    </footer>
  );
}

export default Footer;
