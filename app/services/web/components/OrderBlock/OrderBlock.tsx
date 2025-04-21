'use client';

import styles from './OrderBlock.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import OrderForm from '@/app/components/OrderForm/OrderForm';

function getTimeUntilEndOfDay() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59); // Today at 23:59:59

    // Проверяем, что сегодня 21 апреля
    if (now.getDate() !== 21 || now.getMonth() !== 3) { // 3 = апрель (месяцы начинаются с 0)
        return null;
    }

    if (now > targetDate) {
        return null;
    }

    const diff = targetDate.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

export default function OrderBlock() {
    const [timeLeft, setTimeLeft] = useState(getTimeUntilEndOfDay());
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

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
                        <h2 className={styles.title}>We have discounts in honor of
                            <span className={styles.subtitle}> Easter Monday</span></h2>

                        <div className={styles.timeEstimate}>
                            {timeLeft ? (
                                <>
                                    Complete your website by the end of Monday with our promotion{' '}
                                    <span className={styles.timeBoxes}>
                                        <span className={styles.timeBox}>{String(timeLeft.hours).padStart(2, '0')}</span> hours{' '}
                                        <span className={styles.timeBox}>{String(timeLeft.minutes).padStart(2, '0')}</span> minutes{' '}
                                        <span className={styles.timeBox}>{String(timeLeft.seconds).padStart(2, '0')}</span> sec
                                    </span>
                                </>
                            ) : (
                                <span className={styles.expiredMessage}>
                                    Unfortunately, the promotion has ended
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
                                    from <span className={styles.price}>$1100</span>
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
                                Fast contact Us
                            </button>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/easter.webp"
                                alt="Easter promotion"
                                width={600}
                                height={400}
                                className={styles.image}
                                priority
                            />
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