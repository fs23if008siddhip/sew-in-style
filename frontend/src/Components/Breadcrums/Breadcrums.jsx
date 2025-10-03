import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/arrow_icon.png';

const Breadcrums = ({ product }) => {
    if (!product) return null; 
    
  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" /> SHOP
      {product ? (
        <>
          <img src={arrow_icon} alt="" /> {product.name}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Breadcrums;
