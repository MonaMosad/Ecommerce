import React, { useContext, useState } from 'react';
import { CartContext } from '../component/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb',
  fontSize: 14, outline: 'none', color: '#1a1a1a', background: '#fff', boxSizing: 'border-box'
};

const labelStyle = { fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' };

export default function Checkout() {
  const { cartItems, cartTotal, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=details, 2=payment, 3=confirmation
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: '', cardName: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [payMethod, setPayMethod] = useState('card');

  const shipping = cartTotal > 0 ? (cartTotal > 100 ? 0 : 9.99) : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    if (payMethod !== 'card') return true;
    const e = {};
    if (!form.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) e.cardNumber = 'Enter valid 16-digit card number';
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Format: MM/YY';
    if (!form.cvv.match(/^\d{3,4}$/)) e.cvv = 'Enter 3 or 4 digits';
    if (!form.cardName.trim()) e.cardName = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatCard = (val) => {
    return val.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
  };

  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, '');
    if (v.length >= 3) return v.slice(0, 2) + '/' + v.slice(2, 4);
    return v;
  };

  const placeOrder = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    clearCart();
    setStep(3);
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#f8fafc' }}>
        <div style={{ fontSize: 80 }}>🛒</div>
        <h2 style={{ marginTop: 24, fontSize: 26, fontWeight: 700, color: '#374151' }}>Your cart is empty</h2>
        <p style={{ color: '#9ca3af', marginBottom: 32, fontSize: 16 }}>Add some products before checking out.</p>
        <Link to="/Products" style={{ padding: '12px 32px', background: '#2563eb', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 600 }}>Shop Now</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#f8fafc', textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
          <svg width="40" height="40" fill="none" stroke="#16a34a" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginBottom: 12 }}>Order Confirmed!</h1>
        <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 420, marginBottom: 12 }}>
          Thank you for your order, <strong>{form.firstName}</strong>! A confirmation has been sent to <strong>{form.email}</strong>.
        </p>
        <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 40 }}>Your order will be delivered in 3-5 business days.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/" style={{ padding: '12px 28px', background: '#2563eb', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Back to Home</Link>
          <Link to="/Products" style={{ padding: '12px 28px', background: '#fff', color: '#2563eb', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1.5px solid #2563eb' }}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40, maxWidth: 500 }}>
          {[['1', 'Shipping'], ['2', 'Payment']].map(([s, label], i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, border: '2px solid',
                  borderColor: step >= parseInt(s) ? '#2563eb' : '#d1d5db',
                  background: step >= parseInt(s) ? '#2563eb' : '#fff',
                  color: step >= parseInt(s) ? '#fff' : '#9ca3af'
                }}>{s}</div>
                <span style={{ fontWeight: 600, fontSize: 14, color: step >= parseInt(s) ? '#1a1a1a' : '#9ca3af' }}>{label}</span>
              </div>
              {i === 0 && <div style={{ flex: 1, height: 2, background: step >= 2 ? '#2563eb' : '#e5e7eb', margin: '0 12px' }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>

          {/* Left Form */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 1px 16px rgba(0,0,0,0.07)' }}>
            {step === 1 && (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 28, color: '#111' }}>Shipping Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Field label="First Name" value={form.firstName} onChange={v => update('firstName', v)} error={errors.firstName} style={inputStyle} />
                  <Field label="Last Name" value={form.lastName} onChange={v => update('lastName', v)} error={errors.lastName} style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Field label="Email" type="email" value={form.email} onChange={v => update('email', v)} error={errors.email} style={inputStyle} />
                  <Field label="Phone (optional)" type="tel" value={form.phone} onChange={v => update('phone', v)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Field label="Address" value={form.address} onChange={v => update('address', v)} error={errors.address} style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                  <Field label="City" value={form.city} onChange={v => update('city', v)} error={errors.city} style={inputStyle} />
                  <Field label="ZIP / Postal Code" value={form.zip} onChange={v => update('zip', v)} style={inputStyle} />
                </div>
                <button onClick={() => validateStep1() && setStep(2)} style={{
                  width: '100%', padding: 14, background: '#2563eb', color: '#fff',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer'
                }}>Continue to Payment →</button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    ← Back
                  </button>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', margin: 0 }}>Payment</h2>
                </div>

                {/* Pay Methods */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
                  {[['card', '💳 Credit Card'], ['paypal', '🅿 PayPal'], ['cod', '💵 Cash on Delivery']].map(([m, label]) => (
                    <button key={m} onClick={() => setPayMethod(m)} style={{
                      flex: 1, padding: '10px 8px', borderRadius: 12, fontWeight: 600, fontSize: 12,
                      border: `2px solid ${payMethod === m ? '#2563eb' : '#e5e7eb'}`,
                      background: payMethod === m ? '#eff6ff' : '#fff', color: payMethod === m ? '#2563eb' : '#6b7280', cursor: 'pointer'
                    }}>{label}</button>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Card Number</label>
                      <input style={{ ...inputStyle, letterSpacing: 2, fontFamily: 'monospace', fontSize: 16 }}
                        placeholder="0000 0000 0000 0000"
                        value={form.cardNumber}
                        onChange={e => update('cardNumber', formatCard(e.target.value))}
                      />
                      {errors.cardNumber && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.cardNumber}</p>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={labelStyle}>Expiry Date</label>
                        <input style={inputStyle} placeholder="MM/YY" value={form.expiry} onChange={e => update('expiry', formatExpiry(e.target.value))} maxLength={5} />
                        {errors.expiry && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.expiry}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>CVV</label>
                        <input style={inputStyle} placeholder="123" value={form.cvv} onChange={e => update('cvv', e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4} />
                        {errors.cvv && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.cvv}</p>}
                      </div>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <Field label="Name on Card" value={form.cardName} onChange={v => update('cardName', v)} error={errors.cardName} style={inputStyle} />
                    </div>
                  </>
                )}

                {payMethod === 'paypal' && (
                  <div style={{ padding: '40px 20px', textAlign: 'center', background: '#fafafa', borderRadius: 12, marginBottom: 28 }}>
                    <p style={{ fontSize: 15, color: '#374151', marginBottom: 8 }}>You'll be redirected to PayPal to complete your payment securely.</p>
                    <p style={{ fontSize: 13, color: '#9ca3af' }}>Total: <strong style={{ color: '#2563eb' }}>${total.toFixed(2)}</strong></p>
                  </div>
                )}

                {payMethod === 'cod' && (
                  <div style={{ padding: '30px 20px', background: '#f0fdf4', borderRadius: 12, marginBottom: 28, border: '1.5px solid #bbf7d0' }}>
                    <p style={{ fontSize: 15, color: '#166534', fontWeight: 600, marginBottom: 6 }}>✅ Pay when your order arrives</p>
                    <p style={{ fontSize: 13, color: '#4ade80' }}>Cash on delivery available for orders under $500.</p>
                  </div>
                )}

                <button onClick={() => validateStep2() && placeOrder()} disabled={processing} style={{
                  width: '100%', padding: 15, background: processing ? '#93c5fd' : '#2563eb', color: '#fff',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: processing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                }}>
                  {processing ? (
                    <>
                      <span style={{ width: 20, height: 20, border: '3px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                      Processing…
                    </>
                  ) : `Place Order · $${total.toFixed(2)}`}
                </button>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 1px 16px rgba(0,0,0,0.07)', position: 'sticky', top: 100 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#111' }}>Order Summary</h3>
            <div style={{ maxHeight: 280, overflowY: 'auto', marginBottom: 20 }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #f5f5f5', alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, background: '#f8f8f8', borderRadius: 8, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={item.images?.[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280' }}>x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
              {[['Subtotal', `$${cartTotal.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`], ['Tax (8%)', `$${tax.toFixed(2)}`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#6b7280' }}>{k}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: v === 'FREE' ? '#16a34a' : '#1a1a1a' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f0f0', marginTop: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#2563eb' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            {cartTotal > 100 && (
              <p style={{ marginTop: 12, fontSize: 12, color: '#16a34a', textAlign: 'center', background: '#f0fdf4', padding: '8px', borderRadius: 8, fontWeight: 600 }}>
                🎉 You qualify for FREE shipping!
              </p>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, error, style }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{ ...style, borderColor: error ? '#ef4444' : '#e5e7eb' }}
      />
      {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  );
}
