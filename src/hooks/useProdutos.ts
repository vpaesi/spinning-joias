import { useEffect, useState } from "react";

export interface Cor {
  nome: string;
  codigo: string;
  imagem?: string;
  imagens?: string[];
}

export interface Produto {
  id: number;
  titulo: string;
  nome?: string;
  descricao: string;
  preco?: number;
  categoria: string;
  imagem: string;
  imagensExtras?: string[];
  informacoes_extras?: string;
  cores?: Cor[];
}

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/produtos.json")
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