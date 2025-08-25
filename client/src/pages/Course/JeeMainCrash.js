import React, { useState } from "react";
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an Auth context

const crashCourseData = {
  crash: [
    {
      title: "Crash Course JEE 2025 - Warrior Blitz",
      image: "https://images.unsplash.com/photo-1581091012184-5c8d9e2bcd5c?q=80&w=2940&auto=format&fit=crop",
      lang: "English",
      newTag: true,
      price: "₹3,999",
      originalPrice: "₹6,000",
      discount: "Flat 33% OFF – Limited Time!",
      link: "#"
    },
    {
      title: "Crash Course JEE 2025 (Hindi) - Sankalp",
      image: "https://images.unsplash.com/photo-1603792903356-9cc4e3b9f5ba?q=80&w=2940&auto=format&fit=crop",
      lang: "Hindi",
      newTag: false,
      price: "₹3,499",
      originalPrice: "₹5,000",
      discount: "Limited Time Offer – Save ₹1,500",
      link: "#"
    }
  ]
};

const JeeCrashCourse = () => {
  const [activeTab, setActiveTab] = useState("crash");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const getCoursesToShow = () => {
    return crashCourseData[activeTab] || [];
  };

  const handleBuyNow = (course) => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }
    navigate("/order-summary", { state: { course } }); // Pass course to order summary
  };

  return (
    <div className="jee-page">
      <main className="jee-main">
        <p className="breadcrumb">🏠 Home / Crash Course</p>
        <h1 className="jee-title">Crash Course for JEE 2025 – Final Sprint for Success</h1>
        <p className="desc">
          Revise and boost your performance with our JEE 2025 crash course. High-impact sessions, quick revision notes, and full-length mock tests.
        </p>

        <div className="card-row">
          <CategoryCard title="Quick Revision" desc="Fast-track Concept Mastery" color="#fff3d8" />
          <CategoryCard title="Mock Tests" desc="Real-time JEE Practice" color="#e8f0ff" />
          <CategoryCard title="Doubt Solving" desc="Instant Doubt Clearing" color="#fce3e3" />
          <CategoryCard title="Expert Faculties" desc="Top Mentors for Final Prep" color="#e0ffe7" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Crash Course Batches</h2>

        <div className="jee-tabs">
          <button className={activeTab === "crash" ? "active" : ""} onClick={() => setActiveTab("crash")}>
            Crash Courses
          </button>
        </div>

        <div className="jee-cards-container">
          {getCoursesToShow().map((course, index) => (
            <div className="jee-card" key={index}>
              <img src={course.image} alt={course.title} className="jee-banner" />
              <div className="jee-card-body">
                <h3>{course.title}</h3>
                <div className="jee-tags">
                  {course.newTag && <span className="jee-badge new">NEW</span>}
                  <span className="jee-badge lang">{course.lang}</span>
                </div>
                <p className="jee-price">
                  {course.price}
                  {course.originalPrice && (
                    <span className="jee-original-price">{course.originalPrice}</span>
                  )}
                </p>
                <p className="jee-discount">{course.discount}</p>
                <div className="jee-btns">
                  <button className="jee-explore">Explore</button>
                  <button
                    className="jee-buy"
                    onClick={() => handleBuyNow(course)} // Pass the course to handleBuyNow
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JeeCrashCourse;
