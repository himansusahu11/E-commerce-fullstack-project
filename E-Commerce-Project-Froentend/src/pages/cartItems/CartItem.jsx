import CartItem from "../../components/CartItems/CartItem";
import { useCart } from "../../context/cart/useCart";
import "./CartItem.css";
const CartItems = () => {
  const { cart } = useCart();
  // Calculate the net total price
  const netTotalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <h2 className="cart-items-heading">Your cart Items</h2>
      <ul className="cart-items">
        {Object.values(cart).map((item, index) => {
          return <CartItem key={`cart-item-${index}`} cartData={item} />;
        })}
      </ul>
      <div className="cart-net-total">
        <p className="cart-net-total-label">Net Total</p>
        <p className="cart-net-total-price">${netTotalPrice.toFixed(2)}</p>
      </div>
    </>
  );
};

export default CartItems;
