import React from 'react';
import MenuPage from './pages/MenuPage';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuPage />
      <Cart />
      <OrderForm />
    </div>
  );
}

export default App;
