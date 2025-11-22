import React, { useState } from 'react';
import  AdminLayout from '../components/admin/adminLayout'
import  ProductTable  from '../components/admin/ProductTable';
import  ProductForm  from '../components/admin/ProductForm';  
import Modal from '../components/common/Modal';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };

  const handleView = (product) => {
    window.open(`/products/${product.id}`, '_blank');
  };

  const handleSave = (formData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: products.length + 1,
        sales: 0,
        status: 'active',
      };
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <AdminLayout>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
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