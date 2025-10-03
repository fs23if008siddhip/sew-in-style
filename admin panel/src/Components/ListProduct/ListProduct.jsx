import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import cross_icon from '../../assets/bin_icon.png'

const ListProduct = () => {

  const [allproducts,setAllproducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch("http://localhost:5000/allproducts")
    .then((res)=>res.json())
    .then((data)=>{setAllproducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

 const removeProduct = async (id) => {
  const res = await fetch('http://localhost:5000/removeproduct', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  });

  await fetchInfo();
}


  return (
    <div className='listproduct'>
     <h1>All Products List</h1>
     <div className="listproduct-format-main">
      <p>Products</p>
      <p>Title</p>
      <p>Price</p>
      <p>Sizes/Stocks</p>
      <p>Description</p>
      <p>Remove</p>
      
     </div>
     <div className="listproduct-allproducts">
      <hr />
   {allproducts.map((product,index)=>{
    return <>
    <div key={index} className="listproduct-format">
      <img src={product.image} alt="" className="listproduct-product-icon" />
      <p>{product.name}</p>
      <p>₹{product.price}</p>
      <div className="listproduct-sizes">
    {product.sizes.map((s, i) => (
      <span key={i}>
        {s.size}: {s.stock}
      </span>
    ))}
  </div>

  {/* Description Column */}
  <p className="listproduct-description">
    {product.description}
  </p>
  
      <img onClick={()=>{removeProduct(product.id)}}className='listproduct-remove-icon' src={cross_icon} alt="" />
    <hr />
      </div>
    </>
   })}
     </div>
    </div>
  )
}

export default ListProduct