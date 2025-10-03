import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className="item-container">
      <div className="item">
        {props.image.map((imgSrc, idx) => (
          <Link to={`/product/${props.id}`} key={idx}>
            <img onClick={window.scrollTo(0,0)}
              src={imgSrc} 
              alt={`${props.name} image ${idx + 1}`} 
            />
          </Link>
        ))}
      </div>

      <p>{props.name}</p>
      <div className="item-description">{props.description}</div>

      <div className="item-prices">
        <div className="price">₹{props.price}</div>
      </div>
    </div>
  );
};

export default Item;
