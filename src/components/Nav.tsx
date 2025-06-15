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
                  <a className="dropdown-item" href="#!">
                    Anéis
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Berloques
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Brincos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Colares
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Diversos
                  </a>
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
          <a className="navbar-brand nav-header" href="#!">
            Spinning Joias
          </a>
          <form className="d-flex">
            <button className="btn btn-outline-dark" type="submit">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                0
              </span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
