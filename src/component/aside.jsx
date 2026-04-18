import React, { useState } from 'react';


export default function aside({ activeCategory, onCategoryChange }) {


  const categories = ["smartphones","home-decoration","kitchen-accessories","beauty","sunglasses","tops","laptops","tablets",];

  const customStyles = {
    aside: {
      width: '300px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa', 
      padding: '2.5rem'
    },
    checkbox: {
      width: '1.25rem',
      height: '1.25rem',
      marginTop: '0.15rem',
      cursor: 'pointer',
      borderColor: '#cfd4da' 
    },
    label: (isActive) => ({
      fontSize: '1.1rem',
      color: isActive ? '#0d6efd' : '#343a40',
      cursor: 'pointer',
      fontWeight: isActive ? 'bold' : 'normal'
    })
   };
  return (
      <aside style={customStyles.aside} className="border-end">
      <div className="mb-5">
        <h2 className="h4 fw-bold mb-4">Categories</h2>
        <div className="d-flex flex-column gap-3">
          {categories.map((category) => (
            <div key={category} className="form-check d-flex align-items-center p-0">
              <input className="form-check-input ms-0 me-3" type="radio" name="category" id={`check-${category}`} style={customStyles.checkbox} onClick={() => onCategoryChange(category)}/>
                  <label className="text-capitalize" style={customStyles.label(activeCategory === category)}>{category.replace('-', ' ')}</label>            </div>
          ))}
        </div>
      </div>

      

      <style>{`
        .form-range::-webkit-slider-thumb { background-color: #0d6efd; }
        .form-range::-moz-range-thumb { background-color: #0d6efd; }
        .form-range::-ms-thumb { background-color: #0d6efd; }
      `}</style>
    </aside>
  )
}

