import InputFormCarrinho from "./InputFormCarrinho";

interface GrupoEnderecoProps {
  form: {
    cep: string;
    uf: string;
    cidade: string;
    endereco: string;
    numero: string;
    complemento: string;
  };
  erros: { [k: string]: string | null };
  onChange: (field: string, value: string) => void;
  buscarViaCep: (cep: string) => void;
}

export default function GrupoEndereco({ form, erros, onChange, buscarViaCep }: GrupoEnderecoProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <InputFormCarrinho
          label="CEP"
          placeholder="01001-000"
          value={form.cep}
          onChange={(value) => {
            onChange("cep", value);
            buscarViaCep(value);
          }}
          erro={erros.cep}
        />
        <InputFormCarrinho
          label="UF (Sigla do Estado)"
          placeholder="UF"
          value={form.uf}
          onChange={(value) => onChange("uf", value.toUpperCase())}
          erro={erros.uf}
        />
        <InputFormCarrinho
          label="Municipio"
          placeholder="Municipio"
          value={form.cidade}
          onChange={(value) => onChange("cidade", value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <InputFormCarrinho
          label="Logradouro"
          placeholder="Rua/Avenida/Acesso/Praça..."
          value={form.endereco}
          onChange={(value) => onChange("endereco", value)}
        />
        <InputFormCarrinho
          label="Número"
          placeholder="Número"
          value={form.numero}
          onChange={(value) => onChange("numero", value)}
        />
        <InputFormCarrinho
          label="Complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={(value) => onChange("complemento", value)}
        />
      </div>
    </>
  );
}