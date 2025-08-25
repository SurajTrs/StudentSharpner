import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext
import CategoryCard from "../../components/CategoryCard"; 
import "../../App.css";

// Sample Data for Courses (Grades 9-10)
const data = {
  coursesFor9to10: [
    {
      grade: "Grade 9",
      image: "https://images.unsplash.com/photo-1562780482-6728f1207b49",
      price: "₹3,499",
      originalPrice: "₹5,000",
      discount: "Save ₹1,501 – 30% OFF",
      link: "#",
      id: "course9", // Unique ID for this course
    },
    {
      grade: "Grade 10",
      image: "https://images.unsplash.com/photo-1562780482-6728f1207b49",
      price: "₹3,999",
      originalPrice: "₹5,500",
      discount: "Save ₹1,501 – 27% OFF",
      link: "#",
      id: "course10", // Unique ID for this course
    },
  ],
};

const CoursesFor9to10 = () => {
  const [activeTab, setActiveTab] = useState("Grade 9");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const getCoursesToShow = () => {
    return (
      data.coursesFor9to10.find((grade) => grade.grade === activeTab) || {}
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
        <h1 className="jee-title">Courses for Grades 9-10</h1>
        <p className="desc">
          Explore courses designed to help students from Grade 9 to Grade 10 excel in various subjects.
        </p>

        <div className="card-row">
          <CategoryCard title="Grade 9 & 10 Courses" desc="Comprehensive courses designed for Grade 9 and Grade 10 students." color="#e7ebfb" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Grade 9-10 Courses</h2>

        {/* Tabs for Grades 9-10 */}
        <div className="jee-tabs">
          {["Grade 9", "Grade 10"].map((grade) => (
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
          <div className="jee-card">
            <img src={getCoursesToShow().image} alt={`Course cover for ${getCoursesToShow().grade}`} className="jee-banner" />
            <div className="jee-card-body">
              <h4>{getCoursesToShow().grade}</h4>
              <p className="jee-price">
                <span>{getCoursesToShow().price}</span> <span className="original-price">{getCoursesToShow().originalPrice}</span>
              </p>
              <p className="jee-discount">{getCoursesToShow().discount}</p>
              
              {/* Buy Now button */}
              <button onClick={() => handleBuyNow(getCoursesToShow())} className="buy-now-btn">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesFor9to10;
