import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Rating from '../common/Rating';
import Spinner from '../common/Spinner';
import FadeCarousel from '../common/FadeCarousel';
import api from '../../services/api';
import { useCart } from '../../contexts/ShoppingContext';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.products.getFeatured();
        if (response.success) {
          setFeaturedProducts(response.data);
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message || 'Failed to load featured products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);


  return (
    <section className="py-0 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="w-full">
        {/* Section Header - Kept in container for alignment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-end">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              Our Solutions
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              PRODUCT CATALOG
            </h2>
          </div>

          <Button
            variant="outline"
            className="hidden md:flex border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/products')}
          >
            View Full Catalog
          </Button>
        </div>

        {/* Product Carousel - Full Width */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No products available.
            </p>
          </div>
        ) : (
          <div className="relative bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
            <FadeCarousel
              slides={featuredProducts}
              interval={7000}
              className="h-[700px]"
              showIndicators={true}
              renderSlide={(product, isActive) => (
                <div className="flex flex-col lg:flex-row h-full w-full">
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative bg-white dark:bg-gray-900 flex items-center justify-center p-8 lg:p-16 overflow-hidden">
                    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 transform ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                      }`}>
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain drop-shadow-2xl"
                        />
                      ) : (
                        <div className="text-9xl">
                          {product.category?.icon || '🤖'}
                        </div>
                      )}
                    </div>

                    {/* Floating Badge */}
                    {product.featured && (
                      <div className="absolute top-8 left-8">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-8 lg:p-24 flex flex-col justify-center bg-gray-50 dark:bg-gray-800">
                    <div className={`transition-all duration-1000 delay-300 transform ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                      }`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                          {product.category?.name || 'Series'}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        <Rating rating={product.rating} size="sm" />
                      </div>

                      <h3 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {product.name}
                      </h3>

                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 line-clamp-3 leading-relaxed max-w-xl">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-8 mb-10">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${product.discountPrice || product.price}
                          </p>
                        </div>
                        <div className="h-10 w-px bg-gray-300 dark:bg-gray-600"></div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stock</p>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="font-medium text-gray-900 dark:text-white">Available</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-fit px-10 py-4"
                        icon={<ArrowRight className="w-5 h-5" />}
                        onClick={() => navigate(`/products/${product._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        )}

        <div className="mt-8 text-center md:hidden px-4 pb-12">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => navigate('/products')}
          >
            View Full Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;