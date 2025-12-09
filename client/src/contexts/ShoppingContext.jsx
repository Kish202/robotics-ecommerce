import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/uselocalstorage';

/**
 * Cart Context
 * Manages shopping cart state globally
 */
const CartContext = createContext(undefined);

/**
 * CartProvider component
 * Manages cart state and operations
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper to get product ID
  const getProductId = (product) => product._id || product.id;

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const productId = getProductId(product);
      const existingItem = prevItems.find((item) => getProductId(item) === productId);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => getProductId(item) !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        getProductId(item) === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => getProductId(item) === productId);
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to use the cart context
 * @throws {Error} if used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
export default CartContext;
