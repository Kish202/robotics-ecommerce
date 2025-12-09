import React, { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Minus,
  Plus
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Rating from '../common/Rating';

import { useCart } from '../../contexts/ShoppingContext';
import { useNavigate } from 'react-router-dom';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Show toast
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart'); // Assuming there is a cart page
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const benefits = [
    { icon: Truck, text: 'Free Shipping on orders over $500', color: 'text-blue-600' },
    { icon: RotateCcw, text: '30-Day Easy Returns', color: 'text-green-600' },
    { icon: Shield, text: '2-Year Warranty Included', color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Category & Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="primary">{typeof product.category === 'object' ? product.category?.name : product.category || 'Robot'}</Badge>
        {product.badge && (
          <Badge variant={product.badgeVariant || 'success'}>{product.badge}</Badge>
        )}
        {product.inStock && (
          <Badge variant="success">In Stock</Badge>
        )}
      </div>

      {/* Product Name */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name || 'Product Name'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {product.tagline || 'Advanced robotic solution for modern living'}
        </p>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <Rating rating={product.rating || 4.5} size="md" showNumber />
        <span className="text-gray-600 dark:text-gray-400">
          ({product.reviews || 0} reviews)
        </span>
        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
          Write a review
        </button>
      </div>

      {/* Price */}
      <div className="py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-4 mb-2">
          {product.originalPrice && (
            <span className="text-2xl text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            ${product.price || '0.00'}
          </span>
          {product.discount && (
            <Badge variant="danger" size="lg">
              Save {product.discount}%
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tax included. Shipping calculated at checkout.
        </p>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          About this product
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {product.description ||
            'Experience cutting-edge robotic technology designed to revolutionize your daily routine. This advanced robot combines artificial intelligence with practical functionality to deliver outstanding performance.'}
        </p>
      </div>

      {/* Key Features */}
      {product.keyFeatures && product.keyFeatures.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Key Features
          </h3>
          <ul className="space-y-2">
            {product.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => handleQuantityChange('decrement')}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-16 text-center font-semibold text-lg">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange('increment')}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.stock || 50} units available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={<ShoppingCart className="w-5 h-5" />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="md"
            fullWidth
            icon={<Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-600' : ''}`} />}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? 'Saved' : 'Save'}
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            icon={<Share2 className="w-5 h-5" />}
            onClick={handleShare}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${benefit.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {benefit.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-around py-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl mb-1">🔒</div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Secure Payment</span>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-1">✅</div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Verified Seller</span>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-1">🏆</div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Best Quality</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;