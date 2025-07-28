import InputFormCarrinho from "./InputFormCarrinho";

interface GrupoDadosPessoaisProps {
  form: {
    nome: string;
    celular: string;
    cpf: string;
  };
  erros: { [k: string]: string | null };
  onChange: (field: string, value: string) => void;
}

export default function GrupoDadosPessoais({ form, erros, onChange }: GrupoDadosPessoaisProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <InputFormCarrinho
        label="Nome completo"
        placeholder="Nome completo"
        value={form.nome}
        onChange={(value) => onChange("nome", value)}
        erro={erros.nome}
      />
      <InputFormCarrinho
        label="Celular"
        placeholder="(51) 99999-9999"
        value={form.celular}
        onChange={(value) => onChange("celular", value)}
        erro={erros.celular}
      />
      <InputFormCarrinho
        label="CPF"
        placeholder="123.456.789-10"
        value={form.cpf}
        onChange={(value) => onChange("cpf", value)}
        erro={erros.cpf}
      />
    </div>
  );
}