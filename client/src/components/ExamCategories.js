import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "NEET",
    tags: ["Class 11", "Class 12", "Dropper"],
    icon: "🧬",
  },
  {
    title: "IIT JEE",
    tags: ["Class 11", "Class 12", "Dropper"],
    icon: "🔬",
  },
  {
    title: "School Foundation",
    tags: ["Class 6", "Class 7", "Class 8", "More"],
    icon: "📘",
  },
];

const ExamCategories = () => {
  return (
    <section className="exam-section">
      <h2>Explore Top Exam Categories</h2>
      <p className="exam-subtitle">
        At <strong>STUDENT SHARPNER</strong>, we empower learners across all major streams. Find your path and sharpen your future!
      </p>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="category-card">
              <div className="category-header">
                <h3>{cat.title}</h3>
                <div className="icon">{cat.icon}</div>
              </div>
              <div className="tags">
                {cat.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="explore-btn">Discover Courses →</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="view-all">
        <Link to="#">View All 19+ Categories</Link>
      </div>
    </section>
  );
};

export default ExamCategories;
