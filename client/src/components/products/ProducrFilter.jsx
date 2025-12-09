import React, { useState, useEffect } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ProductFilters = ({ onFilterChange, activeFilters = {}, categories = [], products = [], totalCount = 0 }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    stock: true,
  });

  const [categoryCounts, setCategoryCounts] = useState({});

  // Calculate category counts from products
  useEffect(() => {
    if (products.length > 0) {
      const counts = {};
      products.forEach(product => {
        const catId = product.category?._id || product.category;
        const catName = product.category?.name || 'Unknown';
        if (catId) {
          counts[catId] = (counts[catId] || 0) + 1;
        }
      });
      setCategoryCounts(counts);
    }
  }, [products]);

  const priceRanges = [
    { id: 'under-500', label: 'Under $500', min: 0, max: 500 },
    { id: '500-1000', label: '$500 - $1,000', min: 500, max: 1000 },
    { id: '1000-1500', label: '$1,000 - $1,500', min: 1000, max: 1500 },
    { id: '1500-2000', label: '$1,500 - $2,000', min: 1500, max: 2000 },
    { id: 'over-2000', label: 'Over $2,000', min: 2000, max: 10000 },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle category change - send category ID to backend
  const handleCategoryChange = (categoryId) => {
    onFilterChange('category', categoryId === 'all' ? '' : categoryId);
  };

  // Handle price change - send min/max to backend
  const handlePriceChange = (range) => {
    if (range) {
      onFilterChange('minPrice', range.min);
      onFilterChange('maxPrice', range.max === 10000 ? '' : range.max);
    } else {
      onFilterChange('minPrice', '');
      onFilterChange('maxPrice', '');
    }
  };

  // Handle rating change - send to backend
  const handleRatingChange = (rating) => {
    onFilterChange('rating', rating || '');
  };

  // Handle in stock filter
  const handleInStockChange = (checked) => {
    onFilterChange('inStock', checked ? 'true' : '');
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange('category', '');
    onFilterChange('minPrice', '');
    onFilterChange('maxPrice', '');
    onFilterChange('rating', '');
    onFilterChange('inStock', '');
    onFilterChange('search', '');
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.category) count++;
    if (activeFilters.minPrice || activeFilters.maxPrice) count++;
    if (activeFilters.rating) count++;
    if (activeFilters.inStock) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Get current price range ID
  const getCurrentPriceRangeId = () => {
    if (!activeFilters.minPrice && !activeFilters.maxPrice) return null;

    const min = Number(activeFilters.minPrice) || 0;
    const max = Number(activeFilters.maxPrice) || 10000;

    const range = priceRanges.find(r => r.min === min && (r.max === max || (r.max === 10000 && !activeFilters.maxPrice)));
    return range?.id || null;
  };

  return (
    <Card className="sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="primary">{activeFilterCount}</Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">Category</h4>
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {/* All Products Option */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={!activeFilters.category}
                  onChange={() => handleCategoryChange('all')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  All Products
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalCount || products.length}
              </span>
            </label>

            {/* Category Options from Backend */}
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={activeFilters.category === category._id}
                    onChange={() => handleCategoryChange(category._id)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.productCount || categoryCounts[category._id] || 0}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">Price Range</h4>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-2">
            {/* Clear Price Filter */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={!activeFilters.minPrice && !activeFilters.maxPrice}
                onChange={() => handlePriceChange(null)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Any Price
              </span>
            </label>

            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={getCurrentPriceRangeId() === range.id}
                  onChange={() => handlePriceChange(range)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">
            Minimum Rating
          </h4>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {/* Clear Rating Filter */}
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={!activeFilters.rating}
                onChange={() => handleRatingChange(null)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Any Rating
              </span>
            </label>

            {ratings.map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={Number(activeFilters.rating) === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">& Up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* In Stock Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('stock')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">Availability</h4>
          {expandedSections.stock ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.stock && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFilters.inStock === 'true'}
                onChange={(e) => handleInStockChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                In Stock Only
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          fullWidth
          icon={<X className="w-4 h-4" />}
          onClick={clearAllFilters}
        >
          Clear All Filters
        </Button>
      )}
    </Card>
  );
};

export default ProductFilters;