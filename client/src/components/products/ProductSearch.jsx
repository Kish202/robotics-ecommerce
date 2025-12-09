import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductSearch = ({ onSearch, searchTerm: propSearchTerm, onClear, placeholder = 'Search products...' }) => {
  const [searchTerm, setSearchTerm] = useState(propSearchTerm || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Sync with prop
  useEffect(() => {
    setSearchTerm(propSearchTerm || '');
  }, [propSearchTerm]);

  // Mock popular searches and recent searches
  const popularSearches = [
    'Robot Cleaners',
    'Kitchen Robots',
    'Lawn Mower',
    'Smart Home',
    'AI Powered',
  ];

  const recentSearches = [
    'RoboClean Pro',
    'ChefBot',
    'Service Robots',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Mock suggestions based on search term
      const mockSuggestions = [
        { id: 1, name: 'RoboClean Pro X1', category: 'Robot Cleaners' },
        { id: 2, name: 'ChefBot Deluxe', category: 'Kitchen Robots' },
        { id: 3, name: 'LawnMaster AI', category: 'Lawn Care' },
        { id: 4, name: 'ServeBot Elite', category: 'Service Robots' },
      ].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    if (term.trim()) {
      onSearch(term);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm('');
    setShowSuggestions(false);
    navigate(`/products/${suggestion.id}`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (onClear) {
      onClear();
    } else {
      onSearch('');
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
        />

        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50">
          {/* Search Results */}
          {searchTerm && suggestions.length > 0 && (
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                SEARCH RESULTS
              </p>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {suggestion.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {suggestion.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchTerm && suggestions.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No products found for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Recent Searches */}
          {!searchTerm && recentSearches.length > 0 && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                RECENT SEARCHES
              </p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(search);
                    handleSearch(search);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!searchTerm && (
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                POPULAR SEARCHES
              </p>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(search);
                    handleSearch(search);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;