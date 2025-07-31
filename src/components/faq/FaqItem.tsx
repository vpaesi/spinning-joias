import { FaqItem as FaqItemType } from "./faqData";

interface FaqItemProps {
  faq: FaqItemType;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

export default function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <div className="border-b pb-2">
      <button
        className="flex justify-between items-center w-full text-left text-lg sm:text-xl font-semibold mb-2 focus:outline-none"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
      >
        <span>{faq.pergunta}</span>
        <span className="ml-2 text-base sm:text-lg">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div
          id={`faq-panel-${index}`}
          className="pl-2 md:pl-4 animate-fadeIn text-sm sm:text-base leading-relaxed"
        >
          {faq.resposta}
        </div>
      )}
    </div>
  );
}
