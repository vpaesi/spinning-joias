function HeroSection() {
  return (
    <section className="hero-gradient py-16 px-16 text-start flex flex-col items-start justify-center min-h-[320px] md:min-h-[380px] shadow-lg">
      <h1 className="hero-title mb-2 drop-shadow-lg">
        Brilhe com elegância em cada giro
      </h1>
      <h2 className="hero-subtitle mb-6">
        Joias inspiradas na leveza da patinação artística
      </h2>
      <button
        className="btn text-lg px-8 py-3 mt-2"
        onClick={() =>
          window.scrollTo({
            behavior: "smooth",
            top: document.getElementById("lista-colecao")?.offsetTop || 0,
          })
        }
      >
        Ver Coleção
      </button>
    </section>
  );
}

export default HeroSection;
