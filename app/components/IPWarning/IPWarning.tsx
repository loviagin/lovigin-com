'use client';

import { useState, useEffect } from 'react';
import styles from './IPWarning.module.css';

export default function IPWarning() {
    const [showWarning, setShowWarning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIP = async () => {
            try {
                const response = await fetch('/api/check-ip');
                const data = await response.json();

                if (data.isRussianIP) {
                    setShowWarning(true);
                }
            } catch (error) {
                console.error('Error checking IP:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkIP();
    }, []);

    if (isLoading || !showWarning) return null;

    return (
        <div className={styles.warning}>
            <div className={styles.content}>
                <p>It seems you are trying to access the site from an unsupported region</p>
                <button
                    className={styles.closeButton}
                    onClick={() => setShowWarning(false)}
                >
                    X
                </button>
            </div>
        </div>
    );
} 