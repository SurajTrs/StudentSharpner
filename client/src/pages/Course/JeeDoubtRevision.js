import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";

const doubtRevisionData = {
  revision: [
    {
      title: "Final Revision Booster – JEE 2025",
      image: "https://images.unsplash.com/photo-1614642264763-e60ce5d8b391?q=80&w=2940&auto=format&fit=crop",
      lang: "Hinglish",
      newTag: true,
      price: "₹999",
      originalPrice: "₹1,499",
      discount: "Super Saver – 33% Off",
      link: "#"
    },
    {
      title: "Master Doubts – 1-on-1 Live Sessions",
      image: "https://images.unsplash.com/photo-1600185365673-3a2ac2b9b4c0?q=80&w=2940&auto=format&fit=crop",
      lang: "Hindi",
      newTag: false,
      price: "₹1,499",
      originalPrice: "₹2,499",
      discount: "Personalized Doubt Solving",
      link: "#"
    },
    {
      title: "Quick Revision Capsules – JEE 2025",
      image: "https://images.unsplash.com/photo-1616587894285-5256b13f84ed?q=80&w=2940&auto=format&fit=crop",
      lang: "English",
      newTag: true,
      price: "₹699",
      originalPrice: "₹999",
      discount: "Limited Time Offer – 30% Off",
      link: "#"
    }
  ]
};

const JeeDoubtRevision = () => {
  const [activeTab, setActiveTab] = useState("revision");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const getCoursesToShow = () => {
    return doubtRevisionData[activeTab] || [];
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
        <p className="breadcrumb">🏠 Home / JEE / Doubt & Revision</p>
        <h1 className="jee-title">JEE 2025 Doubt & Revision Courses – Final Prep Simplified</h1>
        <p className="desc">
          Don’t let doubts slow you down! Master key topics, clarify concepts, and revise faster with our dedicated Doubt & Revision Courses designed for JEE aspirants.
        </p>

        <div className="card-row">
          <CategoryCard title="Quick Revisions" desc="Crisp Notes + Video Recaps" color="#ffe9e3" />
          <CategoryCard title="Doubt Solving" desc="Live 1-on-1 & Group Sessions" color="#dff7ff" />
          <CategoryCard title="Exam Strategy" desc="Rank Boosting Techniques" color="#f3e9ff" />
          <CategoryCard title="Final Tests" desc="Based on Latest JEE Pattern" color="#ebffe3" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Doubt & Revision Courses</h2>

        <div className="jee-tabs">
          <button className={activeTab === "revision" ? "active" : ""} onClick={() => setActiveTab("revision")}>
            All Courses
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
                  <button className="jee-buy" onClick={() => handleBuyNow(course)}>
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

export default JeeDoubtRevision;
