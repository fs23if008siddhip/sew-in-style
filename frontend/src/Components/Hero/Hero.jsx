import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand-icon.png';
import arrow_icon from '../Assets/arrow_icon.png';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>DISCOVER <br /> YOUR <br /> OWN <br /> FASHION</h2>

        <div className="hero-subtext">
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="hand" />
            
            <p>Collections for everyone</p>
          </div>

        
            <div

  className="latest-btn"
  onClick={() => {
    const section = document.getElementById('NewCollections');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }}
  style={{ cursor: 'pointer' }}
>
  <div>
    Latest Collection
    <img src={arrow_icon} alt="arrow" />
  </div>
</div>

      </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="model" />
      </div>
    </div>
  );
};

export default Hero;
