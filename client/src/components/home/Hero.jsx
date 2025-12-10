import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import FadeCarousel from '../common/FadeCarousel';

const Hero = () => {
  const navigate = useNavigate();

  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1920', // Industrial Robot Arm
      title: 'INTELLIGENT AUTOMATION',
      subtitle: 'Redefining manufacturing precision with next-gen robotics.',
      cta: 'Explore Solutions'
    },
    {
      image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1920', // Medical/Lab Robot
      title: 'HEALTHCARE INNOVATION',
      subtitle: 'Advanced assistance systems for the medical frontier.',
      cta: 'View Medical Bots'
    },
    {
      image: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1920', // Warehouse/Logistics
      title: 'SMART LOGISTICS',
      subtitle: 'Autonomous delivery fleets for the modern supply chain.',
      cta: 'Optimize Now'
    }
  ];

  return (
    <div className="relative h-screen bg-black group">
      <FadeCarousel
        slides={heroSlides}
        interval={6000}
        className="h-full w-full"
        renderSlide={(slide, isActive) => (
          <>
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'
                }`}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                <div className={`transition-all duration-1000 delay-300 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}>
                  <span className="inline-block py-1 px-3 border border-white/30 text-white/80 text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-sm mb-6">
                    Future of Robotics
                  </span>

                  <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-white leading-none tracking-tighter mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-xl sm:text-2xl text-gray-200 font-light tracking-wide max-w-3xl mx-auto mb-10">
                    {slide.subtitle}
                  </p>

                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 border-none px-10 py-4 text-sm font-bold tracking-widest uppercase"
                    onClick={() => navigate('/products')}
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default Hero;