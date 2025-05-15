import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products, cartItems, addToCart, incrementQuantity, decrementQuantity }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          cartItem={cartItems[product.id]}
          addToCart={addToCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
