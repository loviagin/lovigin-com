'use client';

import Link from 'next/link';
import styles from './ProductsContent.module.css';
import { useState, useMemo } from 'react';

interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    categories: string[];
    features: string[];
    color: string;
}

const products: Product[] = [
    {
        id: 'communa',
        title: 'Communa – Chatting and Friends',
        description: 'The app for chatting in forums and making friends',
        image: '/projects/communa.webp',
        categories: ['iOS'],
        features: ['Forums & Topics', 'Chats & Channels', 'Moments - photo & video posts', 'Find Friends mini app'],
        color: '#FF6B6B',
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
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className={`${styles.productCard} ${activeProduct === product.id ? styles.active : ''}`}
                        onMouseEnter={() => setActiveProduct(product.id)}
                        onMouseLeave={() => setActiveProduct(null)}
                        style={{ '--product-color': product.color } as React.CSSProperties}
                    >
                        <div className={styles.productImage}>
                            <img src={product.image} alt={product.title} />
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