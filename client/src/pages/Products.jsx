import React, { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import 
    ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProducrFilter';
import ProductSearch from '../components/products/ProductSearch';
import        ProductComparison from '../components/products/ProductComparison';        
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [layout, setLayout] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [compareProducts, setCompareProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'RoboClean Pro X1',
      category: 'Robot Cleaners',
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.8,
      reviews: 1250,
      image: '🧹',
      badge: 'Best Seller',
      badgeVariant: 'success',
      description: 'Advanced AI navigation with 3000Pa suction power',
      discount: 25,
      inStock: true,
      aiPowered: true,
      voiceControl: true,
      appControl: true,
      autoCharging: true,
      smartMapping: true,
      scheduling: true,
      features: ['AI Navigation', '3000Pa Suction', 'Smart Mapping'],
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
      description: 'Automated cooking with 500+ recipe database',
      inStock: true,
      aiPowered: true,
      voiceControl: true,
      appControl: true,
      scheduling: true,
      features: ['500+ Recipes', 'Voice Control', 'App Integration'],
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
      description: 'Smart lawn mowing with weather adaptation',
      inStock: true,
      aiPowered: true,
      appControl: true,
      smartMapping: true,
      scheduling: true,
      features: ['Weather Adaptive', 'GPS Navigation', 'Rain Sensor'],
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
      description: 'Autonomous food and drink serving assistant',
      inStock: true,
      aiPowered: true,
      voiceControl: false,
      appControl: true,
      features: ['Obstacle Avoidance', 'Tray Capacity 5kg', 'Multi-floor'],
    },
    {
      id: 5,
      name: 'RoboClean Max',
      category: 'Robot Cleaners',
      price: 699.99,
      originalPrice: 799.99,
      rating: 4.7,
      reviews: 890,
      image: '🧹',
      badge: 'Best Value',
      badgeVariant: 'success',
      description: 'Enhanced suction with 4000Pa power',
      discount: 12,
      inStock: true,
      aiPowered: true,
      voiceControl: true,
      appControl: true,
      autoCharging: true,
      smartMapping: true,
      features: ['4000Pa Suction', 'HEPA Filter', 'Pet Hair Specialist'],
    },
    {
      id: 6,
      name: 'SmartMop Pro',
      category: 'Robot Cleaners',
      price: 449.99,
      rating: 4.5,
      reviews: 654,
      image: '🧼',
      description: 'Vacuum and mop in one device',
      inStock: true,
      aiPowered: true,
      appControl: true,
      autoCharging: true,
      features: ['2-in-1 Design', 'Water Tank 300ml', 'Auto Return'],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      result = result.filter((product) => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(
        (product) =>
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max
      );
    }

    // Rating filter
    if (filters.minRating) {
      result = result.filter((product) => product.rating >= filters.minRating);
    }

    // Features filter
    if (filters.features && filters.features.length > 0) {
      result = result.filter((product) =>
        filters.features.every((feature) => {
          const featureMap = {
            'ai-powered': product.aiPowered,
            'voice-control': product.voiceControl,
            'app-control': product.appControl,
            'auto-charging': product.autoCharging,
            'mapping': product.smartMapping,
            'scheduling': product.scheduling,
          };
          return featureMap[feature];
        })
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, filters, searchTerm, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRemoveFromComparison = (productId) => {
    setCompareProducts(compareProducts.filter((p) => p.id !== productId));
  };

  const breadcrumbItems = [{ label: 'Products', path: '/products' }];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the future of home automation
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <ProductSearch onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <ProductFilters
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* Layout Toggle */}
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-2 rounded ${
                      layout === 'grid'
                        ? 'bg-white dark:bg-gray-800 shadow'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    } transition-colors`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-2 rounded ${
                      layout === 'list'
                        ? 'bg-white dark:bg-gray-800 shadow'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    } transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <ProductGrid
              products={filteredProducts}
              layout={layout}
              isLoading={isLoading}
              emptyMessage="No products match your criteria"
            />

            {/* Compare Products Button */}
            {compareProducts.length > 0 && (
              <div className="fixed bottom-6 right-6 z-40">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowComparison(true)}
                  className="shadow-2xl"
                >
                  Compare Products ({compareProducts.length})
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Comparison Modal */}
      <ProductComparison
        products={compareProducts}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onRemoveProduct={handleRemoveFromComparison}
      />
    </div>
  );
};

export default Products;