import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import CartTray from '../components/CartTray';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const newQuantity = (prev[product.id]?.quantity || 0) + 1;
      return {
        ...prev,
        [product.id]: { product, quantity: newQuantity },
      };
    });
    toast.success('Product added to cart!');
  };

  const incrementQuantity = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: prev[productId].quantity + 1,
      },
    }));
  };

  const decrementQuantity = (productId) => {
    setCartItems(prev => {
      const currentQuantity = prev[productId].quantity;
      if (currentQuantity === 1) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: currentQuantity - 1,
        },
      };
    });
  };

  return (
    <div className="products-page" style={{ position: 'relative' }}>
      <h1>Products</h1>
      <input
        type="search"
        placeholder="Search products..."
        autoFocus
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '8px', width: '100%', maxWidth: '400px' }}
      />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductGrid
          products={filteredProducts}
          cartItems={cartItems}
          addToCart={addToCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      )}

      <button
        className="cart-button"
        onClick={() => setCartOpen(true)}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: 'hsl(159, 69%, 38%)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
          zIndex: 1100,
        }}
      >
        Cart ({Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      <CartTray
        isOpen={cartOpen}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default ProductsPage;
