// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartTray from './components/CartTray'; // Ensure correct import
import './App.css';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  // App.js example setup


  const products = [
    { id: 1, title: 'Baklava', price: 7.99, image: `${process.env.PUBLIC_URL}/Assets/image-baklava-desktop.png` },
    { id: 2, title: 'Brownie', price: 8.99, image: `${process.env.PUBLIC_URL}/Assets/image-brownie-desktop.png` },
    { id: 3, title: 'Cake', price: 12.99, image: `${process.env.PUBLIC_URL}/Assets/image-cake-desktop.png` },
    { id: 4, title: 'Crème Brûlée', price: 14.99, image: `${process.env.PUBLIC_URL}/Assets/image-creme-brulee-desktop.png` },
    { id: 5, title: 'Macaron', price: 9.99, image: `${process.env.PUBLIC_URL}/Assets/image-macaron-desktop.png` },
    { id: 6, title: 'Meringue', price: 7.99, image: `${process.env.PUBLIC_URL}/Assets/image-meringue-desktop.png` },
    { id: 7, title: 'Panna Cotta', price: 13.99, image: `${process.env.PUBLIC_URL}/Assets/image-panna-cotta-desktop.png` },
    { id: 8, title: 'Tiramisu', price: 14.99, image: `${process.env.PUBLIC_URL}/Assets/image-tiramisu-desktop.png` },
    { id: 9, title: 'Waffle', price: 11.99, image: `${process.env.PUBLIC_URL}/Assets/image-waffle-desktop.png` }
  ];

  return (
    <div className="App">
      <Header onCartClick={() => setCartOpen(!cartOpen)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage products={products} />} />
        </Routes>
      </main>
      <Footer />
      
      <CartTray
        isOpen={cartOpen}
        cartItems={{}} // Pass your cart items here
        onClose={() => setCartOpen(false)}
        incrementQuantity={() => {}} // Implement this based on your state
        decrementQuantity={() => {}} // Implement this based on your state
      />
    </div>
  );
}

export default App;