import { useState } from "react";
import { useCart } from "../../context/cart/useCart";
import "./product.css";
import { FaCartPlus } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const itemInCart = cart[product.id];
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/details/${product.id}`);
  };
  const handleCartIconClick = () => {
    setShowQuantityControls(!showQuantityControls);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowQuantityControls(true); // Show controls when adding to cart
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
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

// import { useState } from "react";
// import { useCart } from "../../context/cart/useCart";
// import "./product.css";
// import { FaCartPlus } from "react-icons/fa";
// import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";

// const Product = ({ product }) => {
//   const { cart, addToCart, removeFromCart } = useCart();
//   const [showQuantityControls, setShowQuantityControls] = useState(false);
//   const itemInCart = cart[product.id];
//   const quantity = itemInCart ? itemInCart.quantity : 0;

//   const navigate = useNavigate();

//   const handleProductClick = () => {
//     navigate(`/products/details/${product.id}`);
//   };
//   const handleCartIconClick = () => {
//     setShowQuantityControls(!showQuantityControls);
//   };

//   const handleAddToCart = () => {
//     addToCart(product);
//     setShowQuantityControls(true); // Show controls when adding to cart
//   };

//   const handleRemoveFromCart = () => {
//     removeFromCart(product.id);
//     if (quantity <= 1) {
//       setShowQuantityControls(false); // Hide controls if quantity is zero
//     }
//   };

//   return (
//     <div className="product-item">
//       <img
//         className="product-image"
//         src={product.image}
//         alt={product.title}
//         onClick={handleProductClick}
//       />
//       <div className="cart-icon" onClick={handleCartIconClick}>
//         <FaCartPlus />
//       </div>
//       <div className="product-details">
//         <div className="product-title" onClick={handleProductClick}>
//           {product.title}
//         </div>
//         <div className="buy-item">
//           <div className="product-price">Price: ${product.price}</div>
//         </div>
//         {showQuantityControls && (
//           <div className="adding-removing-cart-items">
//             <CiCirclePlus onClick={handleAddToCart} />
//             {quantity}
//             <CiCircleMinus onClick={handleRemoveFromCart} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Product;
