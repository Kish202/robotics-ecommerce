import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/ProtectedRoutes';
import
Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Cart from '../pages/Cart';
import AdminLogin from '../pages/adminPage';
import AdminDashboard from '../pages/adminDashboard';
import AdminProducts from '../pages/adminProducts';
import AdminCategories from '../pages/adminCategories';
import AdminReviews from '../pages/adminReviews';
import AdminMessages from '../pages/adminMessages';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      {/* Admin Login Route (Public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <AdminCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute>
            <AdminReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <AdminMessages />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// 404 Not Found Page Component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-4 animate-bounce">🤖</div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default AppRoutes;