import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 

    if (username.length < 8 || username.length > 20) {
      setError('Tên đăng nhập phải từ 8 đến 20 ký tự.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    const newUser = {
      email: email,
      password: password,
      username: username
    };
    
    try {
      await registerUser(newUser, dispatch, navigate);
    } catch (err) {
      setError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.'); 
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng Ký</h2>
        {error && <p className="error-message">{error}</p>} 
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Email</label> 
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Mật khẩu</label>
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
        <button onClick={goBack} className='buttongoback1'>Quay về</button>
      </div>
    </div>
  );
};

export default Register;
