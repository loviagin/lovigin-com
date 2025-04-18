import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | LOVIGIN LTD',
    description: 'Cookie policy for LOVIGIN LTD',
};

export default function CookiePolicy() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Cookie Policy</h1>
                    <p className={styles.lastUpdated}><strong>Last updated:</strong> 10 April 2025</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <p className={styles.sectionContent}>
                        This Cookie Policy explains how LOVIGIN LTD (&quot;we&quot;, &quot;us&quot;, and &quot;our&quot;) uses cookies and similar technologies when you visit our website.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. What Are Cookies?</h2>
                    <p className={styles.sectionContent}>
                        Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and collect analytics.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Types of Cookies We Use</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <strong>Essential Cookies</strong>
                            <p className={styles.sectionContent}>These cookies are necessary for the website to function properly.</p>
                        </li>
                        <li className={styles.listItem}>
                            <strong>Analytics Cookies</strong>
                            <p className={styles.sectionContent}>These cookies help us understand how visitors interact with our website (e.g., Google Analytics).</p>
                        </li>
                        <li className={styles.listItem}>
                            <strong>Functionality Cookies</strong>
                            <p className={styles.sectionContent}>These cookies remember your settings and preferences.</p>
                        </li>
                        <li className={styles.listItem}>
                            <strong>Third-Party Cookies</strong>
                            <p className={styles.sectionContent}>Some cookies may be set by third-party services we use (such as YouTube, payment gateways, etc.).</p>
                        </li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. How You Can Control Cookies</h2>
                    <p className={styles.sectionContent}>
                        You can control or delete cookies via your browser settings. You can also opt out of non-essential cookies via our cookie banner.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Changes to This Policy</h2>
                    <p className={styles.sectionContent}>
                        We may update this Cookie Policy at any time. Changes will be posted on this page with a revised date.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Contact</h2>
                    <p className={styles.sectionContent}>
                        If you have any questions about our use of cookies, contact us at:
                    </p>
                    <div className={styles.contactInfo}>
                        <p>LOVIGIN LTD</p>
                        <p>86-90 Paul Street London, EC2A 4NE, UK</p>
                        <p>Email: support@lovigin.com</p>
                    </div>
                </div>
            </div>
        </main>
    );
}