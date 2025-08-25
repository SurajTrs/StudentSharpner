import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = ({ onPurchase }) => {
  const { id } = useParams();

  const course = {
    id,
    name: `Course Name for ${id}`, // Replace with real data or fetch from API
    description: `This is the detailed description for course ID: ${id}.`,
  };

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(course);
      alert(`You purchased: ${course.name}`);
    } else {
      console.warn("Purchase function not provided.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
        <p className="text-gray-700 mb-6">{course.description}</p>
        <button
          onClick={handlePurchase}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Purchase Course
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
