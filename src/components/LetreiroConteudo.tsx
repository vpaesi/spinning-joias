import { Link } from "react-router-dom";

export default function LetreiroConteudo() {
  return (
    <>
      Entregamos em todo território brasileiro!
      <span className="inline-block mx-2" role="img" aria-label="patins">
        🛼
      </span>
      <Link to="/about" className="underline hover:text-yellow-800 transition">
        Saiba mais sobre a Spinning Joias
      </Link>
      <span className="inline-block mx-2" role="img" aria-label="patins">
        🛼
      </span>
      <Link to="/faq" className="underline hover:text-yellow-800 transition">
        Perguntas frequentes (FAQ)
      </Link>
    </>
  );
}
