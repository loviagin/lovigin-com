import styles from './CTA.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function CTA() {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <Image 
                            src="/tree.webp"
                            alt="Discount picture"
                            width={300}
                            height={300}
                            className={styles.image}
                            priority
                        />
                    </div>
                    
                    <div className={styles.textContent}>
                        <h2 className={styles.title}>Your idea. Our code. One powerful solution.</h2>
                        <p className={styles.subtitle}>Until the end of the week - discount on all sites</p>
                        
                        <div className={styles.services}>
                            <button className={styles.serviceLink}>
                                Landing Page
                            </button>
                            <button className={styles.serviceLink}>
                                Corporate site
                            </button>
                            <button className={styles.serviceLink}>
                                Online store
                            </button>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/order" className={styles.actionButton}>
                                Place order
                            </Link>
                            <span className={styles.orText}>or</span>
                            <Link href="/contact" className={styles.actionButton}>
                                First contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 