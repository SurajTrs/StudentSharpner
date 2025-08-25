import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ Make sure the path is correct
import CategoryCard from "../../components/CategoryCard";
import "../../App.css";

const neetTwoYearCourses = [
  {
    title: "Pragati NEET 2027 – 2-Year Program (Hinglish)",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2940&auto=format&fit=crop",
    lang: "Hinglish",
    newTag: true,
    price: "₹9,999",
    originalPrice: "₹15,000",
    discount: "Save ₹5,001 – 33% OFF",
    link: "#"
  },
  {
    title: "Pragati NEET 2027 – 2-Year Program (Hindi)",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2940&auto=format&fit=crop",
    lang: "Hindi",
    newTag: false,
    price: "₹8,999",
    originalPrice: "₹14,500",
    discount: "Special Hindi Medium Price",
    link: "#"
  }
];

const NeetTwoYearProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
        <p className="breadcrumb">🏠 Home / NEET / 2-Year Program</p>
        <h1 className="jee-title">NEET 2027 – 2-Year Program (Class 11 + 12)</h1>
        <p className="desc">
          Start early with our 2-Year NEET Program for students entering Class 11. Get complete coverage of Physics, Chemistry, and Biology, personalized mentorship, mock tests, and more to ace NEET 2026.
        </p>

        <div className="card-row">
          <CategoryCard title="2-Year Syllabus" desc="Covers Class 11 & 12 + NEET" color="#e4f7e9" />
          <CategoryCard title="Live Lectures" desc="By NEET Toppers & Mentors" color="#fff1cc" />
          <CategoryCard title="Biweekly Tests" desc="With Detailed Analysis" color="#f6e4fc" />
          <CategoryCard title="24x7 Doubts" desc="Unlimited Doubt Solving" color="#e4eaff" />
        </div>
      </main>

      <section className="jee-batches">
        <h2>2-Year NEET Foundation Batches</h2>

        <div className="jee-cards-container">
          {neetTwoYearCourses.map((course, index) => (
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

export default NeetTwoYearProgram;
