import React from 'react';
import useOrderStore from '../stores/useOrderStore';

const MenuItem = ({ item }) => {
  const addItem = useOrderStore((state) => state.addItem);

  return (
    <div>
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span>${item.price}</span>
      <button onClick={() => addItem(item)}>Add to Order</button>
    </div>
  );
};

export default MenuItem;
