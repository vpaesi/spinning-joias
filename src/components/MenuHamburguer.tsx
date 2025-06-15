import { useState } from "react";
import Nav from "./Nav";

function MenuHamburguer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="menu-hamburguer" onClick={handleClick}>
      {isOpen ? <Nav /> : "Aqui vai ser o menu hamburguer"}
    </div>
  );
}

export default MenuHamburguer;
