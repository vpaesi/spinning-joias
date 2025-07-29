import { useState } from "react";
import { faqData } from "./faqData";
import FaqItem from "./FaqItem";

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {faqData.map((faq, idx) => (
        <FaqItem
          key={idx}
          faq={faq}
          index={idx}
          isOpen={openIndex === idx}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
