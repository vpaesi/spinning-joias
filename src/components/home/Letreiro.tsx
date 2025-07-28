import LetreiroConteudo from "./LetreiroConteudo";

export default function Letreiro() {
  return (
    <div className="letreiro py-2 text-center font-semibold flex flex-col items-center gap-2">
      <div className="w-full overflow-hidden">
        <div
          className={`
            whitespace-nowrap
            transition-all
            marquee-custom
            hidden sm:block md:block
          `}
        >
          <LetreiroConteudo />
        </div>
        <div className="whitespace-nowrap block sm:hidden md:hidden">
          <LetreiroConteudo />
        </div>
      </div>
      <style>
        {`
        @media (min-width: 375px) and (max-width: 870px) {
          .marquee-custom {
            display: block;
            animation: marquee 18s linear infinite;
          }
          .letreiro .block.sm\\:hidden.md\\:hidden {
            display: none !important;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(100%);}
          100% { transform: translateX(-100%);}
        }
        `}
      </style>
    </div>
  );
}
