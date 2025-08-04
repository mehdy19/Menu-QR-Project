import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CategoryNav from '../components/CategoryNav';
import MenuItem from '../components/MenuItem';

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesData);

        const menuItemsSnapshot = await getDocs(collection(db, 'menuItems'));
        const menuItemsData = menuItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Menu</h1>
      <CategoryNav categories={categories} />
      {categories.map(category => (
        <div key={category.id} id={category.id}>
          <h2>{category.name}</h2>
          {menuItems
            .filter(item => item.category === category.id)
            .map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
