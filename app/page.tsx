import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import PortfolioShowcase from './components/PortfolioShowcase/PortfolioShowcase';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <PortfolioShowcase />
    </main>
  );
};

export default Home;