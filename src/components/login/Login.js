import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../redux/cartSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const error = useSelector((state) => state.auth.login.error);
  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedUsername && rememberedPassword) {
      setUsername(rememberedUsername);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };

    try {
      await loginUser(newUser, dispatch, navigate);

      const storedCartKey = `cart_${username}`;
      const storedCartAfterLogin = localStorage.getItem(storedCartKey);
      
      if (storedCartAfterLogin) {
        const cartItems = JSON.parse(storedCartAfterLogin);
        cartItems.forEach(item => {
          dispatch(addToCart(item));
        });
      }

      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
      }
      
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
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <label htmlFor="remember">Nhớ tài khoản</label>
            </div>
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
