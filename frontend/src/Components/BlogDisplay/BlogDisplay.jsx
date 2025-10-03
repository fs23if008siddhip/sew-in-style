import React from 'react'
import './BlogDisplay.css'
import blog_icon from '../Assets/blog_icon.png'
import model_image from '../Assets/model_image.png'
import blog_image from '../Assets/blog_image.png'
import blog_model from '../Assets/blog_model.png'
const BlogDisplay = () => {
  return (
    <div className='blogdisplay'>
        <h1>Latest Blogs</h1>
        <hr />
        <div className="blogdisplay-info">
            <img src={blog_icon} alt="" />
            <p>This stunning piece was designed and sewn by Vishaka, showcasing her talent and craftsmanship. The dress, made entirely from intricately sewn circular patterns, made its way onto the runway, highlighting both creativity and innovation in design. Vishaka’s work reflects a unique blend of artistry and bold fashion choices, earning its place in the spotlight at the show.</p>
        </div>
        
        <div className="blogdisplay-model">
            <img src={model_image} alt="" />
            <p>This elegant golden ensemble, designed by Vishaka, reflects her mastery in fabric manipulation and structured silhouettes. The strapless dress, with its detailed texture work and flowing drape, captivated the runway with a balance of strength and grace. Vishaka’s creation stands out as a bold yet refined piece, securing its place as a highlight of the show.</p>
        </div>
        
        <div className="blogdisplay-icon">
            <img src={blog_image} alt="" />
            <p>This striking creation by Vishaka blends contemporary elegance with artisanal detailing. The fitted ivory base of the dress is elevated with intricate brown appliqué work across the bodice, adding depth and visual texture. The dramatic fringed detailing at the hem brings dynamic movement to the runway, giving the look both sophistication and flair. Vishaka’s design demonstrates her ability to merge structure with fluidity, making it an unforgettable piece from her collection.</p>
        </div>

        <div className="blogdisplay-work">
            <img src={blog_model} alt="" />
            <p>This design by Vishaka exudes a balance of raw craftsmanship and modern style. The structured crop top, featuring circular handcrafted details, pairs effortlessly with the asymmetrical textured skirt layered over flowing golden fabric. The mix of earthy tones with vibrant yellow creates a striking contrast, while the intricate handwork gives the piece an artisanal depth. Vishaka’s ensemble reflects her vision of fusing tradition with contemporary silhouettes, making it a standout moment on the runway.</p>
        </div>
    </div>
  )
}

export default BlogDisplay