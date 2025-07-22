import { useState, useRef, useEffect } from "react";
import MobileMenuDropdownCategorias from "./MobileMenuDropdownCategorias";

interface MobileMenuHamburgerButtonProps {
  onCategoriaSelect: (categoria: string) => void;
}

function MobileMenuHamburgerButton({
  onCategoriaSelect,
}: MobileMenuHamburgerButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="md:hidden p-2"
        aria-label="Abrir menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {open && (
        <MobileMenuDropdownCategorias
          onCategoriaSelect={onCategoriaSelect}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default MobileMenuHamburgerButton;
