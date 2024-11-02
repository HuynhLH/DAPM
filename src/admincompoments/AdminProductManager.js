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
    category: '',
    colors: [],
    sizes: [],
    brand: '',
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
    if (name === 'colors' || name === 'sizes') {
      const values = Array.from(e.target.selectedOptions, option => option.value);
      setNewProduct({ ...newProduct, [name]: values });
    } else {
      setNewProduct({ ...newProduct, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const productWithMapd = { ...newProduct, Mapd: `MAPD-${Date.now()}` };
        console.log('Dữ liệu gửi đi:', productWithMapd); // Ghi lại dữ liệu gửi đi

        if (editMode) {
            await axios.put(`http://localhost:5000/api/products/${currentProductId}`, newProduct);
            setMessage('Sản phẩm đã được cập nhật thành công!');
        } else {
            await axios.post('http://localhost:5000/api/products/add', productWithMapd);
            setMessage('Sản phẩm đã được thêm thành công!');
        }

        resetForm();
        fetchProducts();
    } catch (err) {
        console.error('Lỗi từ server:', err.response.data); 
        setMessage('Có lỗi xảy ra: ' + (err.response?.data?.message || '')); 
    }
};

  const resetForm = () => {
    setNewProduct({
      Name: '',
      description: '',
      price: '',
      image_url: '',
      category: '',
      colors: [],
      sizes: [],
      brand: '',
      isFeatured: false,
    });
    setEditMode(false);
    setCurrentProductId(null);
  };

  const handleEdit = (product) => {
    setNewProduct({ ...product });
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
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
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
          name="category"  
          value={newProduct.category}
          onChange={handleChange}
          required
        >
          <option value="">Chọn loại sản phẩm</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <select
          className="admin-product-manager-input"
          name="colors"
          multiple
          value={newProduct.colors}
          onChange={handleChange}
        >
          <option value="red">Đỏ</option>
          <option value="blue">Xanh dương</option>
          <option value="green">Xanh lá</option>
        </select>
        <select
          className="admin-product-manager-input"
          name="sizes"
          multiple
          value={newProduct.sizes}
          onChange={handleChange}
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <input
          className="admin-product-manager-input"
          name="brand"
          placeholder="Thương hiệu"
          value={newProduct.brand}
          onChange={handleChange}
        />
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
              <img className="admin-product-manager-item-image" src={product.image_url} alt={product.Name} />
              <button className="admin-product-manager-button" onClick={() => handleEdit(product)}>Chỉnh sửa</button>
              <button className="admin-product-manager-button" onClick={() => handleDelete(product._id)}>Xóa</button>
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
            <img className="admin-product-manager-item-image" src={product.image_url} alt={product.Name} />
            <button className="admin-product-manager-button" onClick={() => handleEdit(product)}>Chỉnh sửa</button>
            <button className="admin-product-manager-button" onClick={() => handleDelete(product._id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManager;
