// import { useState } from "react";
// import CartContext from "./CartContext";
// const CartProvider = ({ children }) => {
//   const [cartState, setCartState] = useState({});
//   const [totalQuntaty, setTotalQuntaty] = useState(0);
//   const addToCart = (product) => {
//     const updatedCart = { ...cartState };
//     if (updatedCart[product._id]) {
//       updatedCart[product._id].quantity += 1;
//     } else {
//       updatedCart[product._id] = { ...product, quantity: 1 }; //merging bcz we dont have this proporty 'quantity
//     }
//     setTotalQuntaty(totalQuntaty + 1);
//     setCartState(updatedCart);
//   };
//   const removeFromCart = (productId) => {
//     const updatedCart = { ...cartState };
//     // if (updatedCart[productId].quantity > 0) {
//     //   updatedCart[productId].quantity -= 1;
//     // }
//     updatedCart[productId].quantity -= 1;
//     if (updatedCart[productId].quantity <= 0) {
//       delete updatedCart[productId];
//     }

//     setTotalQuntaty(totalQuntaty - 1);
//     setCartState(updatedCart);
//   };
//   const cartContextValue = {
//     cart: cartState,
//     totalQuntaty,
//     addToCart,
//     removeFromCart,
//   };
//   return (
//     <CartContext.Provider value={cartContextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
import { useState } from "react";
import CartContext from "./CartContext";
const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({});
  const [totalQuntaty, setTotalQuntaty] = useState(0);
  const addToCart = (product) => {
    const updatedCart = { ...cartState };

    // Debugging
    console.log(`Adding product to cart:`, product);

    // Ensure price is a number
    const numericPrice = Number(product.price);
    if (isNaN(numericPrice)) {
      console.error(`Invalid price value for product: ${product.name}`);
    }

    if (updatedCart[product._id]) {
      updatedCart[product._id].quantity += 1;
    } else {
      updatedCart[product._id] = {
        ...product,
        quantity: 1,
        price: numericPrice,
      };
    }

    setTotalQuntaty(totalQuntaty + 1);
    setCartState(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = { ...cartState };

    // Ensure the product exists and has a quantity
    if (updatedCart[productId] && updatedCart[productId].quantity > 0) {
      updatedCart[productId].quantity -= 1;

      if (updatedCart[productId].quantity <= 0) {
        delete updatedCart[productId];
      }

      setTotalQuntaty(totalQuntaty - 1);
      setCartState(updatedCart);
    } else {
      console.error(
        `Product not found in cart or quantity is zero: ${productId}`
      );
    }
  };

  const cartContextValue = {
    cart: cartState,
    totalQuntaty,
    addToCart,
    removeFromCart,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
