
import ProductItem from "../components/ProductItem.jsx";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar.jsx";
import { products } from "../data/prodcuts.js";
import { useState } from "react";
export default function ProductsPage() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1>Products Page</h1>
      {/* Add your product listing components here */}
      <SearchBar
        query={query}
        setQuery={setQuery}
      />

      <ProductList
        products={products}
        query={query}
      />

    </div>
  );
}