import React from 'react';
import useOrderStore from '../stores/useOrderStore';

const Cart = () => {
  const { orderItems, updateQuantity, removeItem } = useOrderStore();
  const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Order</h2>
      {orderItems.length === 0 ? (
        <p>Your order is empty.</p>
      ) : (
        <ul>
          {orderItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
