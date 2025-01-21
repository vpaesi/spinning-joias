import React from "react";

type UmProduto = {
    id: number;
    titulo: string;
    imagem: string;
    descricao: string;
    preco: number;
};

interface ListaDeProdutoProps {
    listaDeProdutos: UmProduto[];
}

const ListaDeProdutos: React.FC<ListaDeProdutoProps> = ({ listaDeProdutos }) => {
    if (listaDeProdutos.length === 0) {
        return <p>Nenhum produto encontrado</p>;
    }
}

export default ListaDeProdutos;

