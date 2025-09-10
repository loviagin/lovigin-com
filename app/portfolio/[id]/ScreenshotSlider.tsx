'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './page.module.css';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface ScreenshotSliderProps {
    screenshots: string[];
    title: string;
}

export default function ScreenshotSlider({ screenshots, title }: ScreenshotSliderProps) {
    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(screenshots.length).fill(false));

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    return (
        <PhotoProvider>
            <div className={styles.screenshots}>
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
                >
                    {screenshots.map((screenshot, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                            <PhotoView src={screenshot}>
                                <div className={`${styles.imageContainer} ${loadedImages[index] ? styles.loaded : ''}`}>
                                    <Image
                                        src={screenshot}
                                        alt={`${title} screenshot ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                        onLoad={() => handleImageLoad(index)}
                                        quality={100}
                                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                                        unoptimized={screenshot.endsWith('.webp')}
                                    />
                                </div>
                            </PhotoView>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </PhotoProvider>
    );
} 