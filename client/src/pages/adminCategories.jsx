import React from 'react';
import AdminLayout from '../components/admin/adminLayout'
import    CategoryManager from '../components/admin/CategoryManager'

const AdminCategories = () => {
  return (
    <AdminLayout>
      <CategoryManager />
    </AdminLayout>
  );
};

export default AdminCategories;