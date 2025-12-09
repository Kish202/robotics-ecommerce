import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProducrFilter';
import ProductSearch from '../components/products/ProductSearch';
import ProductComparison from '../components/products/ProductComparison';
import ProductQuickView from '../components/products/ProductQuickView';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';
import api from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [sortBy, setSortBy] = useState('-createdAt'); // Backend sort format

  // Initialize filters from URL if present
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    search: searchParams.get('search') || '',
    featured: '',
    inStock: '',
  });

  const [compareProducts, setCompareProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  // Sync filters with URL search param
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null && urlSearch !== filters.search) {
      setFilters(prev => ({
        ...prev,
        search: urlSearch
      }));
    } else if (urlSearch === null && filters.search !== '') {
      // If URL search param is removed, clear filter
      setFilters(prev => ({
        ...prev,
        search: ''
      }));
    }
  }, [searchParams]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.categories.getAll();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with filters from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Build query params for backend
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          sort: sortBy,
        };

        // Add filters to params (only if they have values)
        if (filters.category) params.category = filters.category;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.rating) params.rating = filters.rating;
        if (filters.search) params.search = filters.search;
        if (filters.featured !== '') params.featured = filters.featured;
        if (filters.inStock !== '') params.inStock = filters.inStock;

        const response = await api.products.getAll(params);

        if (response.success) {
          setProducts(response.data);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sortBy, pagination.page]); // Re-fetch when filters/sort/page change

  // Handle filter changes from ProductFilters component
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle search
  const handleSearch = (term) => {
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
    // The useEffect will update the filters state
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      search: '',
      featured: '',
      inStock: '',
    });
    setSortBy('-createdAt');
    setSearchParams({});
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle sort change
  const handleSortChange = (value) => {
    let sortValue = '-createdAt'; // Default

    switch (value) {
      case 'price-low':
        sortValue = 'price';
        break;
      case 'price-high':
        sortValue = '-price';
        break;
      case 'rating':
        sortValue = '-rating';
        break;
      case 'popular':
        sortValue = '-numReviews';
        break;
      case 'newest':
        sortValue = '-createdAt';
        break;
      case 'featured':
        sortValue = '-featured';
        break;
      default:
        sortValue = '-createdAt';
    }

    setSortBy(sortValue);
  };

  // Product comparison functions
  const handleAddToComparison = (product) => {
    if (compareProducts.length >= 4) {
      alert('You can compare up to 4 products at a time');
      return;
    }

    if (compareProducts.find(p => p._id === product._id)) {
      alert('Product already added to comparison');
      return;
    }

    setCompareProducts([...compareProducts, product]);
  };

  const handleRemoveFromComparison = (productId) => {
    setCompareProducts(compareProducts.filter((p) => p._id !== productId));

    if (compareProducts.length === 1) {
      setShowComparison(false);
    }
  };

  const handleClearComparison = () => {
    setCompareProducts([]);
    setShowComparison(false);
  };

  // Pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbItems = [{ label: 'Products', path: '/products' }];

  // Count active filters
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.inStock !== '' ? 1 : 0) +
    (filters.featured !== '' ? 1 : 0);

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
          <ProductSearch
            onSearch={handleSearch}
            searchTerm={filters.search}
            onClear={handleClearSearch}
          />
        </div>

        {/* Active Filters Summary */}
        {activeFilterCount > 0 && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-900 dark:text-blue-100">
                  {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                </span>
              </div>
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'
              }`}
          >
            <ProductFilters
              onFilterChange={handleFilterChange}
              activeFilters={filters}
              categories={categories}
              totalCount={pagination.total}
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
                  <span className="text-sm font-medium">
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">{pagination.total}</span> product{pagination.total !== 1 ? 's' : ''} found
                  {filters.search && (
                    <span className="ml-1">
                      for "<span className="font-medium">{filters.search}</span>"
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* Layout Toggle */}
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-2 rounded ${layout === 'grid'
                      ? 'bg-white dark:bg-gray-800 shadow'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      } transition-colors`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-2 rounded ${layout === 'list'
                      ? 'bg-white dark:bg-gray-800 shadow'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                      } transition-colors`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <ProductGrid
              products={products}
              layout={layout}
              isLoading={isLoading}
              emptyMessage={
                activeFilterCount > 0
                  ? "No products match your search criteria. Try adjusting your filters."
                  : "No products available at the moment."
              }
              onAddToComparison={handleAddToComparison}
              compareProducts={compareProducts}
              onQuickView={setQuickViewProduct}
            />

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.pages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-lg ${pagination.page === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Compare Products Button */}
      {compareProducts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowComparison(true)}
            className="shadow-2xl flex items-center gap-2"
          >
            <span>Compare Products</span>
            <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {compareProducts.length}
            </span>
          </Button>
        </div>
      )}

      {/* Product Comparison Modal */}
      {showComparison && (
        <ProductComparison
          products={compareProducts}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          onRemoveProduct={handleRemoveFromComparison}
          onClearAll={handleClearComparison}
        />
      )}

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Products;






