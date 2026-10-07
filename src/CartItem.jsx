import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';

function CartItem({ go }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const itemTotal = (item) => item.cost * item.quantity;
  const cartTotal = items.reduce((sum, item) => sum + itemTotal(item), 0);

  const increase = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const decrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div>
      <Navbar go={go} />
      <main className="cart-page">
        <h2>Shopping Cart</h2>
        <p className="cart-total">Total Cart Amount: ${cartTotal}</p>

        {items.length === 0 && <p className="empty">Your cart is empty. Add a plant to get started.</p>}

        {items.map((item) => (
          <div className="cart-row" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
              <div className="qty">
                <button onClick={() => decrease(item)} aria-label={`Decrease ${item.name}`}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
              <p className="subtotal">Total: ${itemTotal(item)}</p>
            </div>
            <button className="btn btn-danger" onClick={() => dispatch(removeItem(item.name))}>
              Delete
            </button>
          </div>
        ))}

        <div className="cart-actions">
          <button className="btn btn-secondary" onClick={() => go('plants')}>
            Continue Shopping
          </button>
          <button className="btn btn-primary" onClick={() => alert('Coming Soon')}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
