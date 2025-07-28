interface TextoMostrandoProdutosProps {
  page: number;
  pageSize: number;
  total: number;
}

export default function TextoMostrandoProdutos({
  page,
  pageSize,
  total,
}: TextoMostrandoProdutosProps) {
  return (
    <div className="w-full flex justify-center my-2 text-gray-700 text-sm bg-white">
      {pageSize === 0
        ? `Mostrando todos (${total}) produtos encontrados`
        : `Mostrando ${Math.min(
            page * pageSize,
            total
          )} de ${total} produtos encontrados`}
    </div>
  );
}
