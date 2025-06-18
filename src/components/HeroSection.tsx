import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <div className="bg-dourado hero-section-top">
        <ul className="hero-section-top-list">
          <li>
            <Link to="produtos/categoria/Brinco">
              Brincos
            </Link>
          </li>
          <li>
            <Link to="produtos/categoria/Colar">
              Colares
            </Link>          
          </li>
          <li>
            <Link to="produtos/categoria/Berloque">
              Berloques
            </Link>
          </li>
          <li>
            <Link to="produtos/categoria/Diverso">
              Diversos
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-hero-section py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="">
            <h2 className="display-4 fw-bolder">
              Brilhe com elegância em cada giro
            </h2>
            <h3 className="lead fw-normal mb-0">
              Spinning Joias tem a jóia que dança com você
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-dourado hero-section-bottom text-center">
        <h4>Entregamos em todo território brasileiro</h4>
      </div>
    </>
  );
}

export default HeroSection;
