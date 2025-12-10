import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mb-8">
            <Mail className="w-10 h-10 text-gray-900 dark:text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated with RoboTech
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest updates on new products,
            exclusive offers, and robotics innovations delivered to your inbox.
          </p>

          {/* Form or Success Message */}
          {isSubmitted ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 inline-block animate-fade-in">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Thank You for Subscribing!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    icon={<Mail className="w-5 h-5" />}
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  icon={!isLoading && <Send className="w-5 h-5" />}
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-2">Exclusive Offers</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get early access to sales and special promotions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-2">Product Launches</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Be the first to know about new robot releases
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-2">Tech Insights</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learn tips and tricks for your robotic devices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;