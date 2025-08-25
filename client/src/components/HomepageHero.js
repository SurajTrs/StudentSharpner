import React from "react";
import { FaChalkboardTeacher, FaRegClock, FaSchool } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import "../App.css"; // make sure App.css is in src/
import talkImg from "../assets/talk.jpg";
export default function HomepageHero() {
  return (
    <div className="homepage-hero">
      <header>
        <div className="max-w-xl">
          <h1 className="text-gray-900" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            India’s <span className="text-blue-600">Most Reliable & Affordable</span>
            <br /> Learning Platform
          </h1>
          <p className="text-gray-600" style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
            Unleash your true potential with EduNation — empowering every learner with accessible, quality education.
          </p>
          <button className="bg-purple-600 text-white" style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", borderRadius: "8px", border: "none" }}>
            Start Learning
          </button>
        </div>

        <div className="relative" style={{ width: "100%", maxWidth: "350px" }}>
          <img src={talkImg} alt="Mentor" className="rounded-xl shadow" style={{ width: "100%" }} />
          <div className="absolute top-4 left-1/2 transform bg-white shadow p-2 rounded-xl" style={{ fontSize: "0.8rem", transform: "translateX(-50%)" }}>
            Mentor, how is this platform different?
          </div>
          <div className="absolute bottom-4 left-1/2 transform bg-purple-600 text-white px-4 py-2 rounded-xl" style={{ fontSize: "0.85rem", transform: "translateX(-50%)" }}>
            Here, learning is not just about marks — it’s about growth, clarity, and confidence.
          </div>
        </div>
      </header>

      <section className="grid grid-cols-4" style={{ marginTop: "4rem" }}>
        <div className="card">
          <FaChalkboardTeacher style={{ fontSize: "1.75rem", color: "red", marginBottom: "0.5rem" }} />
          <h4>Live Classes</h4>
          <p>Engaging, interactive sessions</p>
        </div>

        <div className="card">
          <HiOutlineDocumentText style={{ fontSize: "1.75rem", color: "blue", marginBottom: "0.5rem" }} />
          <h4>Study Material</h4>
          <p>Notes, tests, and mock papers</p>
        </div>

        <div className="card">
          <FaRegClock style={{ fontSize: "1.75rem", color: "purple", marginBottom: "0.5rem" }} />
          <h4>24/7 Support</h4>
          <p>Instant doubt solving</p>
        </div>

        <div className="card">
          <FaSchool style={{ fontSize: "1.75rem", color: "goldenrod", marginBottom: "0.5rem" }} />
          <h4>100+ Centres</h4>
          <p>Across India’s cities</p>
        </div>
      </section>
    </div>
  );
}
