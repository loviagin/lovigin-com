import styles from './page.module.css';
import { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';

export const metadata: Metadata = {
    title: 'Portfolio | LOVIGIN LTD',
    description: 'Portfolio of LOVIGIN LTD - Our projects and achievements',
};

export default function Portfolio() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Our Portfolio</h1>
                    <p className={styles.subtitle}>Discover our latest projects and achievements</p>
                </div>
            </div>
            <div className={styles.content}>
                <PortfolioContent />
            </div>
            <div className={styles.disclaimer}>
                <p>Note: The portfolio contains only those projects whose publication has not been prohibited by clients.</p>
            </div>
        </main>
    );
}
