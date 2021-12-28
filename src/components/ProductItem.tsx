import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { AddToWishListProps } from "./AddToWishList";
import lodash from "lodash";

const AddToWishList = dynamic<AddToWishListProps>(
  () => {
    return import("./AddToWishList").then((mod) => mod.default);
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

function _ProductItem({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(_ProductItem, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
});
