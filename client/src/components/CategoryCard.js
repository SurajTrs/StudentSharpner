import React from 'react';

const CategoryCard = ({ title, desc, color }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="arrow">➜</span>
    </div>
  );
};

export default CategoryCard;
