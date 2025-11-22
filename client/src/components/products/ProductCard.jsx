import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Rating from '../common/Rating';
import Button from '../common/Button';

const ProductCard = ({ product, layout = 'grid' }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic
    console.log('Added to cart:', product.id);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    // Quick view logic
    console.log('Quick view:', product.id);
  };

  if (layout === 'list') {
    return (
      <Card
        hover={true}
        className="group cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="relative w-full md:w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
              {product.image || '🤖'}
            </div>
            
            {/* Badges */}
            {product.badge && (
              <div className="absolute top-2 left-2">
                <Badge variant={product.badgeVariant || 'primary'}>
                  {product.badge}
                </Badge>
              </div>
            )}

            {product.discount && (
              <div className="absolute top-2 right-2">
                <Badge variant="danger">-{product.discount}%</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {product.name}
                  </h3>
                </div>
                
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full transition-all ${
                    isFavorite
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <Rating rating={product.rating || 0} size="sm" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviews || 0} reviews)
                </span>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through mr-2">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={handleQuickView}
                >
                  Quick View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ShoppingCart className="w-4 h-4" />}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid layout (default)
  return (
    <Card
      hover={true}
      className="group cursor-pointer relative overflow-hidden"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.badge && (
          <Badge variant={product.badgeVariant || 'primary'}>
            {product.badge}
          </Badge>
        )}
        {product.discount && (
          <Badge variant="danger">-{product.discount}%</Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isFavorite
            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 scale-110'
            : 'bg-white/80 text-gray-400 dark:bg-gray-800/80 hover:text-red-600 hover:scale-110'
        }`}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
          {product.image || '🤖'}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            onClick={handleQuickView}
          >
            Quick View
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<ShoppingCart className="w-4 h-4" />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Rating rating={product.rating || 0} size="sm" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>
          
          {product.inStock !== false ? (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-sm text-red-600 dark:text-red-400 font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;