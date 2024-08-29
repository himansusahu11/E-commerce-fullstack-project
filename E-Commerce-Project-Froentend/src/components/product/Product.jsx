import { useState } from "react";
import { useCart } from "../../context/cart/useCart";
import "./product.css";
import { FaCartPlus } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const itemInCart = cart[product._id];
  const quantity = itemInCart ? itemInCart.quantity : 0;
  console.log(quantity);

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/details/${product._id}`, { state: { product } });
  };
  const handleCartIconClick = () => {
    setShowQuantityControls(!showQuantityControls);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowQuantityControls(true); // Show controls when adding to cart
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
    if (quantity <= 1) {
      setShowQuantityControls(false); // Hide controls if quantity is zero
    }
  };

  return (
    <div className="product-item">
      <img
        className="product-image"
        src={product.productImages}
        alt={product.name}
        onClick={handleProductClick}
      />
      <div className="cart-icon" onClick={handleCartIconClick}>
        <FaCartPlus />
      </div>
      <div className="product-details">
        <div className="product-title" onClick={handleProductClick}>
          {product.name}
        </div>
        <div className="buy-item">
          <div className="product-price">Price: ${product.price}</div>
        </div>
        {showQuantityControls && (
          <div className="adding-removing-cart-items">
            <CiCirclePlus onClick={handleAddToCart} />
            {quantity}
            <CiCircleMinus onClick={handleRemoveFromCart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
