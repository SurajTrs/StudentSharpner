import React from 'react';
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import '../App.css';
import heroLogo from '../assets/hero.jpg'; // update path according to your structure


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
        <div className="footer-brand">
  <img src={heroLogo} alt="Logo" className="footer-logo" />
  <p>Empowering Every Student to Learn Better</p>
</div>

          <p>Empowering Every Student to Learn Better</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/batches">Batches</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Help</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Physics Wallah Clone. All rights reserved.</p>
        <ul>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
