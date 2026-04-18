import React, { useContext } from 'react';
import { CartContext } from '../component/CartContext.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Favorites() {
  const { favorites, removeFromFavorites, addToCart, setCartOpen } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.title} added to cart!`);
    setCartOpen(true);
  };

  return (
    <div style={{ minHeight: '70vh', background: '#f8fafc', padding: '48px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111', margin: 0 }}>My Wishlist</h1>
          <p style={{ color: '#6b7280', marginTop: 8, fontSize: 16 }}>
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>🤍</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Your wishlist is empty</h2>
            <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 32 }}>Save items you love by clicking the heart icon on any product.</p>
            <Link to="/Products" style={{
              display: 'inline-block', padding: '12px 32px', background: '#2563eb', color: '#fff',
              borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 15
            }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {favorites.map(item => (
              <div key={item.id} style={{
                background: '#fff', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 1px 12px rgba(0,0,0,0.07)', transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex', flexDirection: 'column'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 12px rgba(0,0,0,0.07)'; }}
              >
                {/* Image */}
                <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: 220, background: '#0f1115', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
                    <img src={item.images?.[0]} alt={item.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                </Link>

                {/* Content */}
                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.4 }}>{item.title}</h3>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#2563eb' }}>${item.price}</span>
                    <span style={{ fontSize: 12, color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: 20 }}>
                      ⭐ {item.rating}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <button onClick={() => handleAddToCart(item)} style={{
                      flex: 1, padding: '10px', background: '#2563eb', color: '#fff', border: 'none',
                      borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer'
                    }}>Add to Cart</button>
                    <button onClick={() => { removeFromFavorites(item.id); toast('Removed from wishlist', { icon: '💔' }); }}
                      style={{ width: 40, height: 40, borderRadius: 10, border: '1.5px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" fill="#ef4444" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
