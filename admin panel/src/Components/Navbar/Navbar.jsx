import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import profile_icon from '../../assets/profile.png'
import dropdown_arrow from '../../assets/arrow_icon.png'
const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className="nav-left">
       <img src={logo} alt="" className="nav-logo" />
       <p>Admin Panel</p>
       </div>
       <div className="nav-right">
       <img src={profile_icon}  className='nav-profile' alt="" />
       <img src={dropdown_arrow} className='nav-arrow' alt="" />
       </div>
    </div>
  )
}

export default Navbar