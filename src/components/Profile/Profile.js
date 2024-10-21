import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { useNavigate } from 'react-router-dom'; 
import { logOut } from '../../redux/apiRequest';

const Profile = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSaveChanges = (e) => {
        e.preventDefault();
        alert('Thay đổi đã được lưu!');
        setIsEditable(false); 
    };

    const goBack = () => {
        navigate(-1); // Điều hướng về trang chủ hoặc trang trước
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Thông tin cá nhân</h1>
            {user ? (
                <div className="profile-info">
                    <div className="avatar-container">
                        <img 
                            src={'HINH1.jpg'} // Kiểm tra lại file ảnh của bạn có tồn tại không
                            alt="Avatar" 
                            className="profile-avatar"
                        />
                    </div>
                    <form onSubmit={handleSaveChanges}>
                        <label htmlFor="username">Tên đăng nhập:</label>
                        {isEditable ? (
                            <input 
                                type="text" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="username-input"
                            />
                        ) : (
                            <p className="username-display">{username}</p>
                        )}

                        <label htmlFor="email">Email:</label>
                        {isEditable ? (
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="email-input"
                            />
                        ) : (
                            <p className="email-display">{email}</p>
                        )}

                        {isEditable && (
                            <>
                                <label htmlFor="password">Thay đổi mật khẩu:</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Nhập mật khẩu mới" 
                                    className="password-input"
                                />
                            </>
                        )}

                        <div className="button-group">
                            {isEditable ? (
                                <>
                                    <button type="submit" className='save-button'>Lưu thay đổi</button>
                                    <button type="button" onClick={() => setIsEditable(false)} className='cancel-button'>Hủy</button>
                                </>
                            ) : (
                                <button type="button" onClick={() => setIsEditable(true)} className='edit-button'>Thay đổi</button>
                            )}
                            <button onClick={goBack} className='goback-button'>Quay về trang trước</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <p className="profile-message">Bạn chưa đăng nhập.</p>
                    <button onClick={goBack} className='goback-button'>Quay về trang chính</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
