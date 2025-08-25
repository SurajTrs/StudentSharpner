// pages/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About STUDENT SHARPNER</h1>
        <p>Empowering students through accessible, engaging, and high-quality education.</p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At STUDENT SHARPNER, we believe in shaping futures through focused learning.
          Our goal is to make top-tier education accessible to every student—whether
          preparing for competitive exams like JEE & NEET or mastering school subjects from Class 1 to 12.
        </p>
      </section>

      <section className="about-history">
        <h2>Our Journey</h2>
        <ul className="timeline">
          <li>
            <span className="year">2022</span>
            <p>Founded with a passion to deliver education beyond barriers.</p>
          </li>
          <li>
            <span className="year">2023</span>
            <p>Launched our first online courses for JEE & NEET aspirants with great success.</p>
          </li>
          <li>
            <span className="year">2024</span>
            <p>Reached over 50,000 learners and expanded into Class 1–12 academic content.</p>
          </li>
        </ul>
      </section>

      <section className="about-testimonials">
        <h2>What Our Students Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"The lectures are super helpful, and the doubt-solving is amazing!"</p>
            <h4>- Riya, Class 11</h4>
          </div>
          <div className="testimonial-card">
            <p>"STUDENT SHARPNER helped me crack NEET with confidence. Highly recommend it!"</p>
            <h4>- Aman, NEET 2024</h4>
          </div>
          <div className="testimonial-card">
            <p>"The content is structured, easy to follow, and the mock tests boosted my prep."</p>
            <h4>- Priya, Class 10</h4>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Explore our <Link to="/courses">courses</Link> and see how STUDENT SHARPNER can help you succeed.
        </p>
        <Link to="/login">
          <button className="about-btn">Join Now</button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
