'use client';

import { useState } from 'react';
import styles from './PriceCalculator.module.css';

type WebsiteType = 'landing' | 'corporate' | 'store';

interface Option {
    id: string;
    label: string;
    price: number;
    maxCount?: number;
}

const baseIncludes = [
    '1 page & 6 sections + Privacy page',
    'Adaptive for tablets & mobile',
];

const basePrice = {
    landing: 800,
    corporate: 1200,
    store: 1500,
};

const additionalOptions: Option[] = [
    { id: 'extra-section', label: '+1 more section', price: 100, maxCount: 10 },
];

const extraFeatures: Option[] = [
    { id: 'live-chat', label: 'Live chat', price: 150, maxCount: 1 },
    { id: 'contact-form', label: 'Contact form', price: 100, maxCount: 1 },
    { id: 'google-map', label: 'Google map', price: 50, maxCount: 1 },
];

const websiteTypeLabels: Record<WebsiteType, string> = {
    landing: 'Landing page',
    corporate: 'Corporate site',
    store: 'Online store'
};

export default function PriceCalculator() {
    const [websiteType, setWebsiteType] = useState<WebsiteType>('landing');
    const [optionCounts, setOptionCounts] = useState<Record<string, number>>({});

    const calculateTotalPrice = () => {
        const base = basePrice[websiteType];
        const optionsPrice = Object.entries(optionCounts).reduce((total, [optionId, count]) => {
            const option = [...additionalOptions, ...extraFeatures].find(opt => opt.id === optionId);
            return total + (option?.price || 0) * count;
        }, 0);

        return base + optionsPrice;
    };

    const updateOptionCount = (optionId: string, increment: boolean) => {
        setOptionCounts(prev => {
            const currentCount = prev[optionId] || 0;
            const option = [...additionalOptions, ...extraFeatures].find(opt => opt.id === optionId);
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
                            {baseIncludes.map((item, index) => (
                                <li key={index} className={styles.includesItem}>
                                    <span>✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${styles.column} ${styles.optionsColumn}`}>
                        <h3 className={styles.columnTitle}>Options</h3>
                        {additionalOptions.map(option => (
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
                        {extraFeatures.map(extra => (
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

                <div className={styles.priceSection}>
                    <div className={styles.priceWrapper}>
                        <div className={styles.price}>${calculateTotalPrice()}</div>
                    </div>
                    <div className={styles.buttonsWrapper}>
                        {/* <button className={styles.actionButton}>Continue to order</button> */}
                        <button className={styles.secondaryButton}>Get the price</button>
                    </div>
                </div>
                <p className={styles.priceNote}>* This price may vary. Discounts apply to large orders.</p>
            </div>
        </section>
    );
} 