import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext.jsx';

export default function Header() {
  const { cartCount, setCartOpen, favorites, searchQuery, setSearchQuery, searchResults, searchLoading, performSearch, setSearchResults } = useContext(CartContext);
  const [inputVal, setInputVal] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (inputVal.trim()) {
        performSearch(inputVal);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
        setSearchResults([]);
      }
    }, 350);
    return () => clearTimeout(delay);
  }, [inputVal]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (id) => {
    setShowDropdown(false);
    setInputVal('');
    navigate(`/products/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputVal)}`);
      setShowDropdown(false);
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff', borderBottom: '1px solid #f0f0f0', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 72, gap: 24, justifyContent: 'space-between' }}>

        {/* Logo */}
        <NavLink to="/" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 26, color: '#111', textDecoration: 'none', letterSpacing: '-0.5px', flexShrink: 0 }}>
          Shop<span style={{ color: '#2563eb' }}>ix</span>
        </NavLink>

        {/* Nav Links — hidden on mobile */}
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="shopix-nav">
          {[['/', 'Home'], ['/Products', 'Products'], ['/favorites', 'Favorites'], ['/checkout', 'Checkout']].map(([path, label]) => (
            <NavLink key={path} to={path}
              style={({ isActive }) => ({
                padding: '6px 14px', borderRadius: 8, fontWeight: 500, fontSize: 15,
                color: isActive ? '#2563eb' : '#444', textDecoration: 'none',
                background: isActive ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s'
              })}
            >{label}</NavLink>
          ))}
        </nav>

        {/* Right: Search + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Search */}
          <div ref={searchRef} style={{ position: 'relative' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: '#f5f7fa', borderRadius: 50, overflow: 'visible', border: '1.5px solid #e8eaf0', transition: 'border 0.2s' }}>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onFocus={() => inputVal && setShowDropdown(true)}
                placeholder="Search products…"
                style={{ background: 'transparent', border: 'none', outline: 'none', padding: '9px 16px', fontSize: 14, width: 200, color: '#222' }}
              />
              <button type="submit" style={{ background: '#2563eb', border: 'none', borderRadius: 50, width: 36, height: 36, margin: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
              </button>
            </form>

            {/* Search Dropdown */}
            {showDropdown && (
              <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.14)', zIndex: 9999, maxHeight: 380, overflowY: 'auto', border: '1px solid #f0f0f0' }}>
                {searchLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: 14 }}>Searching…</div>
                ) : searchResults.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: 14 }}>No results found</div>
                ) : searchResults.map(p => (
                  <div key={p.id} onClick={() => handleSelect(p.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f5f5f5', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f5f8ff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={p.images[0]} alt={p.title} style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 8, background: '#f8f8f8' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: '#2563eb', fontWeight: 700 }}>${p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorites Icon */}
          <NavLink to="/favorites" style={{ position: 'relative', color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            {favorites.length > 0 && (
              <span style={{ position: 'absolute', top: -7, right: -7, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{favorites.length}</span>
            )}
          </NavLink>

          {/* Cart Icon */}
          <button onClick={() => setCartOpen(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#444', display: 'flex', alignItems: 'center', padding: 4 }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -7, right: -7, background: '#2563eb', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap');
        @media (max-width: 768px) {
          .shopix-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
