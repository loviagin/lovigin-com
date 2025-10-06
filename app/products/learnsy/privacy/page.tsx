import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Learnsy Privacy Policy | LOVIGIN LTD',
    description: 'Privacy Policy for the Learnsy app by LOVIGIN LTD',
};

export default function PrivacyPolicyLearnsy() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Privacy Policy — Learnsy</h1>
                    <p className={styles.effectiveDate}><strong>Effective date:</strong> 6 October 2025</p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <p className={styles.sectionContent}>
                        Learnsy values your privacy. This Privacy Policy explains how we collect, use, and
                        protect your information.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Account Information: email, username, and password.</li>
                        <li className={styles.listItem}>Device Information: app version, operating system, device type.</li>
                        <li className={styles.listItem}>Usage Data: interactions in the app, preferences, and features used.</li>
                        <li className={styles.listItem}>Optional Data: profile photo or additional info you choose to share.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                    <p className={styles.sectionContent}>We use your information to:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Provide and improve Learnsy’s services.</li>
                        <li className={styles.listItem}>Personalize your experience.</li>
                        <li className={styles.listItem}>Communicate updates, offers, and support.</li>
                        <li className={styles.listItem}>Maintain security and prevent fraud.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Data Sharing</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>We do not sell your personal data.</li>
                        <li className={styles.listItem}>We may share information with service providers (e.g., Firebase, Agora, RevenueCat) to operate Learnsy.</li>
                        <li className={styles.listItem}>We may disclose data if required by law or to protect rights and safety.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Data Storage & Security</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Data is stored securely using trusted third-party providers.</li>
                        <li className={styles.listItem}>We apply reasonable safeguards, but no method of transmission is 100% secure.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Your Rights</h2>
                    <p className={styles.sectionContent}>Depending on your location, you may have the right to:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Access, correct, or delete your data.</li>
                        <li className={styles.listItem}>Withdraw consent at any time.</li>
                        <li className={styles.listItem}>Request a copy of your personal information.</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Children’s Privacy</h2>
                    <p className={styles.sectionContent}>
                        Learnsy is not intended for children under 12 (or local age requirement). We do not knowingly
                        collect personal data from minors.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. International Use</h2>
                    <p className={styles.sectionContent}>
                        Your data may be transferred and processed outside your country, including the United States and Europe.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Changes to Policy</h2>
                    <p className={styles.sectionContent}>
                        We may update this Privacy Policy from time to time. Continued use of Learnsy means you accept the updated Policy.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Contact Us</h2>
                    <p className={styles.sectionContent}>If you have questions about this Privacy Policy, contact us at:</p>
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