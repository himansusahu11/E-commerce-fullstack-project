import "./CartItem.css";

const CartItem = ({ cartData }) => {
  const { _id, name, price, quantity, productImages } = cartData;
  const totalPrice = price * quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div className="cart-item-image">
          <img src={productImages} alt={name} />
        </div>
        <div className="cart-item-info">
          <h3 className="cart-item-name">{name}</h3>
          <p className="cart-item-price">₹ {price.toFixed(2)}</p>
        </div>
      </div>
      {<span className="cart-item-quantity">{quantity}</span>}

      <div className="cart-item-total">
        <p className="cart-item-total-price">₹ {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
