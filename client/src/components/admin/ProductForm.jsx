import React, { useState } from 'react';
import { Save, X, Upload, Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ProductForm = ({ product = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    description: product?.description || '',
    tagline: product?.tagline || '',
    stock: product?.stock || '',
    badge: product?.badge || '',
    badgeVariant: product?.badgeVariant || 'primary',
    keyFeatures: product?.keyFeatures || [''],
    images: product?.images || [],
    inStock: product?.inStock !== false,
    aiPowered: product?.aiPowered || false,
    voiceControl: product?.voiceControl || false,
    appControl: product?.appControl || false,
    autoCharging: product?.autoCharging || false,
    smartMapping: product?.smartMapping || false,
    scheduling: product?.scheduling || false,
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Robot Cleaners',
    'Kitchen Robots',
    'Lawn Care',
    'Service Robots',
    'Smart Home',
  ];

  const badgeVariants = [
    { value: 'primary', label: 'Primary (Blue)' },
    { value: 'success', label: 'Success (Green)' },
    { value: 'warning', label: 'Warning (Yellow)' },
    { value: 'danger', label: 'Danger (Red)' },
    { value: 'info', label: 'Info (Cyan)' },
    { value: 'purple', label: 'Purple' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.keyFeatures];
    newFeatures[index] = value;
    setFormData({ ...formData, keyFeatures: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      keyFeatures: [...formData.keyFeatures, ''],
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    setFormData({ ...formData, keyFeatures: newFeatures });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Clean up key features (remove empty ones)
      const cleanedData = {
        ...formData,
        keyFeatures: formData.keyFeatures.filter((f) => f.trim() !== ''),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
      };

      onSave(cleanedData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., RoboClean Pro X1"
                required
                error={errors.name}
              />
            </div>

            <Input
              label="Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Short catchy description"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Detailed product description"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Pricing & Stock */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Pricing & Inventory
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="599.99"
              required
              error={errors.price}
            />

            <Input
              label="Original Price (Optional)"
              name="originalPrice"
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="799.99"
            />

            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="50"
              required
              error={errors.stock}
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Product is in stock
              </span>
            </label>
          </div>
        </Card>

        {/* Badge */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Badge (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Badge Text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g., Best Seller, New Arrival"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Badge Color
              </label>
              <select
                name="badgeVariant"
                value={formData.badgeVariant}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {badgeVariants.map((variant) => (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.badge && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
              <Badge variant={formData.badgeVariant}>{formData.badge}</Badge>
            </div>
          )}
        </Card>

        {/* Key Features */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Key Features
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={addFeature}
            >
              Add Feature
            </Button>
          </div>

          <div className="space-y-3">
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1"
                />
                {formData.keyFeatures.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="md"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => removeFeature(index)}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Features & Capabilities */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Features & Capabilities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="aiPowered"
                checked={formData.aiPowered}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI Powered
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="voiceControl"
                checked={formData.voiceControl}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Voice Control
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="appControl"
                checked={formData.appControl}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                App Control
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="autoCharging"
                checked={formData.autoCharging}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto Charging
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="smartMapping"
                checked={formData.smartMapping}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Smart Mapping
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="scheduling"
                checked={formData.scheduling}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Scheduling
              </span>
            </label>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            icon={<X className="w-5 h-5" />}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={<Save className="w-5 h-5" />}
          >
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;