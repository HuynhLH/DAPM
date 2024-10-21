import React from 'react';
import Header from './components/Header';
import FlashDeals from './components/FlashDeals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <FlashDeals />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
