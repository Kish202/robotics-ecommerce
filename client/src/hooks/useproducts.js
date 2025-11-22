import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Custom hook for managing products
 * Handles fetching, creating, updating, and deleting products
 */
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.products.getAll(filters);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  // Create product
  const createProduct = async (productData) => {
    try {
      const response = await api.products.create(productData);
      if (response.success) {
        setProducts([...products, response.data]);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    try {
      const response = await api.products.update(id, productData);
      if (response.success) {
        setProducts(products.map((p) => (p.id === id ? response.data : p)));
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const response = await api.products.delete(id);
      if (response.success) {
        setProducts(products.filter((p) => p.id !== id));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Refresh products
  const refresh = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refresh,
  };
};

/**
 * Hook for fetching a single product by ID
 */
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getById(id);
        
        if (response.success) {
          setProduct(response.data);
        } else {
          setError(response.error || 'Product not found');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProducts;