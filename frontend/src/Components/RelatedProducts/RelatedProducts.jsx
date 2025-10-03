import React from 'react'
import './RelatedProducts.css'
import {data_product} from '../Assets/data'
import Item from '../Item/Item'
const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
               {data_product.map((item, i) => (
  <Item
    key={i}
    id={item.id}
    name={item.name}
    description={item.description}
    image={item.image}
    price={item.price}
    category={item.category}
    sizes={item.sizes}


  />
))}
        </div>
    </div>
  )
}

export default RelatedProducts