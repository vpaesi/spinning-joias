export interface Cor {
  nome: string;
  codigo: string;
  fotoDestaque?: string;
  fotoCor?: string[];
}

export interface Produto {
  id: number;
  titulo: string;
  nome?: string;
  descricao: string;
  preco?: number;
  categoria: string;
  fotoDestaque: string;
  fotosAdicionais?: string[];
  informacoes_extras?: string;
  cores?: Cor[];
}

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  quantidade: number;
  corSelecionada?: Cor;
}

export interface FormEntrega {
  nome: string;
  cpf: string;
  endereco: string;
  complemento: string;
  cidade: string;
  uf: string;
  cep: string;
  celular: string;
  numero: string;
}

export type TipoPagamento = "pix" | "transferencia";
export type OrdemClassificacao = "none" | "asc" | "desc";