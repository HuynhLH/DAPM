import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import MainLayout from './MainLayout';  
import NoHeaderLayout from './NoHeaderLayout';  
import Login from './components/login/Login';
import Register from './components/Register';
import Profile from './components/Profile/Profile';
import Support from './components/Support/Support';
import AdminProductManager from './admincompoments/AdminProductManager';
import HeaderFooterlayout from './HeaderFooterlayout';
import { useSelector } from 'react-redux';
import Dashboard from './admincompoments/DashboadAdmin/Dashboard';
import DealsPage from './components/Hasakideals/DealsPage';

function App() {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.login.currentUser); 

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <NoHeaderLayout>
              <Login />
            </NoHeaderLayout>
          }
        />
        <Route
          path="/register"
          element={
            <NoHeaderLayout>
              <Register />
            </NoHeaderLayout>
          }
        />
        <Route
          path="/support"
          element={
            <HeaderFooterlayout>
              <Support />
            </HeaderFooterlayout>
          }
        />
        <Route path="/deals" element={
          <HeaderFooterlayout>
            <DealsPage/>
          </HeaderFooterlayout>
        }
        />
        {currentUser ? (
          <>
            <Route
              path="/profile"
              element={
                <HeaderFooterlayout>
                  <Profile />
                </HeaderFooterlayout>
              }
            />
          </>
        ) : (
          <Route path="*" element={<div>404 Not Found</div>} />
        )}

        {currentUser?.admin ? (
          <Route
            path="/admin"
            element={
              <NoHeaderLayout>
                <Dashboard />
              </NoHeaderLayout>
            }
          />
        ) : null} 

        {/* Trang chính cho tất cả người dùng */}
        <Route path="/" element={<MainLayout><div>Trang chủ</div></MainLayout>} />
      </Routes>
    </div>
  );
}

export default App;
