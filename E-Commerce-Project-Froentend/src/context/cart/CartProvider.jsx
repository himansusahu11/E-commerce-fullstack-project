import { useState } from "react";
import CartContext from "./CartContext";
const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({});
  const [totalQuntaty, setTotalQuntaty] = useState(0);
  const addToCart = (product) => {
    const updatedCart = { ...cartState };
    if (updatedCart[product.id]) {
      updatedCart[product.id].quantity += 1;
    } else {
      updatedCart[product.id] = { ...product, quantity: 1 }; //merging bcz we dont have this proporty 'quantity
    }
    setTotalQuntaty(totalQuntaty + 1);
    setCartState(updatedCart);
  };
  const removeFromCart = (productId) => {
    const updatedCart = { ...cartState };
    // if (updatedCart[productId].quantity > 0) {
    //   updatedCart[productId].quantity -= 1;
    // }
    updatedCart[productId].quantity -= 1;
    if (updatedCart[productId].quantity <= 0) {
      delete updatedCart[productId];
    }

    setTotalQuntaty(totalQuntaty - 1);
    setCartState(updatedCart);
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
