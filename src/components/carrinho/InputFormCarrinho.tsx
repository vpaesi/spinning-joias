interface InputFormCarrinhoProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  erro?: string | null;
}

export default function InputFormCarrinho({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  erro,
}: InputFormCarrinhoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className={`border p-2 dark:bg-[#3c3c3c] rounded ${erro ? "border-red-500" : ""}`}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
      {erro && <span className="text-red-500 text-xs">{erro}</span>}
    </div>
  );
}
