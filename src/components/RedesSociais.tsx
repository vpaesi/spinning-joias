import instagram from '../assets/instagram.png';
import whatsapp from '../assets/whatsapp-medio.png';
import info from '../assets/info.png';

function RedesSociais() {

  return (
    <>
      <nav className="redes-sociais">
        <ul>
          <li>
            <a href="https://www.instagram.com/patricia_spinningjoias/" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
          </li>
          <li>
                <a href="http://wa.me/555181598553" target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp} alt="WhatsApp" />
                </a>
            </li>
            <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src={info} alt="Informações" />
                </a>
            </li>
          </ul>
      </nav>      
    </>
  )
}

export default RedesSociais
