import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";

const data = {
  class11: [
    {
      title: "Prarambh Batch – JEE 2026",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hinglish",
      newTag: true,
      price: "₹4,999",
      originalPrice: "₹5,600",
      discount: "Discount of 11% applied",
      link: "#"
    },
    {
      title: "Prarambh Batch – JEE 2026",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hindi",
      newTag: true,
      price: "₹2,799",
      originalPrice: "₹5,000",
      discount: "Discount of 44% applied",
      link: "#"
    },
    {
      title: "Power Batch JEE 2027",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hinglish",
      newTag: false,
      price: "₹499",
      originalPrice: "",
      discount: "Limited Seats Only",
      link: "#"
    }
  ],
  class12: [
    {
      title: "Dream Batch – JEE 2025",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "English",
      newTag: true,
      price: "₹3,999",
      originalPrice: "₹6,000",
      discount: "Discount of 33% applied",
      link: "#"
    },
    {
      title: "Sankalp Batch – JEE 2025 ",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hindi",
      newTag: true,
      price: "₹3,999",
      originalPrice: "₹6,000",
      discount: "Discount of 33% applied",
      link: "#"
    }
  ],
  dropper: [
    {
      title: "Yoddha Batch – JEE 2025 (Dropper Focus)",
      image: "https://images.unsplash.com/photo-1682203534176-60f5d99da756?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      lang: "Hindi",
      newTag: false,
      price: "₹2,499",
      originalPrice: "₹4,500",
      discount: "Discount of 45% applied",
      link: "#"
    }
  ]
};

const JeeFoundation = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const combinedCourses = [
    ...data.class11,
    ...data.class12,
    ...data.dropper
  ];

  const getCoursesToShow = () => {
    if (activeTab === "all") return combinedCourses;
    return data[activeTab] || [];
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
        <p className="breadcrumb">🏠 Home / JEE Main & Advanced</p>
        <h1 className="jee-title">
          JEE Main & Advanced 2025 – Complete Guide: Syllabus, Exam Pattern, Dates & Courses
        </h1>
        <p className="desc">
          Prepare for one of India’s most prestigious engineering entrance exams with STUDENT SHARPNER. Our expert-designed courses for JEE 2025 cover everything you need—from detailed syllabus breakdowns to real-time mock tests, expert mentorship, and performance analysis.
        </p>

        <div className="card-row">
          <CategoryCard title="Expert Blogs" desc="Insights & Strategies from JEE Experts" color="#e7ebfb" />
          <CategoryCard title="Live Courses" desc="Join Our Result-Oriented Batches" color="#ffe5e5" />
          <CategoryCard title="Test Series" desc="Simulate the Real Exam Environment" color="#d8f8e2" />
          <CategoryCard title="Recommended Books" desc="Top Books for JEE Prep" color="#e4f0fb" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>IIT JEE Courses</h2>

        {/* Tabs */}
        <div className="jee-tabs">
          <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
            All Courses
          </button>
          <button className={activeTab === "class11" ? "active" : ""} onClick={() => setActiveTab("class11")}>
            Class 11
          </button>
          <button className={activeTab === "class12" ? "active" : ""} onClick={() => setActiveTab("class12")}>
            Class 12
          </button>
          <button className={activeTab === "dropper" ? "active" : ""} onClick={() => setActiveTab("dropper")}>
            Dropper
          </button>
        </div>

        {/* Cards */}
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

export default JeeFoundation;
