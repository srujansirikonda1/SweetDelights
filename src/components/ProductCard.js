import React from 'react';

function ProductCard({ product }) {
  const handleAddToCart = () => {
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;