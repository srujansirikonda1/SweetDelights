import React from 'react';

function CartTray({ isOpen, cartItems, onClose, incrementQuantity, decrementQuantity }) {
  return (
    < div className={`cart-tray ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 999,
          }}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-350px',
          height: '100vh',
          width: '350px',
          backgroundColor: 'white',
          boxShadow: '-3px 0 10px rgba(0,0,0,0.2)',
          padding: '20px',
          transition: 'right 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          onClick={onClose}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
          aria-label="Close cart"
        >
          &times;
        </button>

        <h2>Your Cart</h2>
        {Object.keys(cartItems).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, flexGrow: 1, overflowY: 'auto' }}>
            {Object.values(cartItems).map(({ product, quantity }) => (
              <li key={product.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>{product.title}</h4>
                    <p style={{ margin: 0 }}>${product.price.toFixed(2)} x {quantity} = ${(product.price * quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div style={{ marginTop: '8px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => decrementQuantity(product.id)} className="add-to-cart-btn" style={{ width: '30px' }}>-</button>
                  <span style={{ alignSelf: 'center' }}>{quantity}</span>
                  <button onClick={() => incrementQuantity(product.id)} className="add-to-cart-btn" style={{ width: '30px' }}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}

export default CartTray;
