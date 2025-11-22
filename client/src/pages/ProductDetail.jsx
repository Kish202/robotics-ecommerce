import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  ImageGallery from '../components/product-detail/ImageGallery';
import ProductInfo from '../components/product-detail/Productinfo';
import ProductSpecs from '../components/product-detail/Productspecs';
import VideoDemo from      '../components/product-detail/VideoDemo';
import Reviews from '../components/product-detail/Reviews';
import RelatedProducts from '../components/product-detail/RelatedProducts';  
import Breadcrumb from '../components/common/Breadcrumb';
import Spinner from '../components/common/Spinner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: parseInt(id),
    name: 'RoboClean Pro X1',
    category: 'Robot Cleaners',
    tagline: 'The smartest way to clean your home',
    price: 599.99,
    originalPrice: 799.99,
    discount: 25,
    rating: 4.8,
    reviews: 1250,
    image: '🧹',
    badge: 'Best Seller',
    badgeVariant: 'success',
    description:
      'Experience the future of home cleaning with RoboClean Pro X1. Featuring advanced AI navigation, powerful 3000Pa suction, and smart mapping technology, this robot cleaner adapts to your home and delivers exceptional cleaning performance on all floor types.',
    stock: 45,
    inStock: true,
    aiPowered: true,
    voiceControl: true,
    appControl: true,
    autoCharging: true,
    smartMapping: true,
    scheduling: true,
    keyFeatures: [
      'Advanced AI-powered navigation system',
      '3000Pa powerful suction for deep cleaning',
      'Smart mapping with multi-floor support',
      'Voice control via Alexa, Google Assistant, and Siri',
      'Mobile app with real-time monitoring',
      'Automatic return to charging dock',
      'HEPA filter for allergen capture',
      'Ultra-quiet operation at 55dB',
    ],
    images: [
      { id: 1, url: '🧹', alt: 'Front view' },
      { id: 2, url: '⚙️', alt: 'Components' },
      { id: 3, url: '🔧', alt: 'Maintenance' },
      { id: 4, url: '📱', alt: 'App control' },
    ],
    specs: {
      general: [
        { label: 'Model Number', value: 'RCP-X1-2024' },
        { label: 'Release Date', value: 'January 2024' },
        { label: 'Manufacturer', value: 'RoboTech Industries' },
        { label: 'Warranty', value: '2 Years Limited' },
        { label: 'Color Options', value: 'Black, White, Silver' },
      ],
      technical: [
        { label: 'Processor', value: 'AI Neural Engine 3.0' },
        { label: 'Sensors', value: 'Multi-directional LiDAR, Cliff Detection' },
        { label: 'Navigation', value: 'Smart Mapping & Path Planning' },
        { label: 'Suction Power', value: '3000Pa' },
        { label: 'Battery Type', value: 'Lithium-ion 5200mAh' },
        { label: 'Battery Life', value: 'Up to 3 hours' },
        { label: 'Charging Time', value: '3-4 hours' },
        { label: 'Noise Level', value: '55 dB (Quiet Mode)' },
      ],
      features: [
        { label: 'Voice Control', value: 'Alexa, Google Assistant, Siri' },
        { label: 'App Control', value: 'iOS & Android' },
        { label: 'Auto-Resume', value: 'Yes' },
        { label: 'Schedule Cleaning', value: 'Yes' },
        { label: 'Multi-Floor Mapping', value: 'Up to 5 floors' },
        { label: 'No-Go Zones', value: 'Virtual barriers supported' },
        { label: 'Carpet Detection', value: 'Automatic boost' },
        { label: 'Filter Type', value: 'HEPA H13' },
      ],
      dimensions: [
        { label: 'Height', value: '3.5 inches (9 cm)' },
        { label: 'Diameter', value: '13.5 inches (34 cm)' },
        { label: 'Weight', value: '8.5 lbs (3.85 kg)' },
        { label: 'Dustbin Capacity', value: '600 ml' },
        { label: 'Water Tank', value: '300 ml' },
      ],
    },
    videos: [
      {
        id: 1,
        title: 'Product Overview',
        description: 'Complete walkthrough of features',
        thumbnail: '🎬',
        duration: '3:45',
      },
      {
        id: 2,
        title: 'Setup Guide',
        description: 'Easy step-by-step installation',
        thumbnail: '🔧',
        duration: '2:30',
      },
      {
        id: 3,
        title: 'Advanced Features',
        description: 'Pro tips and tricks',
        thumbnail: '⚡',
        duration: '4:15',
      },
    ],
  };

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);
    }, 500);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The product you're looking for doesn't exist
          </p>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: product.category, path: `/products?category=${product.category}` },
    { label: product.name, path: `/products/${product.id}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Image Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Right: Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Tabs Section */}
        <div className="space-y-8">
          {/* Technical Specifications */}
          <ProductSpecs specs={product.specs} />

          {/* Video Demonstrations */}
          <VideoDemo videos={product.videos} />

          {/* Customer Reviews */}
          <Reviews productId={product.id} />
        </div>

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
