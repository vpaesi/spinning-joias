import { useEffect, useState } from "react";

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

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/vpaesi/8e3c82e7231e5fb4909e0597f142a377/raw/produtos-spinning_joias.json")
      .then((res) => res.json())
      .then((data: Produto[]) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro("Erro ao carregar produtos");
        setLoading(false);
      });
  }, []);

  return { produtos, loading, erro };
}
