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
import Dashboard from './admincompoments/DashboadAdmin/Dashboard';
import DealsPage from './components/Hasakideals/DealsPage';
import HotDeals from './components/HotDeals/HotDeals';
import ProductPage from './components/ProductPage/ProductPage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import RecentlyViewedPage from './components/RecentlyViewedPage/RecentlyViewedPage';
import Cart from './components/Cart/Cart';
import Guide from './components/Guide/Guide';
import Order from './components/Order/Order';
import ShippingForm from './components/ShippingForm/ShippingForm';
import PaymentResult from './components/PaymentResult/PaymentResult';


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_public_key'); 

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
            path="/recentlyviewpage"
            element={
              <HeaderFooterlayout>
                <RecentlyViewedPage />
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
            path='/cart'
            element={
              <HeaderFooterlayout>
                <Cart/>
              </HeaderFooterlayout>
            }
          />
                      <Route
            path='/shipping'
            element={
              <HeaderFooterlayout>
                <ShippingForm/>
              </HeaderFooterlayout>
            }
          />
          <Route
            path='/order'
            element={
              <HeaderFooterlayout>
                <Order/>
              </HeaderFooterlayout>
            }
          />
          <Route
            path='/guide'
            element={
              <HeaderFooterlayout>
                <Guide/>
              </HeaderFooterlayout>
            }
          />
          <Route path='payment-result' element={<NoHeaderLayout>
          <PaymentResult/>
          </NoHeaderLayout>}
          />
          <Route 
            path="/deals" 
            element={
              <HeaderFooterlayout>
                <DealsPage/>
              </HeaderFooterlayout>
            } 
          />
          <Route path='/product/:id'
          element={
            <HeaderFooterlayout>
              <ProductDetail/>
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
