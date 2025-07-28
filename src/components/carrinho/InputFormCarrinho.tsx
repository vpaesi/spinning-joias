interface InputFormCarrinhoProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export default function InputFormCarrinho({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputFormCarrinhoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="border p-2 rounded"
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
