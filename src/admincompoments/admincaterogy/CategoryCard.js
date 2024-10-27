import React from 'react';
import './CategoryPage.css'; 

const CategoryCard = ({ category, onDelete }) => {
  return (
    <div className="category-card">
      <h2>{category.name}</h2>
      <p>{category.description}</p>
      <button onClick={() => onDelete(category._id)}>Xóa</button>
    </div>
  );
};

export default CategoryCard;
