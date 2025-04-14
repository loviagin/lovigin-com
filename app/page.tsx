import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
    </main>
  );
};

export default Home;