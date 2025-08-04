import React, { useState } from 'react';
import useOrderStore from '../stores/useOrderStore';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const OrderForm = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { orderItems, clearCart } = useOrderStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber) {
      alert('Please enter your table number.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'orders'), {
        tableNumber,
        items: orderItems,
        status: 'new',
        createdAt: serverTimestamp(),
        totalPrice: orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
      });
      alert(`Order placed for table ${tableNumber}!`);
      clearCart();
      setTableNumber('');
    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        placeholder="Enter your table number"
      />
      <button type="submit" disabled={orderItems.length === 0 || loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

export default OrderForm;
