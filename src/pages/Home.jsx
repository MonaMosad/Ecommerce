import React from 'react'
import HeroSection from '../component/HeroSection'
import TopSaleProd from '../component/TopSaleProd'
import Footer from '../component/Footer'
import Product from '../component/Product'
import { useState, useEffect } from 'react';

export default function Home() {

   const [products, setProducts] = useState({});

  const [loading, setLoading] = useState(true);
  const categories=[
      "smartphones",
       "home-decoration",
       "kitchen-accessories",
      "beauty",
       "sunglasses",
       "tops",
       "laptops",
        "tablets",
         
]



useEffect(() => {
  const fetchProducts = async () => {
    try {
      const results = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await res.json();
          return data.products.filter(product => product.rating >= 4.5);
        })
      );

      const flattenedProducts = results.flat();
      setProducts(flattenedProducts);
      
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
  console.log(products);


 


return (
  <div>
    <HeroSection />
    
    {loading ? (
      <div className="text-center mt-5"><p>Loading top products...</p></div>
    ) : (
      <div className="container mt-5">
        <div className="header mb-5">
          <h3 className="fs-1 fw-bold">Top Sales Product</h3>
          <p className="text-secondary">Discover the best products at the best prices</p>
        </div>
        
       <div className="container my-5">
          <div className="row">
            {products.slice(0,6).map((product) => (
               <Product key={product.id} item={product} />
                 ))}
          </div>
         </div>
      </div>
    )}
  </div>
);
  
}
  