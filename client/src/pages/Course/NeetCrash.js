import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ Ensure this path is correct
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";

const neetCrashCourses = [
  {
    title: "NEET 2025 – Crash Course (Hinglish)",
    image: "https://images.unsplash.com/photo-1599457775033-68f7b6802d7e?q=80&w=2940&auto=format&fit=crop",
    lang: "Hinglish",
    newTag: true,
    price: "₹4,999",
    originalPrice: "₹8,000",
    discount: "Save ₹3,001 – 37% OFF",
    link: "#"
  },
  {
    title: "NEET 2025 – Crash Course (Hindi)",
    image: "https://images.unsplash.com/photo-1599457775033-68f7b6802d7e?q=80&w=2940&auto=format&fit=crop",
    lang: "Hindi",
    newTag: false,
    price: "₹4,499",
    originalPrice: "₹7,500",
    discount: "Save ₹3,001 – Limited Time",
    link: "#"
  }
];

const NeetCrashCourse = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuyNow = (course) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/order-summary", { state: { course } });
    }
  };

  return (
    <div className="jee-page">
      <main className="jee-main">
        <p className="breadcrumb">🏠 Home / NEET / Crash Course</p>
        <h1 className="jee-title">NEET 2025 – Crash Course</h1>
        <p className="desc">
          Prepare for NEET 2025 with our intensive 1-month crash course. Targeted at revising key concepts of Physics, Chemistry, and Biology, with regular practice and mock tests to boost your score.
        </p>

        <div className="card-row">
          <CategoryCard title="NEET Exam Pattern" desc="Crash Course with Focused Revision" color="#ffe4e1" />
          <CategoryCard title="Live Doubt Sessions" desc="Clear All Your Doubts" color="#e4f7e9" />
          <CategoryCard title="Mock Tests" desc="Practice Under Real Exam Conditions" color="#f6e4fc" />
          <CategoryCard title="Time Management Tips" desc="Maximize Your Exam Performance" color="#e4eaff" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>NEET Crash Course Batches</h2>

        <div className="jee-cards-container">
          {neetCrashCourses.map((course, index) => (
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
                  <button className="jee-buy" onClick={() => handleBuyNow(course)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NeetCrashCourse;
