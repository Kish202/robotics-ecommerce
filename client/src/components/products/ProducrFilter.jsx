import React, { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ProductFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    features: true,
  });

  const categories = [
    { id: 'all', name: 'All Products', count: 45 },
    { id: 'cleaners', name: 'Robot Cleaners', count: 12 },
    { id: 'kitchen', name: 'Kitchen Robots', count: 8 },
    { id: 'lawn', name: 'Lawn Care', count: 6 },
    { id: 'service', name: 'Service Robots', count: 10 },
    { id: 'smart-home', name: 'Smart Home', count: 9 },
  ];

  const priceRanges = [
    { id: 'under-500', label: 'Under $500', min: 0, max: 500 },
    { id: '500-1000', label: '$500 - $1,000', min: 500, max: 1000 },
    { id: '1000-1500', label: '$1,000 - $1,500', min: 1000, max: 1500 },
    { id: '1500-2000', label: '$1,500 - $2,000', min: 1500, max: 2000 },
    { id: 'over-2000', label: 'Over $2,000', min: 2000, max: Infinity },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const features = [
    { id: 'ai-powered', name: 'AI Powered' },
    { id: 'voice-control', name: 'Voice Control' },
    { id: 'app-control', name: 'App Control' },
    { id: 'auto-charging', name: 'Auto Charging' },
    { id: 'mapping', name: 'Smart Mapping' },
    { id: 'scheduling', name: 'Scheduling' },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ ...activeFilters, category: categoryId });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ ...activeFilters, priceRange });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...activeFilters, minRating: rating });
  };

  const handleFeatureToggle = (featureId) => {
    const currentFeatures = activeFilters.features || [];
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter((f) => f !== featureId)
      : [...currentFeatures, featureId];
    onFilterChange({ ...activeFilters, features: newFeatures });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.category && activeFilters.category !== 'all') count++;
    if (activeFilters.priceRange) count++;
    if (activeFilters.minRating) count++;
    if (activeFilters.features && activeFilters.features.length > 0) {
      count += activeFilters.features.length;
    }
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

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
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={
                      !activeFilters.category
                        ? category.id === 'all'
                        : activeFilters.category === category.id
                    }
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count}
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
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={activeFilters.priceRange?.id === range.id}
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
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={activeFilters.minRating === rating}
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

      {/* Features Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">Features</h4>
          {expandedSections.features ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.features && (
          <div className="space-y-2">
            {features.map((feature) => (
              <label key={feature.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(activeFilters.features || []).includes(feature.id)}
                  onChange={() => handleFeatureToggle(feature.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.name}
                </span>
              </label>
            ))}
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