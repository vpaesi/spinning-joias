function Footer () {
  return (
    <footer className="py-5 text-center bg-azul">
        <h1>Spinning Joias</h1>
        <div className="footer-links">
            <a href="#">Perguntas frequentes (FAQ)</a>
            <a href="#">Mais buscados</a>
            <a href="#">Sobre a Spinning Joias</a>
        </div>
        <div className="footer-imagens">
            <a href="#">
                <img src="/src/assets/instagram.png" alt="Instagram" className="img-fluid" style={{ width: '50px', height: '50px' }} />
            </a>
            <a href="#">
                <img src="/src/assets/whatsapp.png" alt="Whatsapp" className="img-fluid" style={{ width: '50px', height: '50px' }} />
            </a>
            <a href="#">
                <img src="/src/assets/info.png" alt="E-mail" className="img-fluid" style={{ width: '50px', height: '50px' }} />
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
