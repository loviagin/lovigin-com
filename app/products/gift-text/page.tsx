import { Metadata } from 'next';
import styles from './page.module.css';
import ProductContent from './ProductContent'

export const metadata: Metadata = {
    title: 'All Banks – Manage Accounts',
    description: 'A simple way to manage all your accounts in one app',
}

export default function ProductPage() {
    return (
        <main className={styles.container}>
            <ProductContent />
        </main>
    );
} 