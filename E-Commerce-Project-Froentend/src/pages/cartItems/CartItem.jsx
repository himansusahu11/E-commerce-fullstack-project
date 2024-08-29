import CartItem from "../../components/CartItems/CartItem";
import { useCart } from "../../context/cart/useCart";
import "./CartItem.css";

const CartItems = () => {
  const { cart } = useCart();

  // Calculate the net total price
  const netTotalPrice = Object.values(cart).reduce((total, item) => {
    const price = Number(item.price); // Convert price to a number
    return total + price * item.quantity;
  }, 0);

  const isCartEmpty = Object.keys(cart).length === 0;

  return (
    <>
      <div className="cart-header"></div>
      <h3 className="cart-items-heading">
        {isCartEmpty ? "Your cart is empty" : "Your cart Items"}
      </h3>
      {!isCartEmpty && (
        <>
          <ul className="cart-items">
            {Object.values(cart).map((item, index) => (
              <CartItem key={`cart-item-${index}`} cartData={item} />
            ))}
          </ul>
          <div className="cart-net-total">
            <p className="cart-net-total-label">Net Total</p>
            <p className="cart-net-total-price">₹ {netTotalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </>
  );
};

export default CartItems;
