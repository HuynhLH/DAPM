import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './Login.css';
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    // Lấy thông tin lỗi từ Redux
  const error = useSelector((state) => state.auth.login.error); 

  const handleLogin = async (e) => {
      e.preventDefault();
      const newUser = {
          username: username,
          password: password,
      };  
      try {
          await loginUser(newUser, dispatch, navigate);  
      } catch (err) {
          console.error("Login failed:", err); 
      }
  };

  const goBack = () => {
      navigate("/"); 
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
                          required
                      />
                  </div>
                  <div className="input-container">
                      <label htmlFor="password">Mật khẩu</label>
                      <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
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
              {error && <p className="error-message">Sai tài khoản hoặc mật khẩu!</p>} 
              <p className="signup-prompt">
              Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
              </p>
              <button onClick={goBack} className="back-button">Quay về trang trước</button>
          </div>
      </div>
  );
};

export default Login;
