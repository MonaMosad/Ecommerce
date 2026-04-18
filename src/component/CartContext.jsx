import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favoritesItems")) || []; } catch { return []; }
  });

  const addToFavorites = (item) => {
    setFavorites(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  // --- Cart ---
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cartItems")) || []; } catch { return []; }
  });

  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decreaseQuantity = (id) => {
    setCartItems(prev => prev.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- Search ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const performSearch = async (query) => {
    if (!query.trim()) { setSearchResults([]); return; }
    setSearchLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=12`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (e) {
      console.error("Search error", e);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart,
      cartTotal, cartCount, cartOpen, setCartOpen,
      favorites, addToFavorites, removeFromFavorites,
      searchQuery, setSearchQuery, searchResults, setSearchResults, searchLoading, performSearch,
    }}>
      {children}
    </CartContext.Provider>
  );
}
