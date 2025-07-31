interface PagamentoRadioProps {
  value: "pix" | "transferencia";
  onChange: (value: "pix" | "transferencia") => void;
}

export default function PagamentoRadio({
  value,
  onChange,
}: PagamentoRadioProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
      <label className="mr-4">
        <input
          className="cursor-pointer"
          type="radio"
          checked={value === "pix"}
          onChange={() => onChange("pix")}
        />{" "}
        Pix
      </label>
      <label>
        <input
          className="cursor-pointer"
          type="radio"
          checked={value === "transferencia"}
          onChange={() => onChange("transferencia")}
        />{" "}
        Transferência
      </label>
    </div>
  );
}
