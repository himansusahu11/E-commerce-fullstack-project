import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Product from "../../components/product/Product";
import Loader from "../../components/loader";
import "./productListing.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { ProductsContext } from "../../context/products/ProductsContext";
import ShopHero from "../../components/ShopHero/ShopHero";

const ProductListing = () => {
  const { categoryName } = useParams();

  // const url = categoryName
  //   ? `http://fakestoreapi.com/products/category/${categoryName}`
  //   : `https://fakestoreapi.com/products`;
  // const { data: products, error, isLoading } = useFetchData(url, []);

  const { products, isLoading, error, setProductsUrl } =
    useContext(ProductsContext);
  useEffect(() => {
    if (categoryName) {
      setProductsUrl(
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
    } else {
      setProductsUrl("https://fakestoreapi.com/products");
    }
  }, [categoryName, setProductsUrl]);

  return (
    <div>
      <ShopHero />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="product_list">
            {products &&
              products.map((product, idx) => {
                return <Product product={product} key={idx + 1} />;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
