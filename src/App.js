import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FlashDeals from './components/FlashDeals';
import Login from './components/login/Login';
import Header from './components/Header';
import Support from './components/Support/Support';

function App() {
  const location = useLocation();  

  const isLoginOrSupport = location.pathname === '/login' || location.pathname === '/support';

  return (
    <div>
      {/* Hiển thị Header và FlashDeals chỉ khi không ở trang đăng nhập hoặc hỗ trợ */}
      {!isLoginOrSupport && <Header />}
      {!isLoginOrSupport && <FlashDeals />}
      {!isLoginOrSupport && <Navbar />}

      <Routes>
        {/* Định nghĩa các route */}
                    
        <Route path="/login" element={<Login />} />         
        <Route path="/navbar" element={<Navbar />} />       
        <Route path="/support" element={<Support />} />    a
      </Routes>
      {/* Footer sẽ luôn hiển thị */}
      <Footer />
    </div>
  );
}

export default App;
