import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Learnsy Terms of Service | LOVIGIN LTD',
    description: 'Terms of Service for the Learnsy app by LOVIGIN LTD',
};

export default function TermsOfServiceLearnsy() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Terms of Service — Learnsy</h1>
                    <p className={styles.effectiveDate}><strong>Effective date:</strong> 6 October 2025</p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <p className={styles.sectionContent}>
                        Welcome to Learnsy! By using our app, you agree to the following Terms of Service.
                        Please read them carefully.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
                    <p className={styles.sectionContent}>
                        By downloading, accessing, or using Learnsy, you agree to be bound by these
                        Terms of Service and our Privacy Policy. If you do not agree, please do not use the app.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Eligibility</h2>
                    <p className={styles.sectionContent}>
                        You must be at least 12 years old (or the minimum age in your country) to use Learnsy.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Use of the Service</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Learnsy is a platform for skill exchange and communication between users.</li>
                        <li className={styles.listItem}>You are responsible for the content you share and your interactions with others.</li>
                        <li className={styles.listItem}>You agree not to use Learnsy for any unlawful, harmful, or abusive activities.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. User Accounts</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>You must provide accurate information when creating an account.</li>
                        <li className={styles.listItem}>You are responsible for keeping your login credentials secure.</li>
                        <li className={styles.listItem}>Learnsy is not responsible for any loss or damage caused by unauthorized account access.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Content</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>You retain ownership of the content you upload.</li>
                        <li className={styles.listItem}>By posting on Learnsy, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content within the app for operational purposes.</li>
                        <li className={styles.listItem}>We may remove any content that violates our rules or legal requirements.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Subscriptions & Payments</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Learnsy offers a free version and a Pro Subscription with additional features.</li>
                        <li className={styles.listItem}>Payments are handled through Apple App Store and Google Play billing.</li>
                        <li className={styles.listItem}>All purchases are non-refundable unless required by law.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Termination</h2>
                    <p className={styles.sectionContent}>
                        We may suspend or terminate your account if you violate these Terms. You may also delete your
                        account at any time.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Disclaimer & Limitation of Liability</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Learnsy is provided “as is” without warranties of any kind.</li>
                        <li className={styles.listItem}>We are not responsible for user behavior or content.</li>
                        <li className={styles.listItem}>To the maximum extent permitted by law, Learnsy is not liable for any damages arising from your use of the app.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Changes to Terms</h2>
                    <p className={styles.sectionContent}>
                        We may update these Terms from time to time. Continued use of Learnsy means you accept the updated Terms.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>10. Contact Us</h2>
                    <p className={styles.sectionContent}>If you have questions about these Terms, contact us at:</p>
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