import React, { useRef, useEffect, useState } from 'react';
import '../App.css';
import heroImg from '../assets/hero.jpg';
import iitImg from '../assets/iit.jpg';
import neetImg from '../assets/neet.jpg';
import cbseImg from '../assets/cbse1.jpg';
import HomepageHero from '../components/HomepageHero';
import ExamCategories from '../components/ExamCategories';
import TrustedByStudents from "../components/TrustedByStudents";
import StudentTestimonials from "../components/StudentTestimonials";
import StudyResources from "../components/StudyResources";
 // ✅ Correct import

const slides = [
  {
    title: "🎓 New JEE Batches Starting Soon!",
    description:
      "For Classes:\n✅ 11th\n✅ 12th\n✅ Droppers\n\n📚 Expert Faculty\n📄 Daily Practice\n📝 Mock Tests\n❓ Doubt Support\n\n🎯 Achieve Your JEE Aim With Us!",
    titleColor: "#fff",
    descColor: "#fff",
  },
  {
    title: "🩺 New NEET Batches Starting Soon!",
    description:
      "For Classes:\n✅ 11th\n✅ 12th\n✅ Droppers\n\n📚 Expert Faculty\n📄 Daily Practice\n📝 Mock Tests\n❓ Doubt Support\n\n💯 Crack NEET With Confidence!",
    titleColor: "#fff",
    descColor: "#fff",
  },
  {
    title: "🏆 Topper Batch for CBSE Students",
    description:
      "From Classes:\n✅ 1st to 12th\n\n📘 Personalized Coaching\n📚 NCERT + Boards Focus!",
    titleColor: "#fff",
    descColor: "#fff",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => resetTimeout();
  }, [index]);

  const currentSlide = slides[index];

  const getBackgroundImage = () => {
    if (currentSlide.title.includes("JEE")) {
      return iitImg;
    } else if (currentSlide.title.includes("NEET")) {
      return neetImg;
    } else {
      return cbseImg;
    }
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <section
        className="carousel-wrapper"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div className="background-overlay" />
        <img src={heroImg} alt="Small Hero" className="top-right-logo" />
        <div className="carousel-slide active">
          <div className="carousel-left">
            <h1 style={{ color: currentSlide.titleColor }}>{currentSlide.title}</h1>
            <p style={{ color: currentSlide.descColor, whiteSpace: "pre-line" }}>
              {currentSlide.description}
              <a href="/courses" className="explore-btn small">Explore Courses</a>
            </p>
            
          </div>
        </div>
      </section>

      {/* Homepage Trust & Features Section */}
      <HomepageHero />
      <ExamCategories />
      <TrustedByStudents />
      <StudentTestimonials />
      <StudyResources />
    
    </>
  );
};

export default Home;
