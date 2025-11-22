import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Main Content - Add padding-top to account for fixed navbar */}
      <main className="flex-grow pt-20">
 <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;