import { Metadata } from 'next';
import styles from './page.module.css';
import ProductContent from './ProductContent'

export const metadata: Metadata = {
    title: 'Go Hood – Smart housing search with a selection of neighborhoods',
    description: 'Hotels, apartments, houses, cottages, hostels, apartments and other housing options in Russia and abroad with a selection of areas',
}

export default function ProductPage() {
    return (
        <main className={styles.container}>
            <ProductContent />
        </main>
    );
} 