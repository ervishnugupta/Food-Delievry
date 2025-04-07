import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Delicious food, delivered fast! We bring your favorite meals from top restaurants straight to your doorstep with just a few clicks. Enjoy fresh flavors, great deals, and seamless ordering anytime, anywhere. Stay connected and satisfy your cravings with us!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delievry</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-7023585478</li>
                <li>tomato@gmail.com</li>
            </ul>
        </div>
      </div>

      <hr />
      <p className='footer-copyright'>© 2025 Tomato.com - All rights reserved.</p>
    </div>
  )
}

export default Footer
