import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext
import CategoryCard from "../../components/CategoryCard"; 
// Import PaymentButton
import "../../App.css";

// Sample Data for Senior Academic Courses (Grades 11-12)
const seniorData = {
  grade11: {
    math: [
      {
        title: "Math Course – Class 11 (Base Elevate)",
        subject: "Mathematics",
        lang: "English + Hindi",
        image: "https://images.unsplash.com/photo-1584697964194-821dbba0e6f0",
        price: "₹4,499",
        originalPrice: "₹6,000",
        discount: "Save ₹1,501 – 25% OFF",
        link: "#",
        newTag: true
      }
    ],
    bio: [
      {
        title: "Biology Course – Class 11 (Base Elevate)",
        subject: "Biology",
        lang: "English + Hindi",
        image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
        price: "₹4,499",
        originalPrice: "₹6,000",
        discount: "Save ₹1,501 – 25% OFF",
        link: "#",
        newTag: true
      }
    ]
  },
  grade12: {
    math: [
      {
        title: "Math Course – Class 12 (Base Mastery)",
        subject: "Mathematics",
        lang: "English + Hindi",
        image: "https://images.unsplash.com/photo-1584697964194-821dbba0e6f0",
        price: "₹4,999",
        originalPrice: "₹6,500",
        discount: "Save ₹1,501 – 23% OFF",
        link: "#",
        newTag: true
      }
    ],
    bio: [
      {
        title: "Biology Course – Class 12 (Base Mastery)",
        subject: "Biology",
        lang: "English + Hindi",
        image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
        price: "₹4,999",
        originalPrice: "₹6,500",
        discount: "Save ₹1,501 – 23% OFF",
        link: "#",
        newTag: true
      }
    ]
  }
};

const SeniorAcademicCourses = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeGrade, setActiveGrade] = useState("grade11");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const getCoursesToShow = () => {
    // Safeguard to ensure the activeGrade exists in seniorData
    const gradeData = seniorData[activeGrade];

    if (!gradeData) {
      return []; // Return empty array if grade data doesn't exist
    }

    switch (activeTab) {
      case "math":
        return gradeData.math || []; // Return empty array if math data is missing
      case "bio":
        return gradeData.bio || []; // Return empty array if bio data is missing
      case "all":
      default:
        return [
          ...(gradeData.math || []), 
          ...(gradeData.bio || [])
        ]; // Combine math and bio courses
    }
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
        <p className="breadcrumb">🏠 Home / Academic Senior</p>
        <h1 className="jee-title">
          Academic Courses for Class 11 & 12 – Science Stream (Base Series)
        </h1>
        <p className="desc">
          Designed for CBSE/State board excellence, these Class 11th & 12th courses cover core science subjects with bilingual support, notes, and assignments.
        </p>

        <div className="card-row">
          <CategoryCard title="Math & Science" desc="Engage with fun and interactive learning!" color="#e7ebfb" />
          <CategoryCard title="Language Courses" desc="Learn Hindi & English effectively" color="#ffe5e5" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Explore Class 11 & 12 Courses</h2>
        <div className="jee-tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>All</button>
          <button className={activeTab === "math" ? "active" : ""} onClick={() => setActiveTab("math")}>Math</button>
          <button className={activeTab === "bio" ? "active" : ""} onClick={() => setActiveTab("bio")}>Biology</button>
        </div>

        <div className="jee-tabs">
          <button className={activeGrade === "grade11" ? "active" : ""} onClick={() => setActiveGrade("grade11")}>Class 11</button>
          <button className={activeGrade === "grade12" ? "active" : ""} onClick={() => setActiveGrade("grade12")}>Class 12</button>
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

                {/* Buy Now button */}
                <button onClick={() => handleBuyNow(course)} className="buy-now-btn">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SeniorAcademicCourses;
