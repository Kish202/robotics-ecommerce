import React from 'react';
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Wifi, 
  Battery, 
  Settings,
  Clock,
  Leaf
} from 'lucide-react';
import Card from '../common/Card';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms that adapt to your home and lifestyle, learning your preferences over time.',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Built-in safety sensors and obstacle detection ensure your family and furniture are protected at all times.',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Smartphone,
      title: 'Smart App Control',
      description: 'Control all your robots from anywhere using our intuitive mobile app with real-time monitoring.',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Wifi,
      title: 'IoT Connectivity',
      description: 'Seamlessly integrate with your smart home ecosystem via WiFi, Bluetooth, and voice assistants.',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: Battery,
      title: 'Long Battery Life',
      description: 'Extended battery capacity with smart charging capabilities ensures uninterrupted operation.',
      color: 'from-indigo-400 to-blue-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      icon: Settings,
      title: 'Easy Maintenance',
      description: 'Self-diagnostic systems and simple maintenance routines keep your robots running smoothly.',
      color: 'from-gray-400 to-slate-500',
      bgColor: 'bg-gray-100 dark:bg-gray-800/30'
    },
    {
      icon: Clock,
      title: 'Scheduled Operations',
      description: 'Set custom schedules and routines to automate your daily tasks exactly when you need them.',
      color: 'from-rose-400 to-red-500',
      bgColor: 'bg-rose-100 dark:bg-rose-900/30'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Design',
      description: 'Energy-efficient motors and sustainable materials reduce environmental impact while saving costs.',
      color: 'from-teal-400 to-green-500',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Robotic Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Cutting-edge technology designed to make your life easier, safer, and more efficient.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                hover={true}
                className="group"
              >
                {/* Icon Container */}
                <div className="mb-6">
                  <div className={`
                    w-16 h-16 ${feature.bgColor} rounded-2xl 
                    flex items-center justify-center 
                    transform group-hover:scale-110 group-hover:rotate-6 
                    transition-all duration-300
                  `}>
                    <Icon className={`w-8 h-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} 
                          style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ready to experience the future of home automation?
          </p>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>Discover All Features</span>
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;