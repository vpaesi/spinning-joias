import { useEffect } from "react";

function BtnBackToTop() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTopBtn");
      if (btn) {
        btn.style.display = window.scrollY > 200 ? "block" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <button
        id="backToTopBtn"
        title="Voltar ao Topo"
        className="fixed bottom-6 right-6 bg-yellow-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-50"
        style={{ display: "none" }}
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up-short text-xl" aria-hidden="true"></i>
      </button>
    </>
  );
}

export default BtnBackToTop;
