import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
             <div className="descriptionbox-nav-box fade">
                Reviews (98)
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>Sew In Style is a fashion-forward brand that celebrates creativity, elegance, and individuality. Specializing in beautifully designed dresses, we bring together timeless craftsmanship and modern trends. Every piece is styled to perfection and made to empower confidence, whether on the runway or in everyday life. At Sew In Style, fashion is not just worn—it’s flaunted with grace, passion, and personality.</p>
            <p>From sketch to stitch, every creation at Sew In Style tells a story of artistry and detail. Our designs are inspired by the beauty of individuality, blending classic silhouettes with contemporary flair. Whether it’s a statement piece for the runway or a graceful dress for special occasions, we believe fashion should make you feel as extraordinary as you look.</p>
        </div>
    </div>
  )
}

export default DescriptionBox