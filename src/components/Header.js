import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBox, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header({ cartCount, onCartClick }) {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/brandlogo.png`} 
            alt="TrendBazaar Logo"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <h1>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              TrendBazaar
            </Link>
          </h1>
        </div>
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle Navigation">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FontAwesomeIcon icon={faBox} /> Products
              </Link>
            </li>
            <li>
              <button
                onClick={onCartClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                aria-label="Open cart"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;