function HeroSection() {
  return (
    <>
      <div className="bg-dourado hero-section-top">
        <ul className="hero-section-top-list">
          <li>
            <a href="#">Brinco</a>
          </li>
          <li>
            <a href="#">Colares</a>
          </li>
          <li>
            <a href="#">Pulseiras</a>
          </li>
          <li>
            <a href="#">Berloques</a>
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
