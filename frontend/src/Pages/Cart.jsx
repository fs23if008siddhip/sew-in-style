import React from 'react'
import CartItems from '../Components/CartItems/CartItems'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import Orders from '../Components/Orders/Orders';

export const Cart = () => {
  return (
    <div>
      <CartItems/> 
      <Orders/>
      <RelatedProducts/>
     
    </div>
  )
}
export default Cart