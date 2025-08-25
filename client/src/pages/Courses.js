import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const courseData = {
  jee: [
    {
      category: "🧪 JEE (Engineering Entrance)",
      programs: [
        { name: "JEE Foundation (Class 9-10)", path: "/course/jee-foundation" },
        { name: "JEE Main Crash Course", path: "/course/jee-main-crash" },
        { name: "JEE Main + Advanced (1-Year & 2-Year Programs)", path: "/course/jee-main-advanced" },
        { name: "JEE Advanced Test Series", path: "/course/jee-test-series" },
        { name: "JEE Doubt Solving & Revision Batches", path: "/course/jee-doubt-revision" },
      ],
    },
  ],
  neet: [
    { name: "NEET Foundation (Class 9-10)", path: "/course/neet-foundation" },
    { name: "NEET 2025 (1-Year Program)", path: "/course/neet-2025" },
    { name: "NEET 2026 (2-Year Program)", path: "/course/neet-2026" },
    { name: "NEET Crash Course", path: "/course/neet-crash" },
    { name: "NEET Test Series & Rank Booster", path: "/course/neet-test-series" },
  ],
  academic: [
    { name: "Class 1 to 5: Basics in Math, EVS, English, and Science", path: "/course/class-1-5" },
    { name: "Class 6 to 8: Full CBSE/ICSE Syllabus Coverage", path: "/course/class-6-8" },
    { name: "Class 9 & 10: Foundation + Board Exam Focus", path: "/course/class-9-10" },
    { name: "Class 11 & 12: PCM, PCB, Commerce, Arts", path: "/course/class-11-12" },
    { name: "Live Doubt Classes + Recorded Lectures", path: "/course/live-recorded" },
    { name: "Chapter-wise MCQs + Notes + PYQs", path: "/course/mcq-notes-pyq" },
  ],
};

const HoverCarousel = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="hover-carousel-section">
      <h2 className="carousel-heading">🎯 Our Courses</h2>
      <p className="carousel-subtext">
        Explore top-tier programs for JEE, NEET & School Education
      </p>

      <div className="hover-carousel">
        <div className="carousel-left">
          {["jee", "neet", "academic"].map((key) => (
            <div
              className="carousel-tab-wrapper"
              key={key}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`carousel-tab ${hovered === key ? "active" : ""}`}>
                {key === "jee" && "🧪 JEE"}
                {key === "neet" && "🧬 NEET"}
                {key === "academic" && "📚 Academic"}
              </div>

              {hovered === key && (
                <div className={`course-popup ${key === "academic" ? "left" : ""}`}>
                  <ul>
                    {key === "jee" &&
                      courseData.jee[0].programs.map((program, index) => (
                        <li key={index}>
                          <Link to={program.path}>{program.name}</Link>
                        </li>
                      ))}

                    {key !== "jee" &&
                      courseData[key].map((program, index) => (
                        <li key={index}>
                          <Link to={program.path}>{program.name}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoverCarousel;
