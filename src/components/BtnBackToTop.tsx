import { useEffect, useState } from "react";
import { scrollToElement } from "../utils/scrollToElement";

export default function BtnBackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => scrollToElement();

  return (
    <button
      id="backToTopBtn"
      title="Voltar ao Topo"
      className={`fixed bottom-8 right-4 bg-yellow-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-[100] transition-opacity duration-300 ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      style={{ boxShadow: "0 4px 16px #0002" }}
    >
      <i
        className="bi bi-arrow-up-short text-3xl m-0 p-0 flex items-center justify-center"
        aria-hidden="true"
      ></i>
    </button>
  );
}
