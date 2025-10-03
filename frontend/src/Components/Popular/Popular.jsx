import React, { useEffect, useState } from 'react'
import './Popular.css'

import Item from '../Item/Item'
const Popular = () => {

  const [popularProducts,setPopularProducts] = useState([]);

   useEffect(() => {
  fetch('http://localhost:5000/popular')
    .then((response) => response.json()) 
    .then((data) => {
      console.log("Fetched data:", data); 
      setPopularProducts(data);
    })
    .catch((error) => console.error("Error fetching popular products:", error));
}, []);


  return (
    <div className='popular'>
        <h1>POPULAR</h1>
        <hr/>
        <div className="popular-item">
           {popularProducts.map((item, i) => (
 <Item
  key={i}
  id={item.id}
  name={item.name}
  description={item.description}
  image={Array.isArray(item.image) ? item.image : [item.image]} 
  price={item.price}
  category={item.category}
  sizes={item.sizes}
/>
))}

        </div>
    </div>
  )
}

export default Popular