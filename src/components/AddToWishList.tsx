export interface AddToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export default function AddToWishList({
  onAddToWishList,
  onRequestClose,
}: AddToWishListProps) {
  return (
    <span>
      Deseja adicionar esse produto aos favoritos?
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  );
}
