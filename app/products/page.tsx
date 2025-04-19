import styles from './page.module.css';
import { Metadata } from 'next';
import ProductsContent from './ProductsContent';

export const metadata: Metadata = {
    title: 'Products | LOVIGIN LTD',
    description: 'Our software products and solutions',
};

export default function Products() {
    return (
        <main className={styles.container}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Our Products</h1>
                    <p className={styles.subtitle}>Innovative solutions for your business needs</p>
                </div>
                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollText}>
                        <span>SCROLL</span>
                        <span>TO</span>
                        <span>EXPLORE</span>
                    </div>
                    <div className={styles.scrollLine} />
                </div>
            </div>
            <div className={styles.productsSection}>
                <ProductsContent />
            </div>
        </main>
    );
} 