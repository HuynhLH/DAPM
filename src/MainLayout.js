import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecentlyViewed from './components/recentlyViewed/recentlyViewed';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <RecentlyViewed /> 
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
