import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faBox, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <h1>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Sweet Delights
            </Link>
          </h1>
        </div>
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle Navigation">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
            <li><Link to="/products"><FontAwesomeIcon icon={faBox} /> Products</Link></li>
            <li><Link to="/ProductGrid"><FontAwesomeIcon icon={faShoppingCart} /> Cart</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;