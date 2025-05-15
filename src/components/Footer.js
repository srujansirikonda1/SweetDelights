import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} TrendBazaar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;