// import React from 'react'
// import Aside from '../component/aside';
// import { useState, useEffect } from 'react';
// import Product from '../component/Product';
// import TopSaleProd from '../component/TopSaleProd';

// export default function product() {

//    const [products, setProducts] = useState([]);

//   // const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//     const currentCategory = categories[currentPage - 1];
//    const categories=[
//       "smartphones",
//        "home-decoration",
//        "kitchen-accessories",
//       "beauty",
//        "sunglasses",
//        "tops",
//        "laptops",
//         "tablets",
         
// ]

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const results = await Promise.all(
//           categories.map(async (category) => {
//             const res = await fetch(
//               `https://dummyjson.com/products/category/${category}`
//             );
//             const data = await res.json();
//             return { [category]: data.products };
//           })
//         );

//         const productsData = Object.assign({}, ...results);
//         setProducts(productsData);
//       } catch (error) {
//         console.error("Erorr Fetching", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);
  
//   return (
//     <div className='d-flex'>
//     <div className='col-md-3'>
//        <Aside />
//     </div>
//       <div className="container mt-">
//         <div className="header mb-5">
//           <h3 className="fs-1 fw-bold">All Product</h3>
//           <p className="text-secondary">Discover the best products at the best prices</p>
//         </div>
        
//        <div className="container my-5">
//           <div className="row">
//             {categories.map((category) => (  
//              <TopSaleProd key={category} categoryName={category} items={products[category] || []} />
//                  ))}
//           </div>
//          </div>
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import Aside from '../component/aside';
import Product from '../component/Product';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // currentPage 1 maps to categories[0], currentPage 2 to categories[1], etc.
  const [currentPage, setCurrentPage] = useState(1);
const [selectedCategory, setSelectedCategory] = useState("smartphones");
  const categories = [
    "smartphones", "home-decoration", "kitchen-accessories", 
    "beauty", "sunglasses", "tops", "laptops", "tablets"
  ];


  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory]); // Re-fetch whenever the category (page) changes

  return (
    <div className='d-flex'>
      <div className='col-md-3'>
        <Aside activeCategory={selectedCategory} onCategoryChange={setSelectedCategory}/>
      </div>
      <div className="container mt-5">
        <div className="header mb-5">
          {/* Display the current category name as the title */}
          <h3 className="fs-1 fw-bold text-capitalize">{selectedCategory.replace('-', ' ')}</h3>
          <p className="text-secondary">Viewing all products in this category</p>
        </div>

        {loading ? (
          <div className="text-center mt-5"><p>Loading products...</p></div>
        ) : (
          <>
            <div className="row">
              {products.map((product) => (
                <Product key={product.id} item={product} />
              ))}
            </div>

           
          </>
        )}
      </div>
    </div>
  );
}