import React, { useState } from 'react';

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    setFormData({ name: '', address: '', email: '', phone: '' });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
            style={{ marginTop: '4px', marginBottom: '16px' }}
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ marginTop: '4px', marginBottom: '16px' }}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginTop: '4px', marginBottom: '16px' }}
          />
        </label>
        <label>
          Phone:
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ marginTop: '4px', marginBottom: '16px' }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: 'hsl(159, 69%, 38%)',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            marginTop: '1rem',
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
