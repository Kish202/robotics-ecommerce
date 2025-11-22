import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Rating from '../common/Rating';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  // Mock featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'RoboClean Pro X1',
      category: 'Robot Cleaners',
      price: 599.99,
      rating: 4.8,
      reviews: 1250,
      image: '🧹',
      badge: 'Best Seller',
      badgeVariant: 'success',
      description: 'Advanced AI navigation with 3000Pa suction power'
    },
    {
      id: 2,
      name: 'ChefBot Deluxe',
      category: 'Kitchen Robots',
      price: 1299.99,
      rating: 4.9,
      reviews: 890,
      image: '👨‍🍳',
      badge: 'New Arrival',
      badgeVariant: 'primary',
      description: 'Automated cooking with 500+ recipe database'
    },
    {
      id: 3,
      name: 'LawnMaster AI',
      category: 'Lawn Care',
      price: 799.99,
      rating: 4.7,
      reviews: 650,
      image: '🌱',
      badge: 'Top Rated',
      badgeVariant: 'warning',
      description: 'Smart lawn mowing with weather adaptation'
    },
    {
      id: 4,
      name: 'ServeBot Elite',
      category: 'Service Robots',
      price: 899.99,
      rating: 4.6,
      reviews: 420,
      image: '🍽️',
      badge: 'Featured',
      badgeVariant: 'purple',
      description: 'Autonomous food and drink serving assistant'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover our most popular robotic solutions
            </p>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => navigate('/products')}
          >
            View All Products
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              hover={true}
              className="group cursor-pointer relative overflow-hidden"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant={product.badgeVariant}>
                  {product.badge}
                </Badge>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ShoppingCart className="w-4 h-4" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic
                    }}
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Rating rating={product.rating} size="sm" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Browse our complete collection of innovative robotic solutions designed for every aspect of modern living.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/products')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Explore All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;