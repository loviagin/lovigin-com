'use client';

import Link from 'next/link';
import styles from './ProductsContent.module.css';
import { useState, useMemo } from 'react';
import Image from 'next/image';

interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    categories: string[];
    features: string[];
    color: string;
    archived: boolean;
}

const products: Product[] = [
    {
        id: 'swift-reports-hmrc',
        title: 'Swift Reports HMRC – RTI Submissions Made Easy',
        description: 'Production-ready Swift server for HMRC RTI submissions with IRmark calculation',
        image: '/projects/swift-reports-hmrc/screenshot.webp',
        categories: ['Backend', 'Swift'],
        features: ['EPS & FPS Submissions', 'IRmark Calculation', 'XML Canonicalization', 'GovTalk Integration', 'Polling Support'],
        color: '#007AFF',
        archived: false,
    },
    {
        id: 'learnsy',
        title: 'Learnsy – Grow your skills',
        description: 'Learn new skills and share your knowledge',
        image: '/projects/learnsy/screenshot.webp',
        categories: ['iOS'],
        features: ['Search for skills', 'Share your knowledge', 'Learn new skills', 'Chat with other learners'],
        color: '#FF6B0B',
        archived: false,
    },
    {
        id: 'gohood',
        title: 'Go Hood – Smart cities and countries search',
        description: 'Smart search for cities and countries with detailed descriptions of transportation, culture, and other points of interest, as well as districts',
        image: '/projects/gohood/screenshot.webp',
        categories: ['Web'],
        features: ['AI-powered search', 'Detailed descriptions of transportation, culture, and other points of interest', 'Districts search'],
        color: '#FF6B6B',
        archived: false,
    },
    {
        id: 'all-banks',
        title: 'All Banks – Manage Accounts',
        description: 'A simple way to manage all your accounts in one app',
        image: '/projects/all-banks/screenshot.webp',
        categories: ['iOS'],
        features: ['Manage multiple banks and accounts', 'Support for all major currencies', 'Total balance conversion using live exchange rates', 'Clean navigation and fast access to information', 'Minimal interface with no ads or clutter'],
        color: '#FF6B6B',
        archived: false,
    },
    {
        id: 'communa',
        title: 'Communa – Chatting and Friends',
        description: 'The app for chatting in forums and making friends',
        image: '/projects/communa.webp',
        categories: ['iOS'],
        features: ['Forums & Topics', 'Chats & Channels', 'Moments - photo & video posts', 'Find Friends mini app'],
        color: '#FF6B6B',
        archived: true,
    },
];

export default function ProductsContent() {
    const [activeProduct, setActiveProduct] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Get all unique categories
    const allCategories = useMemo(() => {
        const categories = new Set<string>();
        products.forEach(product => {
            product.categories.forEach(category => categories.add(category));
        });
        return Array.from(categories);
    }, []);

    // Filter products based on selected categories
    const filteredProducts = useMemo(() => {
        if (selectedCategories.length === 0) return products;
        return products.filter(product => 
            selectedCategories.some(category => product.categories.includes(category))
        );
    }, [selectedCategories]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className={styles.productsContainer}>
            <div className={styles.filters}>
                <div className={styles.filterTitle}>Categories</div>
                <div className={styles.categoryFilters}>
                    {allCategories.map(category => (
                        <button
                            key={category}
                            className={`${styles.categoryFilter} ${selectedCategories.includes(category) ? styles.active : ''}`}
                            onClick={() => toggleCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.productsGrid}>
                {filteredProducts.filter(product => !product.archived).map((product) => (
                    <div
                        key={product.id}
                        className={`${styles.productCard} ${activeProduct === product.id ? styles.active : ''}`}
                        onMouseEnter={() => setActiveProduct(product.id)}
                        onMouseLeave={() => setActiveProduct(null)}
                        style={{ '--product-color': product.color } as React.CSSProperties}
                    >
                        <div className={styles.productImage}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={400}
                                quality={95}
                                priority={false}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                style={{ 
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            <div className={styles.imageOverlay} />
                        </div>
                        <div className={styles.productInfo}>
                            <div className={styles.productHeader}>
                                <Link href={`/products/${product.id}`}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                </Link>
                                <div className={styles.productCategories}>
                                    {product.categories.map((category, index) => (
                                        <span key={index} className={styles.productCategory}>
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className={styles.productDescription}>{product.description}</p>
                            <div className={styles.productFeatures}>
                                {product.features.map((feature, index) => (
                                    <span key={index} className={styles.feature}>
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 