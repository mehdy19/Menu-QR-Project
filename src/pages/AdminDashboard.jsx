import React, { useState, useEffect } from 'react';
import { db, storage } from '../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MenuItemForm from '../components/MenuItemForm';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuItemsSnapshot = await getDocs(collection(db, 'menuItems'));
        const menuItemsData = menuItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleSave = async (itemData) => {
    try {
      let imageUrl = itemData.imageUrl || '';
      if (itemData.image) {
        const imageRef = ref(storage, `images/${itemData.image.name}`);
        await uploadBytes(imageRef, itemData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const dataToSave = { ...itemData, imageUrl, image: null };

      if (editingItem) {
        await updateDoc(doc(db, 'menuItems', editingItem.id), dataToSave);
      } else {
        await addDoc(collection(db, 'menuItems'), dataToSave);
      }
      // Refresh menu items
      const menuItemsSnapshot = await getDocs(collection(db, 'menuItems'));
      const menuItemsData = menuItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuItemsData);
    } catch (error) {
      console.error("Error saving menu item:", error);
    } finally {
      setEditingItem(null);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'menuItems', itemId));
      // Refresh menu items
      setMenuItems(menuItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
      <MenuItemForm item={editingItem} onSave={handleSave} />

      <h2>Menu Items</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => setEditingItem(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
