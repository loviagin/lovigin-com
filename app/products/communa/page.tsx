import { Metadata } from 'next';
import styles from './page.module.css';
import ProductContent from './ProductContent'

export const metadata: Metadata = {
    title: 'Communa – Chatting and Friends',
    description: 'The app for chatting in forums and making friends',
}

export default function ProductPage() {
    return (
        <main className={styles.container}>
            <ProductContent />
        </main>
    );
} 