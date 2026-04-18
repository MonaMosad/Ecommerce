import React, { useContext } from 'react';
import { CartContext } from './CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, increaseQuantity, decreaseQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const goCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div onClick={() => setCartOpen(false)} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1100,
        opacity: cartOpen ? 1 : 0, pointerEvents: cartOpen ? 'all' : 'none',
        transition: 'opacity 0.3s'
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '100vw',
        background: '#fff', zIndex: 1200, display: 'flex', flexDirection: 'column',
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111' }}>
            Your Cart <span style={{ color: '#2563eb', fontSize: 16 }}>({cartItems.reduce((s,i)=>s+i.quantity,0)})</span>
          </h2>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: 4 }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
              <svg width="64" height="64" fill="none" stroke="#ddd" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: 16 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p style={{ fontSize: 16, fontWeight: 500 }}>Your cart is empty</p>
              <p style={{ fontSize: 13 }}>Add some products to get started</p>
            </div>
          ) : cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #f5f5f5', alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, background: '#f8f8f8', borderRadius: 10, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={item.images?.[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: '#2563eb' }}>${(item.price * item.quantity).toFixed(2)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => decreaseQuantity(item.id)} style={qBtnStyle}>−</button>
                  <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} style={qBtnStyle}>+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 4, flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color='#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color='#ccc'}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 500, color: '#666' }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={goCheckout} style={{
              width: '100%', padding: '14px', background: '#2563eb', color: '#fff',
              border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer',
              transition: 'background 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.background='#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background='#2563eb'}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const qBtnStyle = {
  width: 28, height: 28, borderRadius: 8, border: '1.5px solid #e5e7eb',
  background: '#f9fafb', cursor: 'pointer', fontWeight: 700, fontSize: 16,
  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333'
};
