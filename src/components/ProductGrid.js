import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products, cartItems, addToCart, incrementQuantity, decrementQuantity }) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map(product => {
        const cartItem = cartItems[product.id];
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantity}
            addToCart={addToCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
