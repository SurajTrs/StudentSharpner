import React from "react";
import "../App.css"; // Or create a dedicated CSS file

const testimonials = [
  {
    name: "Tathagat Awatar",
    text: "STUDENT SHARPNER helped me to achieve AIR 1 in NEET and kept me motivated during my drop year. The structured guidance was a game changer!",
    tags: ["AIR 1", "NEET"],
 
  },
  {
    name: "Sneha Verma",
    text: "Thanks to STUDENT SHARPNER’s detailed concept videos and mock papers, I scored 98% in CBSE Class 10th Boards.",
    tags: ["CBSE Class 10", "Top Scorer"],
   
  },
  {
    name: "Aryan Mehta",
    text: "The revision modules and doubt-solving support from STUDENT SHARPNER helped me crack CBSE Class 12th with 97.6%. Highly recommended!",
    tags: ["CBSE Class 12", "Topper"],
    
  },
];

const StudentTestimonials = () => {
  return (
    <section className="testimonial-section">
      <h2>Students ❤️ STUDENT SHARPNER</h2>
      <p className="subtitle">Hear from our JEE, NEET & CBSE achievers</p>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <p className="quote">“{t.text}”</p>
            <div className="author">
              <img src={t.image} alt={t.name} className="avatar" />
              <div>
                <strong>{t.name}</strong>
                <div className="tags">
                  {t.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentTestimonials;
