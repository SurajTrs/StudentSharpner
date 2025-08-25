import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext
import CategoryCard from "../../components/CategoryCard"; // No PaymentButton import
import "../../App.css";

// Sample Data for Courses (Grades 6-8)
const data = {
  coursesFor6to8: [
    {
      grade: "Grade 6",
      subjects: [
        {
          title: "Math for Grade 6",
          languages: ["English", "Hindi"],
          image: "https://images.unsplash.com/photo-1562780482-6728f1207b49",
          price: "₹2,999",
          originalPrice: "₹4,500",
          discount: "Save ₹1,501 – 33% OFF",
          link: "#",
          id: "course6", // Unique ID for this course
        },
      ]
    },
    {
      grade: "Grade 7",
      subjects: [
        {
          title: "Science for Grade 7",
          languages: ["English", "Hindi"],
          image: "https://images.unsplash.com/photo-1562780482-6728f1207b49",
          price: "₹2,999",
          originalPrice: "₹4,500",
          discount: "Save ₹1,501 – 33% OFF",
          link: "#",
          id: "course7", // Unique ID for this course
        },
      ]
    },
    {
      grade: "Grade 8",
      subjects: [
        {
          title: "EVS for Grade 8",
          languages: ["English", "Hindi"],
          image: "https://images.unsplash.com/photo-1562780482-6728f1207b49",
          price: "₹2,999",
          originalPrice: "₹4,500",
          discount: "Save ₹1,501 – 33% OFF",
          link: "#",
          id: "course8", // Unique ID for this course
        },
      ]
    },
  ],
};

const CoursesFor6to8 = () => {
  const [activeTab, setActiveTab] = useState("Grade 6");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const getCoursesToShow = () => {
    return (
      data.coursesFor6to8.find((grade) => grade.grade === activeTab)?.subjects ||
      []
    );
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
        <p className="breadcrumb">🏠 Home / Courses</p>
        <h1 className="jee-title">Courses for Grades 6-8</h1>
        <p className="desc">
          Explore courses designed to help students from Grade 6 to Grade 8 excel in subjects like Math, Science, EVS, and Language.
        </p>

        <div className="card-row">
          <CategoryCard title="Math & Science" desc="Engage with fun and interactive learning!" color="#e7ebfb" />
          <CategoryCard title="Language Courses" desc="Learn Hindi & English effectively" color="#ffe5e5" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Grade 6-8 Courses</h2>

        {/* Tabs for Grades 6-8 */}
        <div className="jee-tabs">
          {["Grade 6", "Grade 7", "Grade 8"].map((grade) => (
            <button
              key={grade}
              className={activeTab === grade ? "active" : ""}
              onClick={() => setActiveTab(grade)}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="jee-cards-container">
          {getCoursesToShow().map((course, index) => (
            <div className="jee-card" key={index}>
              <img src={course.image} alt={`Course cover for ${course.title}`} className="jee-banner" />
              <div className="jee-card-body">
                <h4>{course.title}</h4>
                <div className="jee-tags">
                  <span className="jee-badge lang">{course.languages.join(", ")}</span>
                </div>
                <p className="jee-price">
                  <span>{course.price}</span> <span className="original-price">{course.originalPrice}</span>
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

export default CoursesFor6to8;
