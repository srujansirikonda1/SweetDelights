import React, { useEffect, useState, useRef } from 'react';
import ProductGrid from '../components/ProductGrid';
import CartTray from '../components/CartTray';
import CheckoutForm from '../components/CheckoutForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [cartItems, setCartItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
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
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= priceFilter[0] && p.price <= priceFilter[1]
    );

    // Filter by rating (rounded down)
    if (ratingFilter > 0) {
      filtered = filtered.filter(
        p => Math.floor(p.rating.rate) >= ratingFilter
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, priceFilter, ratingFilter, products]);

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

  const clearCart = () => {
    setCartItems({});
  };

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="products-page" style={{ position: 'relative' }}>
      <h1>Products</h1>

      {/* Search and Filters */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flexGrow: 1, minWidth: '200px' }}
        />

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={{ padding: '8px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Price Range</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceFilter[1]}
            onChange={e => setPriceFilter([0, Number(e.target.value)])}
          />
          <small>${priceFilter[0]} - ${priceFilter[1]}</small>
        </div>

        <select
          value={ratingFilter}
          onChange={e => setRatingFilter(Number(e.target.value))}
          style={{ padding: '8px' }}
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1 star & up</option>
          <option value={2}>2 stars & up</option>
          <option value={3}>3 stars & up</option>
          <option value={4}>4 stars & up</option>
          <option value={5}>5 stars</option>
        </select>
      </div>

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

      {/* Cart Button */}
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
          marginRight: '10px',
        }}
      >
        Cart ({Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      {/* Checkout Button */}
      <button
        className="checkout-button"
        disabled={Object.keys(cartItems).length === 0}
        onClick={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        style={{
          position: 'fixed',
          top: 20,
          right: 120,
          backgroundColor: 'hsl(12, 80%, 50%)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: Object.keys(cartItems).length === 0 ? 'not-allowed' : 'pointer',
          zIndex: 1100,
        }}
      >
        Checkout
      </button>

      {/* Cart Tray */}
      <CartTray
        isOpen={cartOpen}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />

      {/* Checkout Form Modal */}
      {checkoutOpen && (
        <CheckoutForm
          cartItems={cartItems}
          onClose={() => setCheckoutOpen(false)}
          onClearCart={clearCart}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default ProductsPage;
