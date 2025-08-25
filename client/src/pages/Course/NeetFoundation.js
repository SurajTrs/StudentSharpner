import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";

const neetFoundationData = {
  class9: [
    {
      title: "NEET Udaan 2028 – Class 9 Foundation",
      image: "https://images.unsplash.com/photo-1588776814546-ec7a3fd1b2b9?q=80&w=2940&auto=format&fit=crop",
      lang: "Hinglish",
      newTag: true,
      price: "₹2,499",
      originalPrice: "₹4,000",
      discount: "Save 37% Now",
      link: "#"
    }
  ],
  class10: [
    {
      title: "NEET Udaan 2027 – Class 10 Foundation",
      image: "https://images.unsplash.com/photo-1588776814546-ec7a3fd1b2b9?q=80&w=2940&auto=format&fit=crop",
      lang: "Hindi",
      newTag: true,
      price: "₹2,999",
      originalPrice: "₹4,500",
      discount: "33% Discount Applied",
      link: "#"
    }
  ]
};

const NeetFoundation = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuth();

  const combinedCourses = [...neetFoundationData.class9, ...neetFoundationData.class10];

  const getCoursesToShow = () => {
    if (activeTab === "all") return combinedCourses;
    return neetFoundationData[activeTab] || [];
  };

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
        <p className="breadcrumb">🏠 Home / NEET / Foundation Courses</p>
        <h1 className="jee-title">NEET Foundation Courses – Class 9 & 10</h1>
        <p className="desc">
          Start your NEET journey early with concept-building Foundation Courses for Class 9 and 10. Lay a strong base in Biology, Physics, and Chemistry to shine in NEET.
        </p>

        <div className="card-row">
          <CategoryCard title="Early Preparation" desc="Get NEET-ready from Class 9" color="#fff8e3" />
          <CategoryCard title="Concept Clarity" desc="In-depth NCERT + Extra" color="#e7f3ff" />
          <CategoryCard title="Live Classes" desc="With Doubt Solving" color="#fef0f0" />
          <CategoryCard title="Mock Tests" desc="Practice from Day 1" color="#e4fff6" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Foundation Courses</h2>

        <div className="jee-tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            All Courses
          </button>
          <button className={activeTab === "class9" ? "active" : ""} onClick={() => setActiveTab("class9")}>
            Class 9
          </button>
          <button className={activeTab === "class10" ? "active" : ""} onClick={() => setActiveTab("class10")}>
            Class 10
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

export default NeetFoundation;
