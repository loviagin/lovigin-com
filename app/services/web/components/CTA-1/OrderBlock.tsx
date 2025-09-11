'use client';

import styles from './OrderBlock.module.css';
import { useEffect, useState } from 'react';
import OrderForm from '@/app/components/OrderForm/OrderForm';

function getTimeUntilEndOfDay() {
    const now = new Date();
    const targetDate = new Date(2025, 4, 7, 23, 59, 59); // April 27, 2024 at 23:59:59

    if (now > targetDate) {
        return null;
    }

    const diff = targetDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

export default function OrderBlock() {
    const [timeLeft, setTimeLeft] = useState(getTimeUntilEndOfDay());
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

    function AnimatedStats() {
        const [conversion, setConversion] = useState(0);
        const [leads, setLeads] = useState(0);
        const [aov, setAov] = useState(0);

        useEffect(() => {
            const targetConversion = 72;
            const targetLeads = 1500;
            const targetAov = 2120;

            const durationMs = 1200;
            const steps = 60;
            const interval = Math.floor(durationMs / steps);
            let tick = 0;

            const timer = setInterval(() => {
                tick += 1;
                const progress = Math.min(tick / steps, 1);
                setConversion(Math.round(targetConversion * progress));
                setLeads(Math.round(targetLeads * progress));
                setAov(Math.round(targetAov * progress));
                if (progress >= 1) clearInterval(timer);
            }, interval);

            return () => clearInterval(timer);
        }, []);

        return (
            <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statDot} />
                        Conversion rate
                    </div>
                    <div className={styles.progressWrap}>
                        <div className={styles.progressTrack}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${conversion}%` }}
                            />
                        </div>
                        <div className={styles.statValue}>{conversion}%</div>
                    </div>
                </div>

                <div className={styles.statGrid}>
                    <div className={styles.statMini}>
                        <div className={styles.statLabel}>Leads / month</div>
                        <div className={styles.statNumber}>{leads}</div>
                        <div className={styles.sparkline}>
                            <span className={styles.sparklineFill} />
                        </div>
                    </div>
                    <div className={styles.statMini}>
                        <div className={styles.statLabel}>Avg. order</div>
                        <div className={styles.statNumber}>${aov}</div>
                        <div className={styles.sparkline}>
                            <span className={styles.sparklineFillAlt} />
                        </div>
                    </div>
                </div>

                <div className={styles.kpis}>
                    <div className={styles.kpiItem}>
                        <span className={styles.kpiBadge}>SEO</span>
                        <span className={styles.kpiText}>Top-10 keywords growing</span>
                    </div>
                    <div className={styles.kpiItem}>
                        <span className={styles.kpiBadge}>Sessions</span>
                        <span className={styles.kpiText}>Duration +60%</span>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeUntilEndOfDay());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.container} id='cta-1'>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.leftColumn}>
                    <h2 className={styles.title}>Empower <span className={styles.subtitle}>your business</span> with a modern digital solution</h2>

                        <div className={styles.timeEstimate}>
                            {timeLeft ? (
                                <>
                                    Until the end of the week - discount on all sites{' '}
                                    <span className={styles.timeBoxes}>
                                        <span className={styles.timeBox}>{String(timeLeft.days).padStart(2, '0')}</span> days{' '}
                                        <span className={styles.timeBox}>{String(timeLeft.hours).padStart(2, '0')}</span> hours{' '}
                                        <span className={styles.timeBox}>{String(timeLeft.minutes).padStart(2, '0')}</span> minutes{' '}
                                        <span className={styles.timeBox}>{String(timeLeft.seconds).padStart(2, '0')}</span> sec
                                    </span>
                                </>
                            ) : (
                                <span className={styles.expiredMessage}>
                                    {/* Unfortunately, the promotion has ended */}
                                </span>
                            )}
                        </div>

                        <div className={styles.priceList}>
                            <div className={styles.priceItem}>
                                <span>Landing page</span>
                                <span className={styles.priceWrapper}>
                                    from <span className={styles.price}>$800</span>
                                </span>
                            </div>
                            <div className={styles.priceItem}>
                                <span>Corporate site</span>
                                <span className={styles.priceWrapper}>
                                    from <span className={styles.price}>$1400</span>
                                </span>
                            </div>
                            <div className={styles.priceItem}>
                                <span>Online store</span>
                                <span className={styles.priceWrapper}>
                                    from <span className={styles.price}>$2100</span>
                                </span>
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            {/* <button className={styles.button}>Place order</button>
                            <span className={styles.buttonSeparator}>or</span> */}
                            <button
                                className={styles.button}
                                onClick={() => setIsOrderFormOpen(true)}
                            >
                                Submit request
                            </button>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.imageContainer}>
                            <AnimatedStats />
                        </div>
                    </div>
                </div>
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