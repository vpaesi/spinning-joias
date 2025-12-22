interface BtnLimparCarrinhoProps {
  onLimpar: () => void;
}

export default function BtnLimparCarrinho({
  onLimpar,
}: BtnLimparCarrinhoProps) {
  return (
    <button
      className="btn-carrinho-limpa"
      onClick={() => {
        if (window.confirm("Tem certeza que deseja limpar todo o carrinho?")) {
          onLimpar();
        }
      }}
      title="Remover todos os itens do carrinho"
    >
      Limpar carrinho
    </button>
  );
}
