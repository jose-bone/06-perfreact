import { AutoSizer, List } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultProps {
  results: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }[];
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

export function SearchResult({
  totalPrice,
  results,
  onAddToWishList,
}: SearchResultProps) {
  return (
    <div>
      <h1>{totalPrice}</h1>
      <AutoSizer>
        {({ width }) => {
          return (
            <List
              height={300}
              rowHeight={30}
              width={width}
              overscanRowCount={5}
              rowCount={results.length}
              rowRenderer={({ index, key, style }) => {
                return (
                  <div key={key} style={style}>
                    <ProductItem
                      product={results[index]}
                      onAddToWishList={onAddToWishList}
                    />
                  </div>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}
