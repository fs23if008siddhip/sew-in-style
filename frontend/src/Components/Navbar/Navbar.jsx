import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/dropdown_icon.png'
export const Navbar = () => {

    const[menu,setMenu]= useState("home")
    const{getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
menuRef.current.classList.toggle('nav-menu-visible');
e.target.classList.toggle('open');

    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt=""/>

        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link> {menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/shop'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("blog")}}><Link style={{textDecoration: 'none'}} to='/blog'>Blog</Link> {menu==="blog"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("about us")}}><Link style={{textDecoration: 'none'}} to='/aboutUs'>About Us</Link>{menu==="about us"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("contact us")}}><Link style={{textDecoration: 'none'}} to='/contactUs'>Contact Us</Link> {menu==="contact us"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to='/login'><button>Login</button></Link>}
           
            <Link to='/cart'><img src={cart_icon} alt=""/></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </div>
  )
}
