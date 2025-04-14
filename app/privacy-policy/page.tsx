import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | LOVIGIN LTD',
    description: 'Privacy policy for LOVIGIN LTD',
};

export default function PrivacyPolicy() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.effectiveDate}><strong>Effective date:</strong> 10 April 2025</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <p className={styles.sectionContent}>
                        LOVIGIN LTD (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your
                        information when you visit our website.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                    <p className={styles.sectionContent}>We may collect personal information you provide to us, such as:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Name</li>
                        <li className={styles.listItem}>Email address</li>
                        <li className={styles.listItem}>IP address</li>
                        <li className={styles.listItem}>Other data you submit through forms</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>To operate and maintain our website</li>
                        <li className={styles.listItem}>To respond to inquiries and support requests</li>
                        <li className={styles.listItem}>To improve user experience</li>
                        <li className={styles.listItem}>To send updates and marketing emails (if opted in)</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Cookies and Tracking</h2>
                    <p className={styles.sectionContent}>
                        We use cookies and similar tracking technologies to monitor site activity and improve usability.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Data Retention</h2>
                    <p className={styles.sectionContent}>
                        We retain your data only as long as necessary for the purposes described above.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Your Rights</h2>
                    <p className={styles.sectionContent}>
                        Under UK GDPR, you have the right to access, correct, or delete your personal data.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Contact Us</h2>
                    <p className={styles.sectionContent}>
                        If you have any questions about this policy, you can contact us at:
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
};