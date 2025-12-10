import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Card from '../common/Card';
import Rating from '../common/Rating';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: 'The RoboClean Pro has completely transformed my daily routine! I can finally spend more quality time with my family instead of worrying about housework. Best investment ever!',
    },
    {
      id: 2,
      rating: 5,
      text: 'As someone who works long hours, the ChefBot Deluxe has been a game-changer. Coming home to a freshly prepared meal is absolutely incredible. The technology is impressive!',
    },
    {
      id: 3,
      rating: 4.5,
      text: 'I love how these robots seamlessly integrate into my smart home setup. The design is sleek, modern, and they actually look good in my living space. Functionality meets aesthetics!',
    },
    {
      id: 4,
      rating: 5,
      text: 'I was skeptical at first, but the LawnMaster AI has exceeded all expectations. My lawn has never looked better, and I don\'t have to lift a finger. The engineering is superb!',
    },
    {
      id: 5,
      rating: 5,
      text: 'The ServeBot Elite has been perfect for my café. It helps during busy hours and customers love the novelty. It\'s reliable, efficient, and has paid for itself already!',
    },
    {
      id: 6,
      rating: 4.5,
      text: 'Smart, efficient, and incredibly user-friendly. The app control is intuitive and the customer support team is always helpful. These robots are worth every penny!',
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
            <span className="block text-gray-500 dark:text-gray-400">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of satisfied customers experiencing the future of home automation
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`transition-all duration-500 border border-gray-100 dark:border-gray-800 ${index === 1 ? 'shadow-lg' : 'opacity-75'
                  }`}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Quote className="w-6 h-6 text-gray-400 dark:text-gray-500" />
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
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-gray-900 dark:bg-white'
                  : 'w-4 bg-gray-300 dark:bg-gray-600'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;