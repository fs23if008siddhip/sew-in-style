import React from 'react'
import './Footer.css'
import footer from '../Assets/footer.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer} alt="" />

        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
           
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <a href='https://www.instagram.com/viz.in_/' target='_blank' rel='noopener noreferrer'>
                <img src={instagram_icon} alt="instgarm" />
                </a>
            </div>
             <a href='https://wa.me/9653388303' target='_blank' rel='noopener noreferrer'>
             <div className="footer-icon-container">
                <img src={whatsapp_icon} alt="whatsapp" />
               
            </div>
             </a>
             <div className="footer-icon-container">
                <img src={pinterest_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025- All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer