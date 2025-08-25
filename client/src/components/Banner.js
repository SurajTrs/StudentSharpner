// components/Banner.js
import React from 'react';
import '../App.css'; // Ensure you create the appropriate CSS file if needed
 // Ensure you create the appropriate CSS file if needed

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Welcome to Physics Wallah Clone</h1>
        <p>Your gateway to understanding Physics with expert-level courses</p>
        <button className="cta-button">Explore Courses</button>
      </div>
    </section>
  );
};

export default Banner;
