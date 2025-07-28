import InputFormCarrinho from "./InputFormCarrinho";

interface InfoEntregaCarrinhoProps {
  form: {
    nome: string;
    cpf: string;
    endereco: string;
    complemento: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<InfoEntregaCarrinhoProps["form"]>
  >;
}

export default function InfoEntregaCarrinho({
  form,
  setForm,
}: InfoEntregaCarrinhoProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-4">Informações de Entrega*</h2>
      <p className="text-sm text-gray-500">
        *Preencha todos os dados abaixo requeridos pelos Correios para o envio.
      </p>
      <form className="bg-gray-50 p-4 rounded mb-4 mt-4 grid grid-cols-1 gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <InputFormCarrinho
            label="Nome completo"
            placeholder="Nome completo"
            value={form.nome}
            onChange={(value) => setForm((f) => ({ ...f, nome: value }))}
          />
          <InputFormCarrinho
            label="CPF"
            placeholder="CPF"
            value={form.cpf}
            onChange={(value) => setForm((f) => ({ ...f, cpf: value }))}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <InputFormCarrinho
            label="CEP"
            placeholder="CEP"
            value={form.cep}
            onChange={(value) => setForm((f) => ({ ...f, cep: value }))}
          />
          <InputFormCarrinho
            label="UF"
            placeholder="UF"
            value={form.uf}
            onChange={(value) => setForm((f) => ({ ...f, uf: value }))}
          />
          <InputFormCarrinho
            label="Cidade"
            placeholder="Cidade"
            value={form.cidade}
            onChange={(value) => setForm((f) => ({ ...f, cidade: value }))}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <InputFormCarrinho
            label="Endereço"
            placeholder="Endereço"
            value={form.endereco}
            onChange={(value) => setForm((f) => ({ ...f, endereco: value }))}
          />
          <InputFormCarrinho
            label="Complemento"
            placeholder="Complemento"
            value={form.complemento}
            onChange={(value) => setForm((f) => ({ ...f, complemento: value }))}
          />
        </div>
      </form>
    </>
  );
}
