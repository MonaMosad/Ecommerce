import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './Home';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Favorites from './Favorites';
import Checkout from './Checkout';
import SearchResults from '../component/SearchResults.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartProvider from "../component/CartContext.jsx";

const routes = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,  
    children: [
      { path: '/', element: <Home /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/Products', element: <Products /> },
      { path: '/favorites', element: <Favorites /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/search', element: <SearchResults /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  </React.StrictMode>
);
