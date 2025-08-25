import React from "react";
import "../App.css";

const stats = [
  { number: "15Million+", label: "Happy Students", bg: "#feeedf" },
  { number: "24000+", label: "Mock Tests", bg: "#ffeeee" },
  { number: "14000+", label: "Video Lectures", bg: "#e9f7fc" },
  { number: "80000+", label: "Practice Papers", bg: "#f2edfc" },
];

const TrustedByStudents = () => {
  return (
    <div className="trusted-section">
      <h2>A Platform Trusted by Students</h2>
      <p className="subtitle">
        STUDENT SHARPNER is dedicated to empowering JEE MAINS, JEE ADVANCE, NEET, and CBSE aspirants with results backed by numbers!
      </p>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div
            className="stat-card"
            key={index}
            style={{ backgroundColor: item.bg }}
          >
            <h3>{item.number}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <button className="get-started">Get Started</button>
    </div>
  );
};

export default TrustedByStudents;
