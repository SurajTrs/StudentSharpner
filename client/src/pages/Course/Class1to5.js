import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext
import "../../App.css";
import CategoryCard from "../../components/CategoryCard"; // No PaymentButton import

const data = {
  coursesFor1to5: [
    {
      grade: "Grade 1",
      subjects: [
        {
          title: "Math for Grade 1",
          image: "https://example.com/math1.jpg",
          price: "₹999",
          originalPrice: "₹1,200",
          discount: "Discount of 17% applied",
          languages: ["Hindi", "English"],
        },
        // Add more subjects here
      ],
    },
    {
      grade: "Grade 2",
      subjects: [
        {
          title: "Science for Grade 2",
          image: "https://example.com/science2.jpg",
          price: "₹1,299",
          originalPrice: "₹1,500",
          discount: "Discount of 13% applied",
          languages: ["Hindi"],
        },
        // Add more subjects here
      ],
    },
    // Add other grades here
  ],
};

const CoursesFor1to5 = () => {
  const [activeTab, setActiveTab] = useState("Grade 1");
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const selectedGrade = data.coursesFor1to5.find((g) => g.grade === activeTab);

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
        <p className="breadcrumb">🏠 Home / Courses for Junior Grades</p>
        <h1 className="jee-title">Courses for Junior Grades (1-5)</h1>
        <p className="desc">
          Explore courses designed to help students from Grade 1 to Grade 5 excel in subjects like Math, Science, EVS, and Language.
        </p>

        {/* Category Cards */}
        <div className="card-row">
          <CategoryCard title="Math & Science" desc="Engage with fun and interactive learning!" color="#e7ebfb" />
          <CategoryCard title="Language Courses" desc="Learn Hindi & English effectively" color="#ffe5e5" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>Junior Grade School Courses</h2>

        {/* Tabs */}
        <div className="jee-tabs">
          {data.coursesFor1to5.map((grade) => (
            <button
              key={grade.grade}
              className={activeTab === grade.grade ? "active" : ""}
              onClick={() => setActiveTab(grade.grade)}
            >
              {grade.grade}
            </button>
          ))}
        </div>

        {/* Show only selected grade's courses */}
        <div className="jee-cards-container">
          {selectedGrade && (
            <div className="jee-grade-card">
              <h3>{selectedGrade.grade}</h3>
              <div className="jee-cards">
                {selectedGrade.subjects.map((course, index) => (
                  <div className="jee-card" key={index}>
                    <img src={course.image} alt={course.title} className="jee-banner" />
                    <div className="jee-card-body">
                      <h4>{course.title}</h4>
                      <div className="jee-tags">
                        <span className="jee-badge lang">{course.languages.join(", ")}</span>
                      </div>
                      <p className="jee-price">
                        <span>{course.price}</span>{" "}
                        <span className="original-price">{course.originalPrice}</span>
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursesFor1to5;
