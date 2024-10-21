// src/admincomponents/AdminDealsManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDealsManager.css'; // Tạo file CSS nếu cần

const AdminDealsManager = () => {
    const [deals, setDeals] = useState([]);
    const [newDeal, setNewDeal] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [editDealId, setEditDealId] = useState('');

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/deals/get');
            setDeals(response.data);
        } catch (error) {
            console.error('Error fetching deals:', error);
        }
    };

    const handleChange = (e) => {
        setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(`http://localhost:5000/api/deals/update/${editDealId}`, newDeal);
            } else {
                await axios.post('http://localhost:5000/api/deals/add', newDeal);
            }
            setNewDeal({ name: '', description: '', price: '', image_url: '' });
            setEditMode(false);
            fetchDeals();
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
            await axios.delete(`http://localhost:5000/api/deals/delete/${id}`);
            fetchDeals();
        } catch (error) {
            console.error('Error deleting deal:', error);
        }
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
                <button className="admin-deal-button" type="submit">
                    {editMode ? 'Cập nhật' : 'Thêm'}
                </button>
            </form>

            <h2 className="admin-deals-list-title">Danh sách Deals</h2>
            <ul className="admin-deals-list">
                {deals.map(deal => (
                    <li className="admin-deal-item" key={deal._id}>
                        <h3 className="admin-deal-name">{deal.name}</h3>
                        <p className="admin-deal-description">{deal.description}</p>
                        <p className="admin-deal-price">Giá: {deal.price} ₫</p>
                        <img className="admin-deal-image" src={deal.image_url} alt={deal.name} width="100" />
                        <button className="admin-deal-edit-button" onClick={() => handleEdit(deal)}>Sửa</button>
                        <button className="admin-deal-delete-button" onClick={() => handleDelete(deal._id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDealsManager;
