import React, { useEffect, useState } from 'react';
import './NewCollections.css';

import Item from '../Item/Item'; 

const NewCollections = () => {

  const [new_collections,setNew_Collections] = useState([]); 
  useEffect(()=>{
  fetch('https://sew-in-style-2.onrender.com/newcollections')
  .then((response)=>response.json())
  .then((data)=>setNew_Collections(data))
  },[])
  return (
    <div className="new-collections">
      <section id='NewCollections'>
      <h1>NEW COLLECTIONS</h1>
      </section>
      <hr/>
      <div className="collections">
        {Array.isArray(new_collections) && new_collections.map((item, i) => (
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
  );
};

export default NewCollections;
