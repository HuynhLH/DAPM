import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProductManager.css'; // Import CSS

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    Mapd: '',
    Name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products/add', newProduct);
      setMessage('Sản phẩm đã được thêm thành công!');
      setNewProduct({ Mapd: '', Name: '', description: '', price: '', image_url: '', category_id: '' });
      fetchProducts();
    } catch (err) {
      setMessage('Có lỗi xảy ra khi thêm sản phẩm!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
      setMessage('Sản phẩm đã được xóa thành công!');
    } catch (err) {
      setMessage('Có lỗi xảy ra khi xóa sản phẩm!');
    }
  };

  return (
    <div className="admin-product-manager">
      <h1 className="admin-product-manager-title">Quản lý sản phẩm</h1>
      {message && <p className="admin-product-manager-message">{message}</p>}
      <form className="admin-product-manager-form" onSubmit={handleSubmit}>
        <input
          className="admin-product-manager-input"
          name="Mapd"
          placeholder="Mã sản phẩm"
          value={newProduct.Mapd}
          onChange={handleChange}
          required
        />
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
        <input
          className="admin-product-manager-input"
          name="category_id"
          type="number"
          placeholder="ID loại"
          value={newProduct.category_id}
          onChange={handleChange}
          required
        />
        <button className="admin-product-manager-submit" type="submit">
          Thêm sản phẩm
        </button>
      </form>
      {loading ? (
        <p className="admin-product-manager-loading">Đang tải sản phẩm...</p>
      ) : error ? (
        <p className="admin-product-manager-error">Lỗi: {error}</p>
      ) : (
        <ul className="admin-product-manager-list">
          {products.map((product) => (
            <li className="admin-product-manager-item" key={product._id}>
              <h2 className="admin-product-manager-item-title">{product.Name}</h2>
              <p className="admin-product-manager-item-description">{product.description}</p>
              <p className="admin-product-manager-item-price">Giá: {product.price} VND</p>
              <img className="admin-product-manager-item-image" src={product.image_url} alt={product.Name} width="100" />
              <button className="admin-product-manager-item-delete" onClick={() => handleDelete(product._id)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProductManager;
