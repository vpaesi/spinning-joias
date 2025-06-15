import MenuHamburguer from "./MenuHamburguer"

function Header() {
  return (
    <header id="header" className="header">
      <div className="header-grid">
        <div>
          <MenuHamburguer />
        </div>
        <h1>Spinning Joias</h1>
        <button className="header-button">
          <a href="#">Login</a>
        </button>
      </div>
      <a href="#" className="header-link">Não tem uma conta?</a>
    </header>
  )
}

export default Header
