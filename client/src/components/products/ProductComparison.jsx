import React from 'react';
import { X, Check, Minus } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Rating from '../common/Rating';
import Badge from '../common/Badge';

const ProductComparison = ({ products, isOpen, onClose, onRemoveProduct }) => {
  if (products.length === 0) return null;

  const features = [
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
    { key: 'category', label: 'Category' },
    { key: 'aiPowered', label: 'AI Powered' },
    { key: 'voiceControl', label: 'Voice Control' },
    { key: 'appControl', label: 'App Control' },
    { key: 'autoCharging', label: 'Auto Charging' },
    { key: 'smartMapping', label: 'Smart Mapping' },
    { key: 'scheduling', label: 'Scheduling' },
    { key: 'batteryLife', label: 'Battery Life' },
    { key: 'warranty', label: 'Warranty' },
  ];

  const renderFeatureValue = (product, feature) => {
    switch (feature.key) {
      case 'price':
        return <span className="text-xl font-bold">${product.price}</span>;

      case 'rating':
        return <Rating rating={product.rating || 0} size="sm" showNumber />;

      case 'category':
        return <Badge variant="primary">{typeof product.category === 'object' ? product.category?.name : product.category}</Badge>;

      case 'batteryLife':
        return product.batteryLife || 'N/A';

      case 'warranty':
        return product.warranty || '1 Year';

      default:
        // Boolean features
        if (product[feature.key] === true) {
          return (
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          );
        } else if (product[feature.key] === false) {
          return (
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          );
        }
        return (
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
            <Minus className="w-5 h-5 text-gray-400" />
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Product Comparison">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-900">
                Feature
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-4 min-w-[250px]">
                  <div className="relative">
                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Product Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <div className="text-5xl">{product.image || '🤖'}</div>
                    </div>

                    {/* Product Name */}
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-center">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {typeof product.category === 'object' ? product.category?.name : product.category}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.key}
                className={`
                  border-b border-gray-200 dark:border-gray-700
                  ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                `}
              >
                <td className="p-4 font-medium text-gray-900 dark:text-white sticky left-0 bg-inherit">
                  {feature.label}
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {renderFeatureValue(product, feature)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          View All Products
        </Button>
      </div>
    </Modal>
  );
};


export default ProductComparison;