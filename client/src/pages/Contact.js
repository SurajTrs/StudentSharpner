import React from 'react';
import '../App.css'; // Create this file

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We’d love to hear from you. Reach out with any questions or feedback!</p>

      <div className="contact-content">
        {/* Form Section */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="form-field" required />
          <input type="email" placeholder="Your Email" className="form-field" required />
          <textarea placeholder="Your Message" className="form-field message-box" rows="5" required></textarea>
          <button type="submit" className="contact-btn">Send Message</button>
        </form>

        {/* Info Section */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Email:</strong> support@studentsharpner.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123 Edu Street, Knowledge City, India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
