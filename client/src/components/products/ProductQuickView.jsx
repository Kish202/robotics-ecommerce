import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Check, ArrowRight } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import { useCart } from '../../contexts/ShoppingContext';

const ProductQuickView = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Quick View">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
                        {product.thumbnail ? (
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-9xl">{product.image || '🤖'}</div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            {product.category && (
                                <Badge variant="secondary">
                                    {typeof product.category === 'object' ? product.category.name : product.category}
                                </Badge>
                            )}
                            {product.inStock ? (
                                <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <Check className="w-4 h-4" /> In Stock
                                </span>
                            ) : (
                                <span className="text-sm text-red-600 dark:text-red-400">Out of Stock</span>
                            )}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-4">
                            <Rating rating={product.rating || 0} />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({product.numReviews || 0} reviews)
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${product.price}
                            </span>
                            {product.discountPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${product.discountPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {product.features && (
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                                <ul className="space-y-1">
                                    {product.features.slice(0, 4).map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto flex gap-3">
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            icon={<ShoppingCart className="w-5 h-5" />}
                            onClick={handleAddToCart}
                            disabled={!product.inStock && product.stock === 0}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate(`/products/${product._id || product.id}`)}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductQuickView;
