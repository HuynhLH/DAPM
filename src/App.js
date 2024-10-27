import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './MainLayout';  
import NoHeaderLayout from './NoHeaderLayout';  
import Login from './components/login/Login';
import Register from './components/Register';
import Profile from './components/Profile/Profile';
import Support from './components/Support/Support';
import HeaderFooterlayout from './HeaderFooterlayout';
import { useSelector } from 'react-redux';
import UserCart from './components/UserCart/UserCart';
import Dashboard from './admincompoments/DashboadAdmin/Dashboard';
import DealsPage from './components/Hasakideals/DealsPage';
import HotDeals from './components/HotDeals/HotDeals';
import ProductPage from './components/ProductPage/ProductPage';
import RecentlyViewedPage from './components/RecentlyViewedPage/RecentlyViewedPage';
import ProductDetail from './components/ProductDetail/ProductDetail';


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_public_key'); // Thay bằng public key từ Stripe

function App() {
  const currentUser = useSelector((state) => state.auth.login.currentUser); 

  return (
    <Elements stripe={stripePromise}>
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
          <Route
            path='/hotdeals'
            element={
              <HeaderFooterlayout>
                <HotDeals/>
              </HeaderFooterlayout>
            }
          />
          <Route 
          path='/recentlyViewe' element={
            <HeaderFooterlayout>
              <RecentlyViewedPage/>
            </HeaderFooterlayout>
          }
          />
          <Route
            path='/usercart'
            element={
              <HeaderFooterlayout>
                <UserCart/>
              </HeaderFooterlayout>
            }
          />
          <Route path='/products/:id'
          element={
           <HeaderFooterlayout>
            <ProductDetail/>
           </HeaderFooterlayout>
          }
          />
          <Route 
            path="/deals" 
            element={
              <HeaderFooterlayout>
                <DealsPage/>
              </HeaderFooterlayout>
            } 
          />
          <Route
          path='/produtcpage' element={
            <HeaderFooterlayout>
              <ProductPage/>
            </HeaderFooterlayout>
          }
          />
          <Route
            path="/profile"
            element={
              <HeaderFooterlayout>
                <Profile />
              </HeaderFooterlayout>
            }
          />
          {currentUser?.admin && (
            <Route
              path="/admin"
              element={
                <NoHeaderLayout>
                  <Dashboard />
                </NoHeaderLayout>
              }
            />
          )}
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/" element={<MainLayout><div></div></MainLayout>} />
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
