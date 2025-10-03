import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import emptystar_icon from '../Assets/emptystar_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setSelectedSize(null);
  }, [product]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product.id);
  };

 
  const sizes = product.sizes?.length
    ? product.sizes.map((s) => s.size)
    : ['S', 'M', 'L', 'XL', 'XXL']; 

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={emptystar_icon} alt="" />
          <p>(98)</p>
        </div>

        <div className="productdisplay-right-ptices">
          <div className="productdisplay-price">₹{product.price}</div>

          <div className="productdisplay-right-description">
            {product.description}
          </div>

          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              {sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    border: selectedSize === size ? '2px solid #000' : '1px solid #ccc',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: selectedSize === size ? '#dbeafe' : 'white',
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart}>ADD TO CART</button>

          <p className="productdisplay-right-category">
            <span>Category :</span> Gowns, Casual wear, Party wear
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span> Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
