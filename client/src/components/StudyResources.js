import React from "react";
import "../App.css";

const resources = [
  {
    title: "Smart Notes",
    description:
      "Master every concept with STUDENT SHARPNER’s crisp and comprehensive notes, designed to simplify even the toughest topics.",
    bg: "#eaf6ff",
    image: "https://sales.toppersnotes.com/wp-content/uploads/2021/02/IITJEEENGWBPP.webp", // Replace with actual illustration
  },
  {
    title: "Top-Tier Reference Books",
    description:
      "Access curated reference books selected by subject experts, crafted to deepen understanding and boost exam readiness.",
    bg: "#fff4dd",
    image: "https://crm.clcsikar.com/modules/publishx/uploads/posts/83/best-reference-book-for-neet.jpg",
  },
  {
    title: "NCERT Solutions",
    description:
      "Step-by-step NCERT Solutions by STUDENT SHARPNER to build strong foundations and ensure academic excellence.",
    bg: "#e9fdf5",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240412165120/NCERT-Solutions-CLASS-12.webp",
  },
];

const StudyResources = () => {
  return (
    <section className="study-resources">
      <h2>STUDENT SHARPNER Study Resources</h2>
      <p className="subtitle">
        Premium academic tools curated to empower every student’s learning journey.
      </p>

      <div className="resource-grid">
        {resources.map((item, index) => (
          <div
            className="resource-card"
            key={index}
            style={{ backgroundColor: item.bg }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyResources;
