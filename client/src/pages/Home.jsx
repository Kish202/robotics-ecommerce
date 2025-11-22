import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import  FeaturedProducts from '../components/home/FeaturedProducts';
import  Testimonials
from '../components/home/Testimonials';
import  Newsletter from '../components/home/Newsletter';   

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};

export default Home;