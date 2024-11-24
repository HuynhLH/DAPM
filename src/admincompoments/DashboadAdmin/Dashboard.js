import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Card from './Card';
import AdminProductManager from '../AdminProductManager';
import AdminDealsManager from '../admindeals/AdminDealsManager';
import UserList from '../adminuserlist/UserList';
import CategoryPage from '../admincaterogy/CategoryPage';
import './Dashboard.css';
import { logOut } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';
import AdminPaymentMethodForm from '../AdminPaymentMethodForm/AdminPaymentMethodForm';
import AdminPaymentHistory from '../adminpayment';


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
            case 'userlist':
                return <UserList/>;
            case 'AdminPaymentMethodForm':
                return <AdminPaymentMethodForm/>;
            case 'category':
                return <CategoryPage />;
            case 'adminpayment':
                return <AdminPaymentHistory/>
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
                        <li onClick={() => setSelectedCategory('userlist')}>Tài khoản User</li>
                        <li onClick={() => setSelectedCategory('category')}>Loại hàng</li>
                        <li onClick={() => setSelectedCategory('adminpayment')}>Lịch sử thanh toán</li>
                        <li onClick={() => setSelectedCategory('AdminPaymentMethodForm')}>Phương Thức Thanh Toán</li>
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
