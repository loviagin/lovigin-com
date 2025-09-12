'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    title: 'Digital Engineering for the Modern World',
    subtitle: 'Innovative digital solutions for forward-thinking businesses',
    description: 'We design and develop smart, scalable digital products that accelerate growth, streamline operations, and keep you ahead of the competition.',
    buttonText: 'Discover More',
    buttonLink: '#about',
    stats: [
      { value: '10+', label: 'Industries served' },
      { value: '300K+', label: 'End users engaged' },
      { value: '100%', label: 'Projects delivered on time' }
    ]
  },
  {
    id: 2,
    title: 'Custom Software That Works for You',
    subtitle: 'Tailored mobile and web apps built around your needs',
    description: 'From concept to launch, we build high-performance platforms that seamlessly integrate into your workflow and evolve with your business.',
    buttonText: 'Start Your Project',
    buttonLink: '#about',
    stats: [
      { value: '30+', label: 'Apps in production' },
      { value: '4.9★', label: 'Average client rating' },
      { value: '100%', label: 'Ongoing support included' }
    ]
  },
  {
    id: 3,
    title: 'AI-Powered Business Solutions',
    subtitle: 'Data-driven automation with real-world impact',
    description: 'We bring artificial intelligence into your operations to cut costs, enhance productivity, and turn data into actionable insights — at scale.',
    buttonText: 'Explore AI Use Cases',
    buttonLink: '#about',
    stats: [
      { value: '10x', label: 'Efficiency boost' },
      { value: '90%', label: 'Less manual workload' },
      { value: '24/7', label: 'Uninterrupted performance' }
    ]
  }
];

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          handlePrevSlide();
        } else if (e.key === 'ArrowRight') {
          handleNextSlide();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextSlide();
    }
    if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  const renderSlide = (slide: typeof slides[0]) => (
    <div 
      className={styles.slide}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.leftColumn}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.title}
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={styles.subtitle}
        >
          {slide.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.description}
        >
          {slide.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href={slide.buttonLink} className={styles.ctaButton}>
            {slide.buttonText}
          </a>
        </motion.div>
      </div>

      <div className={styles.rightColumn}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.stats}
        >
          {slide.stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.slidesContainer}>
          {isMobile ? (
            renderSlide(slides[currentSlide])
          ) : (
            <>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className={styles.slide}
              >
                {renderSlide(slides[currentSlide])}
              </motion.div>
            </>
          )}
        </div>

        <div className={styles.navigation}>
          <button className={styles.arrowButton} onClick={handlePrevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.controls}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.controlDot} ${currentSlide === index ? styles.active : ''}`}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
              />
            ))}
          </div>

          <button className={styles.arrowButton} onClick={handleNextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.background}>
        <div className={styles.gradient} />
      </div>
    </section>
  );
};

export default Hero; 