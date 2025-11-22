import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Card from '../common/Card';
import Rating from '../common/Rating';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homemaker',
      image: '👩',
      rating: 5,
      text: 'The RoboClean Pro has completely transformed my daily routine! I can finally spend more quality time with my family instead of worrying about housework. Best investment ever!',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Entrepreneur',
      image: '👨',
      rating: 5,
      text: 'As someone who works long hours, the ChefBot Deluxe has been a game-changer. Coming home to a freshly prepared meal is absolutely incredible. The technology is impressive!',
      location: 'Austin, TX'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Interior Designer',
      image: '👩‍🦰',
      rating: 4.5,
      text: 'I love how these robots seamlessly integrate into my smart home setup. The design is sleek, modern, and they actually look good in my living space. Functionality meets aesthetics!',
      location: 'New York, NY'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Retired Engineer',
      image: '👴',
      rating: 5,
      text: 'I was skeptical at first, but the LawnMaster AI has exceeded all expectations. My lawn has never looked better, and I don\'t have to lift a finger. The engineering is superb!',
      location: 'Seattle, WA'
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Small Business Owner',
      image: '👩‍💼',
      rating: 5,
      text: 'The ServeBot Elite has been perfect for my café. It helps during busy hours and customers love the novelty. It\'s reliable, efficient, and has paid for itself already!',
      location: 'Los Angeles, CA'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Marketing Director',
      image: '👨‍💼',
      rating: 4.5,
      text: 'Smart, efficient, and incredibly user-friendly. The app control is intuitive and the customer support team is always helpful. These robots are worth every penny!',
      location: 'Chicago, IL'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of satisfied customers experiencing the future of home automation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">4.8</div>
            <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">15K+</div>
            <div className="text-gray-600 dark:text-gray-400">5-Star Reviews</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`transform transition-all duration-500 ${
                  index === 1 ? 'scale-105 shadow-2xl' : 'scale-95 opacity-75'
                }`}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <Rating rating={testimonial.rating} size="sm" showNumber />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            <div className="text-4xl">🏢</div>
            <div className="text-4xl">🏪</div>
            <div className="text-4xl">🏥</div>
            <div className="text-4xl">🎓</div>
            <div className="text-4xl">🏨</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;