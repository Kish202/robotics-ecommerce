import React from 'react';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';

const ProductGrid = ({ 
  products, 
  layout = 'grid', 
  isLoading = false,
  emptyMessage = 'No products found'
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        layout === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-6'
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} layout={layout} />
      ))}
    </div>
  );
};

export default ProductGrid;