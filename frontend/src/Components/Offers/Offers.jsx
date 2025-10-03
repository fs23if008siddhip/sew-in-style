import React from 'react'
import './Offers.css'
import offer_image from '../Assets/offer_image.png'
import { useNavigate } from 'react-router-dom'
const Offers = () => {
  const navigate = useNavigate();

  return (
<div className='offers'>
<div className="offers-left">
<h1>Exclusive</h1>
<h1>Offers for you</h1>
<p>ONLY ON BEST SELLERS PRODUCT</p>
 
<button onClick={() => navigate('/shop')}
            style={{ cursor: 'pointer' }}>Check Now</button>

</div>
<div className="offers-right">
<img src={offer_image} alt="" />
</div>
    </div>
  )
}

export default Offers