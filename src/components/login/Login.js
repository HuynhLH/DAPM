import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  // Thêm import axios
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState(''); // Thay đổi từ email thành username
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu trường username trống
        if (!username) {
            alert("Địt mẹ mày ghi tên đăng nhập mày vô!");
            return;
        }

        // Kiểm tra nếu trường password trống
        if (!password) {
            alert("Địt cụ nhà mày ghi mật khẩu mắt mày mù à!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/v1/auth/login', {
                username,
                password,
            });
            console.log('Đăng nhập thành công:', response.data);

            // Lưu thông tin user vào local storage
            localStorage.setItem('user', JSON.stringify(response.data));

            // Điều hướng về trang chủ
            navigate('/');
        } catch (error) {
            console.error('Đăng nhập thất bại:', error.response?.data || error.message);
            alert("Đăng nhập không thành công: " + (error.response?.data || "Có lỗi xảy ra"));
        }
    };   

    const goBack = () => {
        navigate(-1);  
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={false} // Không dùng required mặc định của HTML
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={false} // Không dùng required mặc định của HTML
                        />
                    </div>
                    <div className="login-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Nhớ tài khoản</label>
                        </div>
                        <a href="/forgot-password" className="forgot-password">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" className="login-button">Đăng nhập</button>
                </form>
                <p className="signup-prompt">
                    Chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
