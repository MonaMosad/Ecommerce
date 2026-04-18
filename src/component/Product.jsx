import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../component/CartContext.jsx";
import { toast } from 'react-hot-toast';

export default function Product({ item }) {
  const { addToCart, setCartOpen, addToFavorites, removeFromFavorites, favorites } = useContext(CartContext);
  const isFav = favorites.some(f => f.id === item.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(item);
    setCartOpen(true);
    toast.success(`Added to cart!`);
  };

  const toggleFav = (e) => {
    e.preventDefault();
    if (isFav) {
      removeFromFavorites(item.id);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      addToFavorites(item);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 g-4">
      <div style={{
        borderRadius: 16, overflow: 'hidden', background: '#fff',
        boxShadow: '0 1px 8px rgba(0,0,0,0.07)', transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex', flexDirection: 'column', height: '100%'
      }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 1px 8px rgba(0,0,0,0.07)'; }}
      >
        <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Image */}
          <div style={{ height: 240, background: 'linear-gradient(180deg, #0f1115, #1c1f26)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
            {item.rating > 4.8 && (
              <span style={{ position: 'absolute', top: 12, left: 12, background: '#008b8b', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>NEW</span>
            )}
            {/* Favorite button */}
            <button onClick={toggleFav} style={{
              position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.15)'}
            >
              <svg width="16" height="16" fill={isFav ? '#ef4444' : 'none'} stroke={isFav ? '#ef4444' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
            <img src={item.images?.[0]} alt={item.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
          </div>

          {/* Body */}
          <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 8 }}>
              <h5 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, flex: 1 }}>{item.title}</h5>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#2563eb', flexShrink: 0 }}>${item.price}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#f59e0b' }}>{'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5-Math.round(item.rating))}</span>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>({item.rating})</span>
            </div>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
          </div>
        </Link>

        <div style={{ padding: '0 18px 18px' }}>
          <button onClick={handleAddToCart} style={{
            width: '100%', padding: '10px', background: '#2563eb', color: '#fff', border: 'none',
            borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'background 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background='#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.background='#2563eb'}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
