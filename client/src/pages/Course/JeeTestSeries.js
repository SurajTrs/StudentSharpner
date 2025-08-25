import React, { useState } from "react";
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ Fixed this line

const testSeriesData = {
  advance: [
    {
      title: "JEE Advanced 2025 – Challenger Test Series",
      image: "https://images.unsplash.com/photo-1581093588401-ae6f87f50cbd?q=80&w=2940&auto=format&fit=crop",
      lang: "Hinglish",
      newTag: true,
      price: "₹1,999",
      originalPrice: "₹3,000",
      discount: "Save ₹1,001 – 33% Off",
      link: "#"
    },
    {
      title: "JEE Advanced 2025 – Champion Series (Hindi)",
      image: "https://images.unsplash.com/photo-1531496657543-34d6d3d90d90?q=80&w=2940&auto=format&fit=crop",
      lang: "Hindi",
      newTag: false,
      price: "₹1,799",
      originalPrice: "₹2,999",
      discount: "Special Price for Hindi Medium",
      link: "#"
    }
  ]
};

const JeeAdvanceTestSeries = () => {
  const [activeTab, setActiveTab] = useState("advance");
  const { user } = useAuth();
  const navigate = useNavigate();

  const getCoursesToShow = () => testSeriesData[activeTab] || [];

  const handleBuyNow = (course) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/order-summary", { state: { course } });
  };

  return (
    <div className="jee-page">
      <main className="jee-main">
        <p className="breadcrumb">🏠 Home / JEE Advanced / Test Series</p>
        <h1 className="jee-title">JEE Advanced Test Series 2025 – Final Touch to Perfection</h1>
        <p className="desc">
          Practice like never before with our specially designed JEE Advanced Test Series. Analyze your performance, improve speed & accuracy, and get exam-ready!
        </p>

        <div className="card-row">
          <CategoryCard title="All India Rank" desc="Benchmark Your Performance" color="#f0f9ff" />
          <CategoryCard title="DPPs & Full Tests" desc="Topic-wise + Full Syllabus" color="#e7fbe4" />
          <CategoryCard title="Analysis Report" desc="Detailed Feedback & Solutions" color="#fff0f3" />
          <CategoryCard title="Mentor Support" desc="Ask Experts & Improve" color="#f7f5ff" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Test Series Packages</h2>

        <div className="jee-tabs">
          <button className={activeTab === "advance" ? "active" : ""} onClick={() => setActiveTab("advance")}>
            JEE Advanced
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

export default JeeAdvanceTestSeries;
