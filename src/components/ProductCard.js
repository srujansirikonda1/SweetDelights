import React from 'react';

function ProductCard({ product, cartItem, addToCart, incrementQuantity, decrementQuantity }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} style={{ maxHeight: '180px', objectFit: 'contain' }} />
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>

      {!cartItem ? (
        <button onClick={() => addToCart(product)} className="add-to-cart-btn">
          Add to Cart
        </button>
      ) : (
        <div className="quantity-control" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => decrementQuantity(product.id)} className="add-to-cart-btn" style={{ width: '30px' }}>
            -
          </button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => incrementQuantity(product.id)} className="add-to-cart-btn" style={{ width: '30px' }}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
