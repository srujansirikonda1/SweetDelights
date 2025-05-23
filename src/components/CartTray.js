import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartTray({ isOpen, cartItems, onClose, incrementQuantity, decrementQuantity }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const cartArray = Object.values(cartItems);
  const totalPrice = cartArray.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    onClose();                // close cart tray
    navigate('/checkout');   // go to checkout page
  };

  return (
    <div
      className="cart-tray-overlay"
      style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="cart-tray"
        style={{
          width: '350px',
          backgroundColor: 'white',
          height: '100%',
          padding: '1rem',
          overflowY: 'auto',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2>Your Cart</h2>
        {cartArray.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {cartArray.map(({ product, quantity }) => (
                <li key={product.id} style={{ marginBottom: '1rem' }}>
                  <strong>{product.title}</strong>
                  <p>${product.price.toFixed(2)} x {quantity}</p>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button onClick={() => decrementQuantity(product.id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => incrementQuantity(product.id)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={handleProceedToCheckout}
              style={{
                marginTop: '1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            backgroundColor: 'hsl(12, 20%, 44%)',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Close Cart
        </button>
      </div>
    </div>
  );
}

export default CartTray;
