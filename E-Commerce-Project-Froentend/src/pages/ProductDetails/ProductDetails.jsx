import { useLocation } from "react-router-dom";
import "./ProductDetails.css";
import { displayRazorpay } from "../../utils/payment";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const handleCheckout = () => {
    displayRazorpay(product._id, product.price);
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <div className="product-details-heading"></div>
      <div className="product-details-container">
        <div className="product-details-wrapper">
          <div className="product-details-content">
            <div className="product-details-content-left">
              <img src={product.productImages} alt={product.name} />
            </div>
            <div className="product-details-content-right">
              <h3>{product.name} </h3>
              <hr />
              <h6>Ratings : {product.averageRating}</h6>
              <hr />
              <h6>Price: ₹ {product.price}</h6>
              <hr />
              <p>
                <span style={{ fontWeight: "bold" }}>Description</span> :{" "}
                {product.description}
              </p>
              <hr />
              <div className="product-details-size-btn">
                <button>XL</button>
                <button>L</button>
                <button>M</button>
                <button>S</button>
                <button>XS</button>
              </div>
              <hr />
              <div className="checkout-btn">
                <button onClick={handleCheckout}>checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
