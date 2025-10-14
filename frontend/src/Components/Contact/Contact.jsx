import React from 'react'
import './Contact.css'
import phone_icon from '../Assets/telephone_icon.png'
import mail_icon from '../Assets/mail_icon.png'
import contact_banner from '../Assets/contact-hero.jpeg'
import locationIcon from '../Assets/location_icon.jpeg'


const ContactUs = () => {
  return (
    <div className="contact-wrapper">
    
      <div className="contact-left">
        <img src={contact_banner} alt="Contact Us" className="contact-image" />
      </div>

      <div className="contact-right">
        <h1>Contact Us</h1>
        <p>
           We’re always here to help you with
          orders, shipping, or style questions. Reach us anytime using the
          details below 💌
        </p>

        
        <div className="contact-details">
          <div className="detail-item">
            <img src={locationIcon} alt="Location" />
            <span>123 Fashion Street, Mumbai, India</span>
          </div>

          <div className="detail-item">
        <a href='tel:+919833202733'>
            <img src={phone_icon} alt="Phone" />
            <span>+91 9833202733</span>
            </a>
          </div>

          <div className="detail-item">
             <a href="mailto:sewstyle30@gamil.com">
            <img src={mail_icon} alt="Email" />
            <span>mailto:sewstyle30@gmail.com</span>
            </a>
          </div>

          <div className="detail-item">
           <p>Support Hours:</p>
            <span>Mon - Fri, 9:00 AM - 6:00 PM (IST)</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContactUs;