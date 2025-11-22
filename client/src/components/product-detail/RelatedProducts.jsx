import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import Card from '../common/Card';
import Button from '../common/Button';

const RelatedProducts = ({ currentProductId, category }) => {
  const navigate = useNavigate();

  // Mock related products
  const relatedProducts = [
    {
      id: 5,
      name: 'RoboClean Max',
      category: 'Robot Cleaners',
      price: 699.99,
      originalPrice: 799.99,
      rating: 4.7,
      reviews: 890,
      image: '🧹',
      badge: 'Upgraded Model',
      badgeVariant: 'primary',
      description: 'Enhanced suction with 4000Pa power',
      discount: 12,
      inStock: true,
      aiPowered: true,
      voiceControl: true,
      appControl: true,
    },
    {
      id: 6,
      name: 'SmartMop Pro',
      category: 'Robot Cleaners',
      price: 449.99,
      rating: 4.5,
      reviews: 654,
      image: '🧼',
      badge: 'Best Value',
      badgeVariant: 'success',
      description: 'Vacuum and mop in one device',
      inStock: true,
      aiPowered: true,
      appControl: true,
    },
    {
      id: 7,
      name: 'RoboClean Compact',
      category: 'Robot Cleaners',
      price: 399.99,
      rating: 4.4,
      reviews: 432,
      image: '🤖',
      badge: 'Compact Design',
      badgeVariant: 'info',
      description: 'Perfect for small spaces',
      inStock: true,
      aiPowered: true,
    },
    {
      id: 8,
      name: 'CleanBot Ultra',
      category: 'Robot Cleaners',
      price: 899.99,
      originalPrice: 1099.99,
      rating: 4.9,
      reviews: 1234,
      image: '✨',
      badge: 'Premium',
      badgeVariant: 'purple',
      description: 'Ultimate cleaning performance',
      discount: 18,
      inStock: true,
      aiPowered: true,
      voiceControl: true,
      appControl: true,
      autoCharging: true,
    },
  ];

  // Filter out current product
  const filteredProducts = relatedProducts.filter(
    (product) => product.id !== currentProductId
  );

  return (
    <div className="py-12">
      <Card>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              You May Also Like
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Similar products that might interest you
            </p>
          </div>

          <Button
            variant="outline"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => navigate(`/products?category=${category}`)}
          >
            View All
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} layout="grid" />
          ))}
        </div>

        {/* Additional CTA */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find what you're looking for?
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/products')}
          >
            Browse All Products
          </Button>
        </div>
      </Card>

      {/* Frequently Bought Together */}
      <Card className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Bought Together
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* This Product */}
          <div className="flex-1 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-6xl">🤖</div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">This Product</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">$599.99</p>
          </div>

          <div className="text-3xl text-gray-400">+</div>

          {/* Accessory 1 */}
          <div className="flex-1 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-6xl">🔋</div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Extra Battery</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">$79.99</p>
          </div>

          <div className="text-3xl text-gray-400">+</div>

          {/* Accessory 2 */}
          <div className="flex-1 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-6xl">🧽</div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Cleaning Kit</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">$29.99</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Price:</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$709.97</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 line-through">$759.97</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                Save $50.00
              </p>
            </div>
          </div>
          <Button variant="primary" size="lg" fullWidth>
            Add All to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};



export default RelatedProducts;