import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Card from './Card';
import AdminProductManager from '../AdminProductManager';
import AdminDealsManager from '../admindeals/AdminDealsManager'; 
import './Dashboard.css';
import { logOut } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const accessToken = user?.accessToken;
    const id = user?._id;
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };

    const [selectedCategory, setSelectedCategory] = useState('overview');

    const renderContent = () => {
        switch (selectedCategory) {
            case 'overview':
                return <Card title="Doanh thu tháng này" content={<p className="admin-revenue">$10,000</p>} />;
            case 'product':
                return <AdminProductManager />; 
            case 'deals':
                return <AdminDealsManager />;
            case 'staff':
                return (
                    <Card title="Danh sách nhân viên" content={
                        <ul className="admin-staff-list">
                            <li>Nguyễn Văn A - Quản lý</li>
                            <li>Trần Thị B - Nhân viên</li>
                        </ul>
                    } />
                );
            case 'customer':
                return <Card title="Tổng số khách hàng" content={<p className="admin-customer-count">300</p>} />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard-container">
            <header className="admin-dashboard-header">
                <h1>Trang quản lý của Huỳnh cute đáng yêu hột me</h1>
                <div className="login-section">
                    {user ? (
                        <Link to='/logout' className="login-button" onClick={handleLogout}>
                            <i className='fas fa-sign-out-alt'></i> Logout
                        </Link>
                    ) : (
                        <Link to='/login' className='login-button1'>
                            <i className='fas fa-user-circle'></i> Sign In
                        </Link>
                    )}
                </div>
            </header>
            <div className="admin-dashboard-body">
                <nav className="admin-dashboard-nav">
                    <h2>Danh Mục</h2>
                    <ul>
                        <li onClick={() => setSelectedCategory('overview')}>Tổng Quan</li>
                        <li onClick={() => setSelectedCategory('product')}>Sản Phẩm</li>
                        <li onClick={() => setSelectedCategory('deals')}>Deals</li>
                        <li onClick={() => setSelectedCategory('staff')}>Nhân Viên</li>
                        <li onClick={() => setSelectedCategory('customer')}>Khách Hàng</li>
                    </ul>
                </nav>
                <div className="admin-dashboard-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
