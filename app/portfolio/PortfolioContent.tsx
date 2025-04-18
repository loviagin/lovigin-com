'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { portfolioItems } from './data';
import Link from 'next/link';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

// Get unique tags from all portfolio items
const allTags = Array.from(new Set(portfolioItems.flatMap(item => item.tags)));

export default function PortfolioContent() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'in-progress'>('all');

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleStatusClick = (status: 'all' | 'completed' | 'in-progress') => {
        setSelectedStatus(status);
    };

    const filteredAndSortedItems = [...portfolioItems]
        .filter(item => {
            const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
            const matchesTags = selectedTags.length === 0 || item.tags.some(tag => selectedTags.includes(tag));
            return matchesStatus && matchesTags;
        })
        .sort((a, b) => {
            if (a.status === 'completed' && b.status === 'in-progress') return -1;
            if (a.status === 'in-progress' && b.status === 'completed') return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return (
        <>
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <div className={styles.filterTitle}>Status</div>
                    <div className={styles.statusFilters}>
                        <button
                            className={`${styles.statusFilter} ${selectedStatus === 'all' ? styles.active : ''}`}
                            onClick={() => handleStatusClick('all')}
                        >
                            All
                        </button>
                        <button
                            className={`${styles.statusFilter} ${selectedStatus === 'completed' ? styles.active : ''}`}
                            onClick={() => handleStatusClick('completed')}
                        >
                            Completed
                        </button>
                        <button
                            className={`${styles.statusFilter} ${selectedStatus === 'in-progress' ? styles.active : ''}`}
                            onClick={() => handleStatusClick('in-progress')}
                        >
                            In Progress
                        </button>
                    </div>
                </div>
                <div className={styles.filterGroup}>
                    <div className={styles.filterTitle}>Tags</div>
                    <div className={styles.tagFilters}>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`${styles.tagFilter} ${selectedTags.includes(tag) ? styles.active : ''}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.portfolioGrid}>
                {filteredAndSortedItems.map((item) => (
                    <div key={item.id} className={styles.portfolioItem}>
                        <div className={styles.portfolioImage}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className={`${styles.status} ${styles[item.status]}`}>
                                {item.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </div>
                        </div>
                        <div className={styles.portfolioInfo}>
                            <Link href={`/portfolio/${item.id}`}>
                                <h3 className={styles.portfolioTitle}>{item.title}</h3>
                            </Link>
                            <p className={styles.portfolioDescription}>
                                {item.description}
                            </p>
                            <div className={styles.portfolioDate}>
                                {formatDate(item.date)}
                            </div>
                            <div className={styles.portfolioTags}>
                                {item.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
} 