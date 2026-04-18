import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CartContext } from '../component/CartContext.jsx';
import Product from '../component/Product';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const doSearch = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=30`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    doSearch();
  }, [query]);

  return (
    <div style={{ minHeight: '70vh', background: '#f8fafc', padding: '48px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', margin: 0 }}>
            Search results for <span style={{ color: '#2563eb' }}>"{query}"</span>
          </h1>
          {!loading && <p style={{ color: '#6b7280', marginTop: 8, fontSize: 16 }}>{products.length} products found</p>}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af', fontSize: 16 }}>Searching…</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
            <h2 style={{ color: '#374151', fontWeight: 700, fontSize: 22 }}>No results found</h2>
            <p style={{ color: '#9ca3af' }}>Try a different search term.</p>
          </div>
        ) : (
          <div className="row">
            {products.map(p => <Product key={p.id} item={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
