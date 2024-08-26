import { createContext, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import urlConfig from "../../utils/urlConfig";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsUrl, setProductsUrl] = useState(
    // "https://fakestoreapi.com/products"
    "http://localhost:5050/api/product"
  );
  const { data: products, isLoading, error } = useFetchData(productsUrl);
  console.log(products);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, error, setProductsUrl }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
