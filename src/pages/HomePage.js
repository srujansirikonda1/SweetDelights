import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <img 
          src={`${process.env.PUBLIC_URL}/Assets/brandlogo.png`} 
          alt="Welcome to TrendBazaar" 
          className="hero-image"
        />
        <h2>Welcome to TrendBazaar, Your One-Stop Shop for Everything!</h2>
        <p>
          Discover a wide range of quality products—from stylish apparel and electronics to unique accessories and more.
          We bring you the best deals and top brands all in one place to satisfy your shopping cravings.
        </p>
        <button onClick={handleShopNow} className="cta-button">Shop Now</button>
      </div>
    </div>
  );
}

export default HomePage;
