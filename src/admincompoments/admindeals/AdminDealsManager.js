// src/admincomponents/AdminDealsManager.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeals, createDeal, updateDeal, deleteDeal } from '../../redux/dealSlice';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from 'axios';
import './AdminDealsManager.css'; 

const AdminDealsManager = () => {
    const dispatch = useDispatch();
    const { deals, loading, error } = useSelector((state) => state.deals);
    const [categories, setCategories] = useState([]);
    const [newDeal, setNewDeal] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        discount: '', 
        startDate: '', 
        endDate: '', 
        brand: '', 
        colors: '',
        sizes:'',
    });
    const [editMode, setEditMode] = useState(false);
    const [editDealId, setEditDealId] = useState('');

    useEffect(() => {
        dispatch(fetchDeals());
        fetchCategories();
        checkDealsExpiration();
    }, [dispatch]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories/get');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDeal((prev) => ({ ...prev, [name]: value }));
        
        // Recalculate the discounted price when price or discount changes
        if (name === "discount" || name === "price") {
            const discount = parseFloat(newDeal.discount) || 0;
            const price = parseFloat(newDeal.price) || 0;
            const discountedPrice = price - (price * discount) / 100;
            setNewDeal((prev) => ({ ...prev, discountedPrice: discountedPrice.toFixed(2) }));
        }
    };
    
    
    
    const handleDateChange = (date, field) => {
        if (field === "startDate") {
          setNewDeal((prev) => ({ ...prev, startDate: date }));
        } else if (field === "endDate") {
          setNewDeal((prev) => ({ ...prev, endDate: date }));
        }
      };      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await dispatch(updateDeal({ id: editDealId, dealData: newDeal }));
            } else {
                await dispatch(createDeal(newDeal));
            }
            resetForm();
        } catch (error) {
            console.error('Error saving deal:', error);
        }
    };

    const handleEdit = (deal) => {
        setNewDeal(deal);
        setEditMode(true);
        setEditDealId(deal._id);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteDeal(id));
        } catch (error) {
            console.error('Error deleting deal:', error);
        }
    };
    const handleChange1 = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'colors' || name === 'sizes') {
          const values = Array.from(e.target.selectedOptions, option => option.value);
          setNewDeal({ ...newDeal, [name]: values });
        } else {
          setNewDeal({ ...newDeal, [name]: type === 'checkbox' ? checked : value });
        }
      };

    const resetForm = () => {
        setNewDeal({ 
            name: '', 
            description: '', 
            price: '', 
            image_url: '', 
            category: '', 
            discount: '', 
            startDate: '', 
            endDate: '',
            brand: '' ,
            sizes:'',
            colors:'',
        });
        setEditMode(false);
        setEditDealId('');
    };
    const checkDealsExpiration = () => {
        const today = new Date();
        deals.forEach((deal) => {
          if (new Date(deal.endDate) < today && deal.discount) {
            dispatch(updateDeal({ id: deal._id, dealData: { ...deal, discount: 0 } }));
          }
        });
      };


    return (
        <div className="admin-deals-manager">
            <h1 className="admin-deals-title">Quản lý Deals</h1>
            <form className="admin-deals-form" onSubmit={handleSubmit}>
                <input 
                    className="admin-deal-input" 
                    name="name" 
                    placeholder="Tên Deal" 
                    value={newDeal.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    className="admin-deal-input" 
                    name="description" 
                    placeholder="Mô tả" 
                    value={newDeal.description} 
                    onChange={handleChange} 
                />
                <input
          className="admin-deal-input"
          name="price"
          type="number"
          placeholder="Giá"
          value={newDeal.price}
          onChange={handleChange}
          required
        />
                <input 
                    className="admin-deal-input" 
                    name="image_url" 
                    placeholder="URL hình ảnh" 
                    value={newDeal.image_url} 
                    onChange={handleChange} 
                />
                <input
          className="admin-deal-input"
          name="discount"
          type="number"
          placeholder="Giảm giá (%)"
          value={newDeal.discount}
          onChange={handleChange}
        />
        <p className="discounted-price">{newDeal.discountedPrice ? newDeal.discountedPrice : newDeal.price} ₫
</p>

        <DatePicker
          selected={newDeal.startDate}
          onChange={(date) => handleDateChange(date, "startDate")}
          placeholderText="Ngày bắt đầu"
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={newDeal.endDate}
          onChange={(date) => handleDateChange(date, "endDate")}
          placeholderText="Ngày kết thúc"
          minDate={newDeal.startDate}
          dateFormat="dd/MM/yyyy"
        />
                <input 
                    className="admin-deal-input" 
                    name="brand" 
                    placeholder="Thương hiệu" 
                    value={newDeal.brand} 
                    onChange={handleChange} 
                />
                <select
                className="admin-product-manager-input"
                name="colors"
                multiple
                value={newDeal.colors}
                onChange={handleChange1}
                >
                <option value="red">Đỏ</option>
                <option value="blue">Xanh dương</option>
                <option value="green">Xanh lá</option>
                </select>
                <select
                className="admin-product-manager-input"
                name="sizes"
                multiple
                value={newDeal.sizes}
                onChange={handleChange1}
                >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                </select>
                <select 
                    className="admin-deal-input" 
                    name="category" 
                    value={newDeal.category} 
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
                        name="isActive" 
                        checked={newDeal.isActive} 
                        onChange={(e) => setNewDeal({ ...newDeal, isActive: e.target.checked })} 
                    />
                    Hoạt động
                </label>
                <button className="admin-deal-button" type="submit" disabled={loading}>
          {editMode ? "Cập nhật" : "Thêm"}
        </button>
        {editMode && (
          <button type="button" className="admin-deal-cancel-button" onClick={resetForm}>
            Hủy
          </button>
        )}
            </form>

            <h2 className="admin-deals-list-title">Danh sách Deals</h2>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <ul className="admin-deals-list">
    {deals.map(deal => {
        // Calculate the discounted price outside JSX
        const discountedPrice = deal.discount ? deal.price - (deal.price * deal.discount) / 100 : deal.price;

        return (
            <li className="admin-deal-item" key={deal._id}>
                <h3 className="admin-deal-name">{deal.name}</h3>
                <p className="admin-deal-price">Giá: {deal.price} ₫</p>
                <p className="admin-deal-discount">Giảm giá: {deal.discount || 0} %</p>
                <p className="admin-deal-discounted-price">{discountedPrice} ₫</p>
                <p className="admin-deal-dates">Thời gian:{deal.startDate} đến {deal.endDate}</p>
                <p className="admin-deal-status">Tình trạng:{deal.isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}</p>
                <button onClick={() => handleEdit(deal)} className="admin-deal-edit-button">Sửa</button>
                <button onClick={() => handleDelete(deal._id)} className="admin-deal-delete-button">Xóa</button>
            </li>
        );
    })}
</ul>

            )}
            {error && <p className="error-message">{error}</p>} 
        </div>
    );
};

export default AdminDealsManager;
