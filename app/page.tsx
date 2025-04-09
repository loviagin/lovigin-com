import React from 'react';
import Maintenance from './maintenance/page';
import Hero from './components/Hero/Hero';

const Home = () => {
  return (
    <main>
      <Hero />
      <Maintenance />
    </main>
  );
};

export default Home;