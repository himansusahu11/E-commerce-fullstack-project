import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Product from "../../components/product/Product";
import Loader from "../../components/loader";
import "./productListing.css";
import { useEffect } from "react";
import axios from "axios";

const ProductListing = () => {
  const { categoryName } = useParams();

  const url = categoryName
    ? `http://fakestoreapi.com/products/category/${categoryName}`
    : `https://fakestoreapi.com/products`;
  console.log(categoryName);
  const { data: products, error, isLoading } = useFetchData(url, []);

  // useEffect(() => {
  //   (async function () {
  //     const res = await axios.get(url);
  //     console.log("🚀 ~ res:", res);
  //   })();
  // }, []);

  return (
    <div>
      {/* {isLoading && <Loader />}
      {products &&
        products.map((product, idx) => {
          return <Product product={product} key={idx + 1} />;
        })} */}

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
