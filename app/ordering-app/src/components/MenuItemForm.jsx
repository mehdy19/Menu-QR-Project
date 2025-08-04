import React, { useState } from 'react';

const MenuItemForm = ({ item, onSave }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');
  const [price, setPrice] = useState(item ? item.price : '');
  const [category, setCategory] = useState(item ? item.category : '');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, price, category, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Save</button>
    </form>
  );
};

export default MenuItemForm;
