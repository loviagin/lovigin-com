'use client';

import { useState } from 'react';
import styles from './PriceCalculator.module.css';
import OrderForm from '@/app/components/OrderForm/OrderForm';

type WebsiteType = 'landing' | 'corporate' | 'store';

interface Option {
    id: string;
    label: string;
    price: number;
    maxCount?: number;
}

const baseIncludes: Record<WebsiteType, string[]> = {
    landing: [
        '1 page & 6 sections + Privacy page',
        'A contact form'
    ],
    corporate: [
        '3 pages & 18 sections',
        'A contact form',
        'An order form',
        'Google map',
    ],
    store: [
        'Product catalog',
        'Shopping cart',
        'Payment integration',
        'Admin panel for product management',
    ],
};

const commonFeatures = [
    'SEO setup',
    'Adaptive for tablets & mobile',
    'Speed optimization',
    'Free domain name .com or similar',
    'Tech support for 3 months then by prices',
    'Hosting for the entire period of tech support'
];

const basePrice = {
    landing: 800,
    corporate: 1400,
    store: 2100,
};

const additionalOptions: Record<WebsiteType, Option[]> = {
    landing: [
        { id: 'extra-section', label: '+1 more section', price: 100, maxCount: 10 },
    ],
    corporate: [
        { id: 'extra-page', label: '+1 more unique page & 6 sections', price: 300, maxCount: 10 },
        { id: 'extra-section', label: '+1 more unique section', price: 50, maxCount: 50 },
    ],
    store: [
        { id: 'extra-product', label: '+100 products', price: 200, maxCount: 10 },
        { id: 'product-filters', label: 'Advanced product filters', price: 250, maxCount: 1 },
    ],
};

const extraFeatures: Record<WebsiteType, Option[]> = {
    landing: [
        { id: 'live-chat', label: 'Live chat', price: 150, maxCount: 1 },
        { id: 'payment-integration', label: 'Payment integration', price: 100, maxCount: 1 },
        { id: 'google-map', label: 'Google map', price: 50, maxCount: 1 },
    ],
    corporate: [
        { id: 'live-chat', label: 'Live chat', price: 150, maxCount: 1 },
        { id: 'blog', label: 'Blog section', price: 300, maxCount: 1 },
        { id: 'newsletter', label: 'Newsletter subscription', price: 200, maxCount: 1 },
    ],
    store: [
        { id: 'live-chat', label: 'Live chat', price: 150, maxCount: 1 },
        { id: 'product-reviews', label: 'Product reviews system', price: 200, maxCount: 1 },
        { id: 'wishlist', label: 'Wishlist functionality', price: 150, maxCount: 1 },
        { id: 'loyalty-program', label: 'Loyalty program', price: 300, maxCount: 1 },
    ],
};

const websiteTypeLabels: Record<WebsiteType, string> = {
    landing: 'Landing page',
    corporate: 'Corporate site',
    store: 'Online store'
};

export default function PriceCalculator() {
    const [websiteType, setWebsiteType] = useState<WebsiteType>('landing');
    const [optionCounts, setOptionCounts] = useState<Record<string, number>>({});

    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

    const calculateTotalPrice = () => {
        const base = basePrice[websiteType];
        const optionsPrice = Object.entries(optionCounts).reduce((total, [optionId, count]) => {
            const option = [...additionalOptions[websiteType], ...extraFeatures[websiteType]].find(opt => opt.id === optionId);
            return total + (option?.price || 0) * count;
        }, 0);

        return base + optionsPrice;
    };

    const updateOptionCount = (optionId: string, increment: boolean) => {
        setOptionCounts(prev => {
            const currentCount = prev[optionId] || 0;
            const option = [...additionalOptions[websiteType], ...extraFeatures[websiteType]].find(opt => opt.id === optionId);
            const maxCount = option?.maxCount || 1;

            if (increment && currentCount >= maxCount) return prev;
            if (!increment && currentCount <= 0) return prev;

            return {
                ...prev,
                [optionId]: increment ? currentCount + 1 : currentCount - 1
            };
        });
    };

    const getOptionCount = (optionId: string) => optionCounts[optionId] || 0;

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.selectedType}>{websiteTypeLabels[websiteType]}</h2>
                <div className={styles.typeLineWrapper}>
                    <div className={styles.typeSelector}>
                        {Object.entries(websiteTypeLabels).map(([type, label]) => (
                            <button
                                key={type}
                                className={`${styles.typeButton} ${type === websiteType ? styles.active : ''}`}
                                onClick={() => setWebsiteType(type as WebsiteType)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.typeLine} />
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.calculatorGrid}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Includes:</h3>
                        <ul className={styles.includesList}>
                            {baseIncludes[websiteType].map((item, index) => (
                                <li key={index} className={styles.includesItem}>
                                    <span>✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${styles.column} ${styles.optionsColumn}`}>
                        <h3 className={styles.columnTitle}>Options</h3>
                        {additionalOptions[websiteType].map(option => (
                            <div key={option.id} className={styles.optionItem}>
                                <span className={styles.optionName}>{option.label}</span>
                                <div className={styles.counter}>
                                    <button
                                        className={styles.counterButton}
                                        onClick={() => updateOptionCount(option.id, false)}
                                        disabled={getOptionCount(option.id) === 0}
                                    >
                                        -
                                    </button>
                                    <span className={styles.counterValue}>
                                        {getOptionCount(option.id)}
                                    </span>
                                    <button
                                        className={styles.counterButton}
                                        onClick={() => updateOptionCount(option.id, true)}
                                        disabled={getOptionCount(option.id) === option.maxCount}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Extra</h3>
                        {extraFeatures[websiteType].map(extra => (
                            <div key={extra.id} className={styles.includesItem}>
                                <input
                                    type="checkbox"
                                    id={extra.id}
                                    className={styles.checkbox}
                                    checked={!!optionCounts[extra.id]}
                                    onChange={() => updateOptionCount(extra.id, !optionCounts[extra.id])}
                                />
                                <label htmlFor={extra.id}>{extra.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.commonFeaturesSection}>
                    <h3 className={styles.commonFeaturesTitle}>Common features for all websites:</h3>
                    <div className={styles.commonFeaturesGrid}>
                        {commonFeatures.map((item, index) => (
                            <div key={index} className={styles.commonFeaturesItem}>
                                <span>✓</span> {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.priceSection}>
                    <div className={styles.priceWrapper}>
                        <div className={styles.oldPrice}>${calculateTotalPrice() + 198}</div>
                        <div className={styles.price}>${calculateTotalPrice()}</div>
                    </div>
                    <div className={styles.buttonsWrapper}>
                        {/* <button className={styles.actionButton}>Continue to order</button> */}
                        <button
                            className={styles.secondaryButton}
                            onClick={() => setIsOrderFormOpen(true)}
                        >Get the price</button>
                    </div>
                </div>
                <p className={styles.priceNote}>* This price may vary. Discounts apply to large orders.</p>
            </div>

            {isOrderFormOpen && (
                <OrderForm
                    serviceTitle="Web Development"
                    isOpen={isOrderFormOpen}
                    onClose={() => setIsOrderFormOpen(false)}
                />
            )}
        </section>
    );
} 