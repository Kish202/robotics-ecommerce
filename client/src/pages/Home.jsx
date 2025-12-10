import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Industries from '../components/home/Industries';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Industries />
      <Testimonials />
      {/* Newsletter Subscription */}

    </div>
  );
};

export default Home;