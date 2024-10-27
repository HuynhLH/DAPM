import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, addCategory } from '../../redux/categorySlice';
import CategoryCard from './CategoryCard';
import './CategoryPage.css'; 

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  const [newCategoryName, setNewCategoryName] = useState(''); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      dispatch(addCategory({ name: newCategoryName }));
      setNewCategoryName(''); // Reset lại input sau khi thêm
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-page">
      <h1>Danh sách loại sản phẩm</h1>
      <div className="add-category-form">
        <input
          type="text"
          placeholder="Nhập tên loại sản phẩm mới"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Thêm Loại Sản Phẩm</button>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
