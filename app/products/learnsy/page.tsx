import { Metadata } from 'next';
import styles from './page.module.css';
import ProductContent from './ProductContent'

export const metadata: Metadata = {
    title: 'Learnsy – Grow your skills',
    description: 'Learn new skills and share your knowledge',
}

export default function ProductPage() {
    return (
        <main className={styles.container}>
            <ProductContent />
        </main>
    );
} 