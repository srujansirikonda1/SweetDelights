import React from 'react';
import ProductGrid from '../components/ProductGrid';

function ProductsPage({ products }) {
  return (
    <div className="products-page">
      <h1>Desserts</h1>
      <ProductGrid products={products} />
    </div>
  );
}

export default ProductsPage;


