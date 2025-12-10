import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import FadeCarousel from '../common/FadeCarousel';

const Industries = () => {
    const navigate = useNavigate();

    const allIndustries = [
        {
            image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'HEALTHCARE',
            description: 'Autonomous delivery and disinfection.',
            features: ['Contactless', 'UV Clean']
        },
        {
            image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'RETAIL',
            description: 'Enhancing customer experience.',
            features: ['Scanning', 'Guidance']
        },
        {
            image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'HOSPITALITY',
            description: 'Elevating service standards.',
            features: ['Room Service', 'Delivery']
        },
        {
            image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'MANUFACTURING',
            description: 'Streamlining production lines.',
            features: ['Transport', 'Safety']
        },
        {
            image: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=800', // Logistics
            title: 'LOGISTICS',
            description: 'Optimizing supply chain flow.',
            features: ['Sorting', 'Packing']
        },
        {
            image: 'https://images.pexels.com/photos/3735170/pexels-photo-3735170.jpeg?auto=compress&cs=tinysrgb&w=800', // Education/Campus
            title: 'EDUCATION',
            description: 'Smart campus assistance.',
            features: ['Patrol', 'Guide']
        }
    ];

    // Chunk industries into groups of 3
    const slides = [];
    for (let i = 0; i < allIndustries.length; i += 3) {
        slides.push(allIndustries.slice(i, i + 3));
    }

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                        Sectors
                    </span>
                    <h2 className="text-4xl font-bold text-white uppercase tracking-wider">
                        Industries We Serve
                    </h2>
                </div>

                <div className="h-[500px]">
                    <FadeCarousel
                        slides={slides}
                        interval={6000}
                        className="h-full w-full"
                        renderSlide={(group, isActive) => (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                                {group.map((industry, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative group overflow-hidden border border-white/10 bg-black/50 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${idx * 150}ms` }}
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                                        />

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                            <h3 className="text-2xl font-bold text-white mb-2">{industry.title}</h3>
                                            <p className="text-gray-300 text-sm mb-4">{industry.description}</p>

                                            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                                {industry.features.map((f, i) => (
                                                    <span key={i} className="text-xs border border-white/30 px-2 py-1 rounded text-white/80">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default Industries;
