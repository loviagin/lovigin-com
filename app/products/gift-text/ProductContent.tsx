'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-photo-view/dist/react-photo-view.css';
import Link from 'next/link';

export default function ProductContent() {
    const [activeScreenshot, setActiveScreenshot] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    
    const product = {
        id: 'all-banks',
        title: 'All Banks',
        description: 'A simple way to manage all your accounts in one app',
        longDescription: 'All Banks — Your personal finance manager in one app. Tired of switching between apps to track your balances? All Banks helps you manage all your financial accounts in one place — clearly, securely, and beautifully.',
        image: '/projects/all-banks.webp',
        screenshots: [
            '/projects/all-banks/picture1.webp',
            '/projects/all-banks/picture2.webp',
            '/projects/all-banks/picture3.webp',
            '/projects/all-banks/picture4.webp',
        ],
        categories: ['iOS'],
        features: [
            'Manage multiple banks and accounts',
            'Support for all major currencies',
            'Total balance conversion using live exchange rates',
            'Clean navigation and fast access to information',
            'Minimal interface with no ads or clutter',
        ],
        color: '#FF6B6B',
        links: {
            appStore: 'https://apps.apple.com/us/app/all-banks-manage-accouns/id6744983251',
            androidTest: '/products/enroll?project=All+Banks&platform=Android'
        }
    };

    const nextSlide = () => {
        setActiveScreenshot((prev) => (prev + 1) % product.screenshots.length);
    };

    const prevSlide = () => {
        setActiveScreenshot((prev) => (prev - 1 + product.screenshots.length) % product.screenshots.length);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    return (
        <>
            <div className={styles.heroWrapper}>
                <div className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <div className={styles.productHeader}>
                            <Link href="/products" className={styles.backButton}>
                                ← Back to Products
                            </Link>
                            <h1 className={styles.title}>{product.title}</h1>
                            <div className={styles.categories}>
                                {product.categories.map((category, index) => (
                                    <span key={index} className={styles.category} style={{ '--category-color': product.color } as React.CSSProperties}>
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                    <div className={styles.productImage}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.screenshots}>
                    <PhotoProvider>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            className={styles.slider}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            onSwiper={setSwiper}
                            onSlideChange={(swiper) => setActiveScreenshot(swiper.realIndex)}
                        >
                            {product.screenshots.map((screenshot, index) => (
                                <SwiperSlide key={index} className={styles.slide}>
                                    <div 
                                        className={styles.slideBackground}
                                        style={{ 
                                            backgroundImage: `url(${screenshot})`,
                                            filter: 'blur(20px)'
                                        }}
                                    />
                                    <PhotoView src={screenshot}>
                                        <div className={`${styles.imageContainer} ${loadedImages[index] ? styles.loaded : ''}`}>
                                            <Image
                                                src={screenshot}
                                                alt={`${product.title} screenshot ${index + 1}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={index === 0}
                                                onLoad={() => handleImageLoad(index)}
                                                quality={100}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    </PhotoView>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className={styles.thumbnails}>
                            {product.screenshots.map((screenshot, index) => (
                                <div
                                    key={index}
                                    className={`${styles.thumbnail} ${activeScreenshot === index ? styles.active : ''}`}
                                    onClick={() => {
                                        setActiveScreenshot(index);
                                        swiper?.slideTo(index);
                                    }}
                                >
                                    <Image
                                        src={screenshot}
                                        alt={`${product.title} miniatur ${index + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </PhotoProvider>
                </div>

                <div className={styles.details}>
                    <div className={styles.longDescription}>
                        <h2>About the app</h2>
                        <p>{product.longDescription}</p>
                    </div>

                    <div className={styles.features}>
                        <h2>Key features</h2>
                        <div className={styles.featuresGrid}>
                            {product.features.map((feature, index) => (
                                <div key={index} className={styles.feature}>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.links}>
                        <h2>Links</h2>
                        <div className={styles.linksGrid}>
                            {product.links.appStore && (
                                <a href={product.links.appStore} className={styles.link} target="_blank" rel="noopener noreferrer">
                                    App Store
                                </a>
                            )}
                            {product.links.androidTest && (
                                <a href={product.links.androidTest} className={styles.link} target="_blank" rel="noopener noreferrer">
                                    Enroll to Test in Play Market
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isFullscreen && (
                <div className={styles.fullscreenModal} onClick={toggleFullscreen}>
                    <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={toggleFullscreen}>
                            ×
                        </button>
                        <button className={styles.modalPrevButton} onClick={prevSlide}>
                            ←
                        </button>
                        <Image
                            src={product.screenshots[activeScreenshot]}
                            alt={`${product.title} screenshot ${activeScreenshot + 1}`}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                        <button className={styles.modalNextButton} onClick={nextSlide}>
                            →
                        </button>
                    </div>
                </div>
            )}
        </>
    );
} 