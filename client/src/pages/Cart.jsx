import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/ShoppingContext';
import Button from '../components/common/Button';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                    Looks like you haven't added any robotic companions to your cart yet.
                </p>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/products')}
                    icon={<ArrowLeft className="w-4 h-4" />}
                >
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Shopping Cart ({cartItems.length} items)
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="flex-1 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item._id || item.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
                        >
                            {/* Product Image */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                {item.thumbnail ? (
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-4xl">{item.image || '🤖'}</div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 w-full text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row justify-between mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                                        <Link to={`/products/${item._id || item.id}`}>{item.name}</Link>
                                    </h3>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1 sm:mt-0">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-center sm:justify-start gap-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors text-gray-600 dark:text-gray-400 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium text-gray-900 dark:text-white w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors text-gray-600 dark:text-gray-400"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item._id || item.id)}
                                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/products')}
                            icon={<ArrowLeft className="w-4 h-4" />}
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear your cart?')) {
                                    clearCart();
                                }
                            }}
                        >
                            Clear Cart
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            Order Summary
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span>
                                    {shipping === 0 ? (
                                        <span className="text-green-600 dark:text-green-400">Free</span>
                                    ) : (
                                        `$${shipping.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tax (8%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            icon={<ArrowRight className="w-5 h-5" />}
                            onClick={() => alert('Checkout functionality coming soon!')}
                        >
                            Proceed to Checkout
                        </Button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <ShoppingBag className="w-4 h-4" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
