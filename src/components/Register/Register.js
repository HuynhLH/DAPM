// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import './Register.css'; // Nhớ nhập file CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const result = await registerUser(username, password);
    console.log(result);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng Ký</h2>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label>Username</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Đăng Ký</button>
        </form>
        <p className="signup-prompt">
          Đã có tài khoản? <a href="/login">Đăng Nhập</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
