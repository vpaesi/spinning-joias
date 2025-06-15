import RedesSociais from "./RedesSociais"

function Footer() {

  return (
    <>
      <footer className="footer">
        <h1>Spinning Joias</h1>
        <RedesSociais />
        <ul className="footer-links">
          <li><a href="#">Perguntas Frequentes (FAQ)</a></li>
          <li><a href="#">Mais buscados</a></li>
          <li><a href="#">Sobre a Spinning Joias</a></li>          
        </ul>
        <p>&copy; Spinning Joias</p>
        <p>v. 2.0 released 08.06.2025 by Vitória de Camargo</p>
      </footer>      
    </>
  )
}

export default Footer
