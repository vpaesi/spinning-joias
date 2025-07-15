function HeroSection() {
  return (
    <section className="bg-yellow-50 py-8 text-center">
      <h2 className="text-2xl font-bold mb-2">
        Brilhe com elegância em cada giro{" "}
      </h2>
      <h3 className="mb-4">Spinning Joias tem a jóia que dança com você </h3>
      <button
        className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800 transition-colors"
        onClick={() =>
          window.scrollTo({
            behavior: "smooth",
            top: document.getElementById("lista-colecao")?.offsetTop || 0,
          })
        }
      >
        Ver coleção
      </button>      
    </section>
  );
}

export default HeroSection;
