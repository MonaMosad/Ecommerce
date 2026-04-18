import React from 'react'
import Product from './Product'




export default function TopSaleProd({ categoryName, items }) {
  return (
    <div className='container mt-5'>  
      <div className='row'>
        <div className='header col-12'> 
          <h3 className='fs-1 text-capitalize'>{categoryName}</h3>
        </div>  

        {items && items.map((product) => (
          <Product item={product} key={product.id} />
            
        ))}
      </div>  
      <br />
    </div>
  )
}