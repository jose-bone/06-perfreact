import { FormEvent, useCallback, useState } from "react";
import { SearchResult } from "../components/SearchResult";

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0,
  });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const url = "http://localhost:3333/products?q=" + search;
    const response = await fetch(url);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  const onAddToWishList = useCallback(async (id: number) => {}, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResult
        totalPrice={results.totalPrice}
        results={results.data}
        onAddToWishList={onAddToWishList}
      />
    </div>
  );
}
