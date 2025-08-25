import React from "react";
import "../App.css";

const courses = [
  {
    category: "🧪 JEE (Engineering Entrance)",
    programs: [
      "JEE Foundation (Class 9-10)",
      "JEE Main Crash Course",
      "JEE Main + Advanced (1-Year & 2-Year Programs)",
      "JEE Advanced Test Series",
      "JEE Doubt Solving & Revision Batches",
    ],
  },
  {
    category: "🧬 NEET (Medical Entrance)",
    programs: [
      "NEET Foundation (Class 9-10)",
      "NEET 2025 (1-Year Program)",
      "NEET 2026 (2-Year Program)",
      "NEET Crash Course",
      "NEET Test Series & Rank Booster",
    ],
  },
  {
    category: "📚 Class 1st to 12th (School Learning)",
    programs: [
      "Class 1 to 5: Basics in Math, EVS, English, and Science",
      "Class 6 to 8: Full CBSE/ICSE Syllabus Coverage",
      "Class 9 & 10: Foundation + Board Exam Focus",
      "Class 11 & 12: PCM, PCB, Commerce, Arts",
      "Live Doubt Classes + Recorded Lectures",
      "Chapter-wise MCQs + Notes + PYQs",
    ],
  },
];

const CourseSection = () => {
  return (
    <section className="course-section">
      <h2 className="section-title">🎯 Our Courses</h2>
      <div className="course-category-grid">
        {courses.map((cat, index) => (
          <div className="course-category-card" key={index}>
            <h3 className="course-category-title">{cat.category}</h3>
            <ul className="course-list">
              {cat.programs.map((program, i) => (
                <li key={i} className="course-item">{program}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
