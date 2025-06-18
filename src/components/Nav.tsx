import { Link } from "react-router-dom";
import cart from '../assets/cart.png';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container px-4 px-lg-5">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#!">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Contato
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorias
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/categoria/Anel">
                    Anéis
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categoria/Berloque">
                    Berloques
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categoria/Brinco">
                    Brincos
                  </Link>                  
                </li>
                <li>
                  <Link className="dropdown-item" to="/categoria/Colar">
                    Colares
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categoria/Diversos">
                    Diversos
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Meu carrinho
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Sobre a Spinning Joias
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Perguntas Frequentes (FAQ)
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <a className="nav-header" href="/">
            <h1>Spinning Joias</h1>
          </a>
          <form className="d-flex nav-btn-carrinho">
            <button className="btn btn-outline-dark " type="submit">
              <i className="bi-cart-fill me-1"></i>
              Carrrinho
              <span className="badge bg-branco ms-1 rounded-pill">
                <img src={cart} alt="Carrinho" className="img-fluid" style={{ width: '20px', height: '20px' }} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
