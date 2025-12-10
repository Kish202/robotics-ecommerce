import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';
import Button from '../common/Button';
import VideoPlayer from '../common/VideoPlayer';

const ProductShowcase = () => {
    const navigate = useNavigate();

    const products = [
        {
            id: 'roboclean-pro-x1',
            name: 'RoboClean Pro X1',
            subtitle: 'The Ultimate Floor Care Solution',
            description: 'Experience the pinnacle of automated cleaning with the RoboClean Pro X1. Equipped with advanced LiDAR navigation and AI obstacle avoidance, it maps your home with millimeter precision. Its 3000Pa suction power ensures deep cleaning on all surfaces, while the self-emptying base station provides weeks of hands-free maintenance.',
            features: [
                'Advanced LiDAR Navigation & Mapping',
                '3000Pa Hyper-Suction Technology',
                'Auto-Empty Base Station (Holds 60 Days of Dust)',
                'AI Obstacle Avoidance & Pet Detection'
            ],
            videoUrl: 'https://videos.pexels.com/video-files/4101509/4101509-hd_1920_1080_25fps.mp4',
            poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            align: 'left'
        },
        {
            id: 'chefbot-deluxe',
            name: 'ChefBot Deluxe',
            subtitle: 'Your Personal 5-Star Chef',
            description: 'Revolutionize your kitchen experience with ChefBot Deluxe. This intelligent culinary assistant can chop, slice, dice, and cook complete meals with precision. Pre-loaded with over 500 gourmet recipes, it handles the tedious prep work so you can enjoy the art of dining. Features a 10-inch touchscreen for easy interaction and recipe customization.',
            features: [
                'Precision Automated Chopping & Slicing',
                '500+ Built-in Gourmet Recipes',
                'Smart Ingredient Recognition',
                'Self-Cleaning Cycle & Dishwasher Safe Parts'
            ],
            videoUrl: 'https://videos.pexels.com/video-files/3196344/3196344-hd_1920_1080_25fps.mp4',
            poster: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
            align: 'right'
        }
    ];

    return (
        <section className="w-full bg-white dark:bg-gray-900">
            {products.map((product, index) => (
                <div
                    key={index}
                    className={`relative w-full py-32 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-black'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${product.align === 'right' ? 'lg:flex-row-reverse' : ''
                            }`}>

                            {/* Visual Section */}
                            <div className="w-full lg:w-3/5">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-black">
                                        <VideoPlayer
                                            src={product.videoUrl}
                                            poster={product.poster}
                                            className="w-full aspect-video object-cover"
                                        />
                                    </div>

                                    {/* Floating Tech Specs */}
                                    <div className={`absolute -bottom-6 ${product.align === 'right' ? '-left-6' : '-right-6'} hidden lg:block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 max-w-xs`}>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Key Specs</h4>
                                        <div className="space-y-2">
                                            {product.features.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full lg:w-2/5 space-y-8">
                                <div>
                                    <div className="inline-block mb-4">
                                        <span className="py-1 px-2 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase rounded">
                                            Flagship Series
                                        </span>
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                                        {product.name}
                                    </h2>
                                    <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
                                        {product.subtitle}
                                    </p>
                                </div>

                                <div className="h-px w-20 bg-blue-600"></div>

                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="pt-6">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 uppercase tracking-widest text-xs font-bold px-8 py-4"
                                        onClick={() => navigate('/products')}
                                    >
                                        Discover More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ProductShowcase;
