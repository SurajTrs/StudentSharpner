import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";

const neetTestSeries = [
  {
    title: "NEET 2025 Test Series - Full Course (Hinglish)",
    image: "https://images.unsplash.com/photo-1587222385637-c0583baf5f67?q=80&w=2940&auto=format&fit=crop",
    lang: "Hinglish",
    newTag: true,
    price: "₹1,999",
    originalPrice: "₹3,500",
    discount: "Save ₹1,501 – 43% OFF",
    link: "#"
  },
  {
    title: "NEET 2025 Test Series - Full Course (Hindi)",
    image: "https://images.unsplash.com/photo-1587222385637-c0583baf5f67?q=80&w=2940&auto=format&fit=crop",
    lang: "Hindi",
    newTag: false,
    price: "₹1,799",
    originalPrice: "₹3,000",
    discount: "Save ₹1,201 – 40% OFF",
    link: "#"
  },
  {
    title: "NEET 2025 Test Series - Subject-wise (Hinglish)",
    image: "https://images.unsplash.com/photo-1587222385637-c0583baf5f67?q=80&w=2940&auto=format&fit=crop",
    lang: "Hinglish",
    newTag: false,
    price: "₹999",
    originalPrice: "₹1,500",
    discount: "Save ₹501 – 33% OFF",
    link: "#"
  }
];

const NeetTestSeries = () => {
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
        <p className="breadcrumb">🏠 Home / NEET / Test Series</p>
        <h1 className="jee-title">NEET 2025 Test Series</h1>
        <p className="desc">
          Get ready for NEET 2025 with our comprehensive test series. Designed to simulate the actual NEET exam environment, this series includes full-length tests as well as subject-specific tests to help you gauge your preparation.
        </p>

        <div className="card-row">
          <CategoryCard title="Mock Tests" desc="Prepare with Real NEET Exam Formats" color="#ffe4e1" />
          <CategoryCard title="Performance Analysis" desc="Track Your Progress with Detailed Insights" color="#e4f7e9" />
          <CategoryCard title="Time Management" desc="Test Under Exam-Like Conditions" color="#f6e4fc" />
          <CategoryCard title="Instant Results" desc="Get Your Scores and Solutions Immediately" color="#e4eaff" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>NEET Test Series Batches</h2>

        <div className="jee-cards-container">
          {neetTestSeries.map((course, index) => (
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

export default NeetTestSeries;
