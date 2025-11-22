import React from 'react';
import { Target, Users, Award, Zap, Heart, Globe } from 'lucide-react';
import Card from '../components/common/Card';
import Breadcrumb from '../components/common/Breadcrumb';

const About = () => {
  const breadcrumbItems = [{ label: 'About Us', path: '/about' }];

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing the boundaries of robotics technology',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Premium products built to last',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Eco-friendly design and operations',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', avatar: '👩‍💼' },
    { name: 'Michael Chen', role: 'CTO', avatar: '👨‍💻' },
    { name: 'Emily Rodriguez', role: 'Head of Design', avatar: '👩‍🎨' },
    { name: 'David Thompson', role: 'Lead Engineer', avatar: '👨‍🔧' },
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'RoboTech was born with a vision' },
    { year: '2019', title: 'First Product Launch', description: 'Launched our first robot cleaner' },
    { year: '2021', title: '50K+ Customers', description: 'Reached major milestone' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded to 25 countries' },
    { year: '2024', title: 'Innovation Award', description: 'Recognized for AI technology' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RoboTech
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're on a mission to revolutionize home automation with intelligent robotic solutions
            that make everyday life easier, smarter, and more efficient.
          </p>
        </div>

        {/* Story Section */}
        <Card className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Founded in 2018, RoboTech began with a simple idea: everyone deserves access to
                  advanced robotic technology that genuinely improves their quality of life. What
                  started as a small team of engineers passionate about AI and robotics has grown
                  into a leading innovator in home automation.
                </p>
                <p>
                  Today, we serve over 50,000 customers worldwide, helping families save time and
                  effort with our intelligent robots. From autonomous cleaning to smart cooking
                  assistants, our products combine cutting-edge technology with user-friendly
                  design.
                </p>
                <p>
                  We believe technology should be accessible, reliable, and sustainable. That's why
                  every product we create undergoes rigorous testing and is built with eco-friendly
                  materials and energy-efficient components.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center">
                <div className="text-9xl animate-float">🤖</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card hover={true} className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Our Mission
                </h3>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To empower people worldwide with intelligent robotic solutions that simplify daily
              tasks, save time, and enhance quality of life through innovative AI technology and
              sustainable design practices.
            </p>
          </Card>

          <Card hover={true} className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Our Vision
                </h3>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To become the world's most trusted brand in home robotics, making advanced automation
              accessible to every household and setting new standards for innovation, quality, and
              customer satisfaction.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} hover={true} className="text-center group">
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Icon
                        className={`w-10 h-10 bg-gradient-to-br ${value.color} bg-clip-text text-transparent`}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                  {index !== milestones.length - 1 && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} hover={true} className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    {member.avatar}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Robot Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-sm opacity-90">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;