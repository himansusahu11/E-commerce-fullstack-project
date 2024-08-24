import { createContext, useState } from "react";
import useFetchData from "../../hooks/useFetchData";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsUrl, setProductsUrl] = useState(
    "https://fakestoreapi.com/products"
  );
  const { data: products, isLoading, error } = useFetchData(productsUrl);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, error, setProductsUrl }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
