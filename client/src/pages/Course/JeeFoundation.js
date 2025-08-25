import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust this path based on your structure
import "../../App.css";

const foundationData = {
  class9: [
    {
      title: "Udaan JEE 2028 - Class 9",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hinglish",
      newTag: true,
      price: "₹2,499",
      originalPrice: "₹4,000",
      discount: "Discount of 37% applied",
      link: "#"
    }
  ],
  class10: [
    {
      title: "Udaan JEE 2027 - Class 10",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hindi",
      newTag: true,
      price: "₹2,999",
      originalPrice: "₹4,500",
      discount: "Discount of 33% applied",
      link: "#"
    }
  ]
};

const JeeFoundation = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuth(); // Access the user object directly

  const combinedCourses = [...foundationData.class9, ...foundationData.class10];

  const getCoursesToShow = () => {
    if (activeTab === "all") return combinedCourses;
    return foundationData[activeTab] || [];
  };

  const handleBuyNow = (course) => {
    if (!user) { // Check if user is logged in using `user` object
      // If not logged in, redirect to login page
      navigate("/login");
      return;
    }
    // If logged in, navigate to order-summary page
    navigate("/order-summary", { state: { course } });
  };

  return (
    <div className="jee-page">
      <main className="jee-main">
        <p className="breadcrumb">🏠 Home / JEE Foundation</p>
        <h1 className="jee-title">Foundation Courses for JEE (Class 9 & 10)</h1>
        <p className="desc">
          Get a head start on your JEE preparation with our foundational batches. Designed for early learners in Classes 9 and 10, these courses aim to strengthen core concepts and build the right momentum for future success.
        </p>

        <div className="card-row">
          <div className="category-card" style={{ backgroundColor: "#e7ebfb" }}>
            <h3>Concept Clarity</h3>
            <p>Clear your basics in Physics, Chemistry & Maths</p>
          </div>
          <div className="category-card" style={{ backgroundColor: "#ffe5e5" }}>
            <h3>Live Doubts</h3>
            <p>Regular doubt-solving classes</p>
          </div>
          <div className="category-card" style={{ backgroundColor: "#d8f8e2" }}>
            <h3>Mock Tests</h3>
            <p>Test your knowledge with real exam simulation</p>
          </div>
          <div className="category-card" style={{ backgroundColor: "#e4f0fb" }}>
            <h3>Progress Tracker</h3>
            <p>Monitor performance and improvement areas</p>
          </div>
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

export default JeeFoundation;
