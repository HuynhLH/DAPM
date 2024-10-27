import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProductManager.css';

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    isFeatured: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchFeaturedName, setSearchFeaturedName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products/get');
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/get');
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({ ...newProduct, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/products/${currentProductId}`, newProduct);
        setMessage('Sản phẩm đã được cập nhật thành công!');
      } else {
        const productWithMapd = { ...newProduct, Mapd: `MAPD-${Date.now()}` };
        await axios.post('http://localhost:5000/api/products/add', productWithMapd);
        setMessage('Sản phẩm đã được thêm thành công!');
      }
      setNewProduct({ Name: '', description: '', price: '', image_url: '', category_id: '', isFeatured: false });
      setEditMode(false);
      fetchProducts();
    } catch (err) {
      setMessage('Có lỗi xảy ra!');
    }
  };

  const handleEdit = (product) => {
    setNewProduct({ ...product, isFeatured: product.isFeatured });
    setCurrentProductId(product._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
        setMessage('Sản phẩm đã được xóa thành công!');
      } catch (err) {
        setMessage('Có lỗi xảy ra khi xóa sản phẩm!');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesName = product.Name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
    return matchesName && matchesCategory;
  });

  const filteredFeaturedProducts = products.filter(product => {
    const matchesName = product.Name.toLowerCase().includes(searchFeaturedName.toLowerCase());
    return product.isFeatured && matchesName;
  });

  return (
    <div className="admin-product-manager">
      <h1 className="admin-product-manager-title">Quản lý sản phẩm</h1>
      {message && <p className="admin-product-manager-message">{message}</p>}

      <div className="admin-product-manager-search">
        <input
          className="admin-product-manager-input"
          type="text"
          placeholder="Tìm sản phẩm theo tên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          required
        />
        <select
          className="admin-product-manager-input"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tất cả loại sản phẩm</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      <form className="admin-product-manager-form" onSubmit={handleSubmit}>
        <input
          className="admin-product-manager-input"
          name="Name"
          placeholder="Tên sản phẩm"
          value={newProduct.Name}
          onChange={handleChange}
          required
        />
        <input
          className="admin-product-manager-input"
          name="description"
          placeholder="Mô tả"
          value={newProduct.description}
          onChange={handleChange}
        />
        <input
          className="admin-product-manager-input"
          name="price"
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          className="admin-product-manager-input"
          name="image_url"
          placeholder="Đường dẫn hình ảnh"
          value={newProduct.image_url}
          onChange={handleChange}
        />
        <select
          className="admin-product-manager-input"
          name="category_id"
          value={newProduct.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Chọn loại sản phẩm</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={newProduct.isFeatured}
            onChange={handleChange}
          />
          Sản phẩm nổi bật
        </label>
        <button className="admin-product-manager-submit" type="submit">
          {editMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </button>
      </form>

      <h2>SẢN PHẨM</h2>
      {loading ? (
        <p className="admin-product-manager-loading">Đang tải sản phẩm...</p>
      ) : error ? (
        <p className="admin-product-manager-error">Lỗi: {error}</p>
      ) : (
        <ul className="admin-product-manager-list">
          {filteredProducts.map((product) => (
            <li className="admin-product-manager-item" key={product._id}>
              <h2 className="admin-product-manager-item-title">{product.Name}</h2>
              <p className="admin-product-manager-item-description">{product.description}</p>
              <p className="admin-product-manager-item-price">Giá: {product.price} VND</p>
              <img className="admin-product-manager-item-image" src={product.image_url} alt={product.Name} width="100" />
              <button className="admin-product-manager-item-edit" onClick={() => handleEdit(product)}>
                Sửa
              </button>
              <button className="admin-product-manager-item-delete" onClick={() => handleDelete(product._id)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>SẢN PHẨM NỔI BẬT</h2>
      <input
        className="admin-product-manager-input"
        type="text"
        placeholder="Tìm sản phẩm nổi bật theo tên"
        value={searchFeaturedName}
        onChange={(e) => setSearchFeaturedName(e.target.value)}
      />
      <ul className="admin-product-manager-list">
        {filteredFeaturedProducts.map((product) => (
          <li className="admin-product-manager-item" key={product._id}>
            <h2 className="admin-product-manager-item-title">{product.Name}</h2>
            <p className="admin-product-manager-item-description">{product.description}</p>
            <p className="admin-product-manager-item-price">Giá: {product.price} VND</p>
            <img className="admin-product-manager-item-image" src={product.image_url} alt={product.Name} width="100" />
            <button className="admin-product-manager-item-edit" onClick={() => handleEdit(product)}>
              Sửa
            </button>
            <button className="admin-product-manager-item-delete" onClick={() => handleDelete(product._id)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManager;
