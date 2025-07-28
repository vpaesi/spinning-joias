import { useState } from "react";
import InputFormCarrinho from "./InputFormCarrinho";
import {
  validarNome,
  validarCPF,
  validarCEP,
  validarUF,
} from "../../utils/validacoesForm";
import { formatarCelular, formatarCPF, formatarCEP } from "../../utils/formatadores";

interface InfoEntregaCarrinhoProps {
  form: {
    celular: string;
    numero: string;
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
  const [erros, setErros] = useState<{ [k: string]: string | null }>({});

  function handleChange(field: string, value: string) {
    if (field === "cpf") value = formatarCPF(value);
    if (field === "cep") value = formatarCEP(value);
    if (field === "celular") value = formatarCelular(value);

    setForm((f) => ({ ...f, [field]: value }));

    let erro: string | null = null;
    if (field === "nome") erro = validarNome(value);
    if (field === "cpf" && value)
      erro = !validarCPF(value) ? "CPF inválido" : null;
    if (field === "cep" && value)
      erro = !validarCEP(value) ? "CEP inválido" : null;
    if (field === "uf" && value)
      erro = !validarUF(value) ? "UF inválida" : null;
    setErros((e) => ({ ...e, [field]: erro }));
  }

  async function buscarViaCep(cep: string) {
    if (validarCEP(cep)) {
      const cepLimpo = cep.replace(/\D/g, "");
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((f) => ({
          ...f,
          endereco: data.logradouro || f.endereco,
          cidade: data.localidade || f.cidade,
          uf: data.uf || f.uf,
          complemento: data.complemento || f.complemento,
        }));
      }
    }
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-4">Informações de Entrega*</h2>
      <p className="text-sm text-gray-500">
        *Preencha todos os dados abaixo requeridos pelos Correios para o envio.
      </p>
      <form className="bg-gray-50 p-4 rounded mb-4 mt-4 grid grid-cols-1 gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <InputFormCarrinho
            label="Nome completo"
            placeholder="Nome completo"
            value={form.nome}
            onChange={(value) => handleChange("nome", value)}
            erro={erros.nome}
          />
          <InputFormCarrinho
            label="Celular"
            placeholder="(51) 99999-9999"
            value={form.celular}
            onChange={(value) => handleChange("celular", value)}
            erro={erros.celular}
          />
          <InputFormCarrinho
            label="CPF"
            placeholder="123.456.789-10"
            value={form.cpf}
            onChange={(value) => handleChange("cpf", value)}
            erro={erros.cpf}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <InputFormCarrinho
            label="CEP"
            placeholder="01001-000"
            value={form.cep}
            onChange={(value) => {
              handleChange("cep", value);
              buscarViaCep(value);
            }}
            erro={erros.cep}
          />
          <InputFormCarrinho
            label="UF (Sigla do Estado)"
            placeholder="UF"
            value={form.uf}
            onChange={(value) => handleChange("uf", value.toUpperCase())}
            erro={erros.uf}
          />
          <InputFormCarrinho
            label="Municipio"
            placeholder="Municipio"
            value={form.cidade}
            onChange={(value) => handleChange("cidade", value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <InputFormCarrinho
            label="Logradouro"
            placeholder="Rua/Avenida/Acesso/Praça..."
            value={form.endereco}
            onChange={(value) => handleChange("endereco", value)}
          />
          <InputFormCarrinho
            label="Número"
            placeholder="Número"
            value={form.numero}
            onChange={(value) => handleChange("numero", value)}
          />
          <InputFormCarrinho
            label="Complemento"
            placeholder="Complemento"
            value={form.complemento}
            onChange={(value) => handleChange("complemento", value)}
          />
        </div>
      </form>
    </>
  );
}
