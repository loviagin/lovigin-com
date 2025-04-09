'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    title: 'Создаем современные digital-решения под ключ',
    subtitle: 'Сайты, мобильные приложения и кастомные разработки для бизнеса',
    description: 'От идеи до реализации - полный цикл разработки с гарантией качества',
    buttonText: 'Оставить заявку',
    stats: [
      { value: '10+', label: 'Лет опыта' },
      { value: '100+', label: 'Успешных проектов' },
      { value: '50+', label: 'Довольных клиентов' }
    ]
  },
  {
    id: 2,
    title: 'Разработка мобильных приложений',
    subtitle: 'iOS и Android приложения для вашего бизнеса',
    description: 'Создаем нативные и кроссплатформенные приложения с учетом всех требований рынка',
    buttonText: 'Узнать подробнее',
    stats: [
      { value: '30+', label: 'Мобильных приложений' },
      { value: '4.8', label: 'Средний рейтинг' },
      { value: '1M+', label: 'Установок' }
    ]
  },
  {
    id: 3,
    title: 'Веб-разработка и дизайн',
    subtitle: 'Современные сайты и веб-приложения',
    description: 'От лендингов до сложных корпоративных порталов с интеграцией любых систем',
    buttonText: 'Посмотреть кейсы',
    stats: [
      { value: '70+', label: 'Веб-проектов' },
      { value: '95%', label: 'Удовлетворенность' },
      { value: '24/7', label: 'Техподдержка' }
    ]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
  }, []);

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

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.slidesContainer}>
          <AnimatePresence initial={false} custom={direction}>
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
              <div className={styles.leftColumn}>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={styles.title}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={styles.subtitle}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={styles.description}
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <button className={styles.ctaButton}>
                    {slides[currentSlide].buttonText}
                  </button>
                </motion.div>
              </div>

              <div className={styles.rightColumn}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={styles.stats}
                >
                  {slides[currentSlide].stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
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