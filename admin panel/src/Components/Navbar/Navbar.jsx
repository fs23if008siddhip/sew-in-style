import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import profile_icon from '../../assets/profile.png'
import dropdown_arrow from '../../assets/arrow_icon.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin-login"); // go to login page
  };

  return (
    <div className='Navbar'>
      <div className="nav-left">
        <img src={logo} alt="" className="nav-logo" />
        <p>Admin Panel</p>
      </div>
      <div className="nav-right">
        <img 
          src={profile_icon}  
          className='nav-profile' 
          alt="profile" 
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
        />
        <img src={dropdown_arrow} className='nav-arrow' alt="arrow" />
      </div>
    </div>
  )
}

export default Navbar
