import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, FolderTree } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Robot Cleaners', description: 'Automated cleaning robots', productCount: 12, icon: '🧹' },
    { id: 2, name: 'Kitchen Robots', description: 'Smart cooking assistants', productCount: 8, icon: '👨‍🍳' },
    { id: 3, name: 'Lawn Care', description: 'Automated lawn maintenance', productCount: 6, icon: '🌱' },
    { id: 4, name: 'Service Robots', description: 'Food and beverage service', productCount: 10, icon: '🍽️' },
    { id: 5, name: 'Smart Home', description: 'Home automation devices', productCount: 9, icon: '🏠' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📦',
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', icon: '📦' });
    }
    setIsModalOpen(true);
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '📦' });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (editingCategory) {
        // Update existing category
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategory.id
              ? { ...cat, ...formData }
              : cat
          )
        );
      } else {
        // Add new category
        const newCategory = {
          id: categories.length + 1,
          ...formData,
          productCount: 0,
        };
        setCategories([...categories, newCategory]);
      }
      handleCloseModal();
    }
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const iconOptions = ['🧹', '👨‍🍳', '🌱', '🍽️', '🏠', '🤖', '⚙️', '📱', '🔧', '✨'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Category Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your products into categories
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => handleOpenModal()}
        >
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} hover={true} className="group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-4xl">{category.icon}</span>
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {category.description}
            </p>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Products
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {category.productCount}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <FolderTree className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Categories Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by creating your first product category
            </p>
            <Button
              variant="primary"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => handleOpenModal()}
            >
              Create Category
            </Button>
          </div>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Robot Cleaners"
            required
            error={errors.name}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Brief description of the category"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-3xl
                    transition-all hover:scale-110
                    ${
                      formData.icon === icon
                        ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              icon={<X className="w-5 h-5" />}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Save className="w-5 h-5" />}
            >
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Summary Stats */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Category Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Categories
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {categories.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Products
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Avg Products/Category
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {categories.length > 0
                ? Math.round(
                    categories.reduce((sum, cat) => sum + cat.productCount, 0) /
                      categories.length
                  )
                : 0}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CategoryManager;