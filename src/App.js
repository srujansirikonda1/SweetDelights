import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import './App.css';

function App() {
  const products = [
    { id: 1, title: 'Baklava', price: 7.99, image: '/Assests/image-baklava-desktop.png' },
    { id: 2, title: 'Brownie', price: 8.99, image: '/Assests/image-brownie-desktop.png' },
    { id: 3, title: 'Cake', price: 12.99, image: '/Assests/image-cake-desktop.png' },
    { id: 4, title: 'Crème Brûlée', price: 14.99, image: '/Assests/image-creme-brulee-desktop.png' },
    { id: 5, title: 'Macaron', price: 9.99, image: '/Assests/image-macaron-desktop.png' },
    { id: 6, title: 'Meringue', price: 7.99, image: '/Assests/image-meringue-desktop.png' },
    { id: 7, title: 'Panna Cotta', price: 13.99, image: '/Assests/image-panna-cotta-desktop.png' },
    { id: 8, title: 'Tiramisu', price: 14.99, image: 'Assests/image-tiramisu-desktop.png' },
    { id: 9, title: 'Waffle', price: 11.99, image: '/Assests/image-waffle-desktop.png' },
  ];

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage products={products} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;