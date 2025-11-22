import React from 'react';
import      AdminLayout from '../components/admin/adminLayout'
import       MessageViewer from '../components/admin/MessageViewer'

const AdminMessages = () => {
  return (
    <AdminLayout>
      <MessageViewer />
    </AdminLayout>
  );
};

export default AdminMessages;