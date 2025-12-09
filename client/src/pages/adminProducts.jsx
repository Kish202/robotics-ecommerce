import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/adminLayout';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import Modal from '../components/common/Modal';
import api from '../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.products.getAll({ limit: 100 }); // Get all products
      if (response.success) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const response = await api.products.delete(product._id);
        if (response.success) {
          // Remove from local state
          setProducts(products.filter((p) => p._id !== product._id));
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        alert(err.message || 'Failed to delete product');
      }
    }
  };

  const handleView = (product) => {
    window.open(`/products/${product._id}`, '_blank');
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const response = await api.products.update(editingProduct._id, formData);
        if (response.success) {
          setProducts(
            products.map((p) =>
              p._id === editingProduct._id ? response.data : p
            )
          );
        }
      } else {
        // Add new product
        const response = await api.products.create(formData);
        if (response.success) {
          setProducts([...products, response.data]);
        }
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error saving product:', err);
      alert(err.message || 'Failed to save product');
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <AdminLayout>
      {/* Header with Add Button */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        isLoading={isLoading}
        error={error}
      />

      {/* Product Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCancel}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="xl"
      >
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </AdminLayout>
  );
};

export default AdminProducts;