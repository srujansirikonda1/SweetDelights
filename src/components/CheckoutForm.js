import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

function CheckoutForm({ cartItems, onClose, onClearCart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState('credit-card');
  const [errors, setErrors] = useState({});

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!paymentOption) newErrors.paymentOption = 'Payment option is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Show summary in alert or console (you can improve this UI)
    alert(
      `Order Summary:\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment: ${paymentOption}\nItems: ${Object.values(cartItems).length} product(s)`
    );

    // Clear cart & close form
    onClearCart();
    onClose();

    toast.success('Thank you for your purchase!');
  };

  return (
    <div
      className="checkout-overlay"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1200,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        }}
        noValidate
      >
        <h2>Checkout</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name*</label><br />
          <input
            id="name"
            ref={nameInputRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email*</label><br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="address">Address*</label><br />
          <textarea
            id="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            rows="3"
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.address && <small style={{ color: 'red' }}>{errors.address}</small>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="paymentOption">Payment Option*</label><br />
          <select
            id="paymentOption"
            value={paymentOption}
            onChange={e => setPaymentOption(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">Paypal</option>
            <option value="cash">Cash on Delivery</option>
          </select>
          {errors.paymentOption && <small style={{ color: 'red' }}>{errors.paymentOption}</small>}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: 'hsl(159, 69%, 38%)',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '1rem',
          }}
        >
          Submit Order
        </button>

        <button
          type="button"
          onClick={onClose}
          style={{
            backgroundColor: 'hsl(0, 0%, 80%)',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
