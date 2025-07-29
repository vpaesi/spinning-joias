import GrupoDadosPessoais from "./GrupoDadosPessoais";
import GrupoEndereco from "./GrupoEndereco";
import { validarNome, validarCPF, validarCEP, validarUF } from "../../utils/validacoesForm";
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
  setForm: React.Dispatch<React.SetStateAction<InfoEntregaCarrinhoProps["form"]>>;
  erros: { [k: string]: string | null };
  setErros: React.Dispatch<React.SetStateAction<{ [k: string]: string | null }>>;
}

export default function InfoEntregaCarrinho({ 
  form, 
  setForm, 
  erros, 
  setErros 
}: InfoEntregaCarrinhoProps) {
  function handleChange(field: string, value: string) {
    if (field === "cpf") value = formatarCPF(value);
    if (field === "cep") value = formatarCEP(value);
    if (field === "celular") value = formatarCelular(value);

    setForm((f) => ({ ...f, [field]: value }));

    let erro: string | null = null;
    if (field === "nome") erro = validarNome(value);
    if (field === "cpf" && value) erro = !validarCPF(value) ? "CPF inválido" : null;
    if (field === "cep" && value) erro = !validarCEP(value) ? "CEP inválido" : null;
    if (field === "uf" && value) erro = !validarUF(value) ? "UF inválida" : null;
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
        <GrupoDadosPessoais form={form} erros={erros} onChange={handleChange} />
        <GrupoEndereco form={form} erros={erros} onChange={handleChange} buscarViaCep={buscarViaCep} />
      </form>
    </>
  );
}
