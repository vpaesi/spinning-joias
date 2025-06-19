import { Link } from 'react-router-dom';
import cart from '../assets/cart.png';
import { CATEGORIAS_LINKS } from '../routes/paths';

function Nav() {

  const renderLinksCategoria = () =>
    Object.values(CATEGORIAS_LINKS).map(({ nome, link }) => (
      <li key={nome}>
        <Link className="dropdown-item" to={link}>
          {nome}
        </Link>
      </li>
    ));

  const navLinkHome = <Link className="nav-link" to="/">Home</Link>;
  const navLinkContato = <Link className="nav-link" to="/contato">Contato</Link>;

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-header">
      <div className="container px-4 px-lg-5 d-flex align-items-center justify-content-between">
        {/* Hamburguer mobile */}
        <button
          className="navbar-toggler order-1 d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links - esquerda */}
        <div className="d-none d-lg-flex align-items-center order-1" style={{ flex: 1 }}>
          <ul className="navbar-nav flex-row gap-2 align-items-center mb-0">
            <li className="nav-item"> {navLinkHome} </li>
            <li className="nav-item"> {navLinkContato} </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorias
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {renderLinksCategoria()}
              </ul>
            </li>
          </ul>
        </div>

        {/* H1 - centro */}
        <a className="nav-header m-0 order-2 mx-2 flex-grow-1 text-center" href="/" style={{ flex: 1 }}>
          <h1 className="mb-0 d-none d-lg-block" style={{ fontSize: '2.5rem' }}>Spinning Joias</h1>
          <h1 className="mb-0 d-lg-none" style={{ fontSize: '2rem' }}>Spinning Joias</h1>
        </a>

        {/* Carrinho - direita */}
        <div className="order-3 d-flex align-items-center" style={{ flex: 1, justifyContent: "flex-end" }}>
          <Link className="d-lg-none ms-2" to="#">
            <img
              src={cart}
              alt="Carrinho"
              className="img-fluid"
              style={{ width: "28px", height: "28px" }}
            />
          </Link>
          <form className="d-none d-lg-flex ms-2">
            <button className="btn btn-outline-dark" type="submit">
              Carrinho
              <span className="badge bg-branco ms-1 rounded-pill">
                <img
                  src={cart}
                  alt="Carrinho"
                  className="img-fluid"
                  style={{ width: '22px', height: '22px' }}
                />
              </span>
            </button>
          </form>
        </div>

        {/* Mobile menu */}
        <div className="collapse navbar-collapse order-4" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item d-lg-none"> {navLinkHome} </li>
            <li className="nav-item d-lg-none"> {navLinkContato} </li>
            <li className="nav-item dropdown d-lg-none">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMobile"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorias
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMobile">
                {renderLinksCategoria()}
              </ul>
              <li className="nav-item d-lg-none">
                <Link className="nav-link" to="#!">Sobre a Spinning Joias</Link>
              </li>
              <li className="nav-item d-lg-none">
                <Link className="nav-link" to="#!">Perguntas Frequentes (FAQ)</Link>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
