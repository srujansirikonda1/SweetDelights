import React from 'react';

function ProductCard({ product, quantity, addToCart, incrementQuantity, decrementQuantity }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3 title={product.title}>{product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>

      {quantity === 0 ? (
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => decrementQuantity(product.id)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => incrementQuantity(product.id)}>+</button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
