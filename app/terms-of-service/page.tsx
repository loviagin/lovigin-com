import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | LOVIGIN LTD',
    description: 'Terms of Service for LOVIGIN LTD',
};

export default function TermsOfService() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.lastUpdated}><strong>Last updated:</strong> 10 April 2025</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <p className={styles.sectionContent}>
                        Welcome to LOVIGIN LTD (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our website, services, or any associated content, you agree to be bound by the following Terms of Service. If you do not agree with these terms, please do not use our services.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Services</h2>
                    <p className={styles.sectionContent}>
                        We specialize in the development of web and mobile applications, as well as offering custom software development services. The scope and terms of individual services may be governed by separate agreements.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Use of the Website</h2>
                    <p className={styles.sectionContent}>You agree to use this website only for lawful purposes. You must not:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Use the site in any way that breaches applicable laws</li>
                        <li className={styles.listItem}>Attempt to gain unauthorized access to our servers</li>
                        <li className={styles.listItem}>Distribute any malicious code or spam</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
                    <p className={styles.sectionContent}>
                        All content on this website, including logos, graphics, texts, and software, is the property of LOVIGIN LTD or its licensors and is protected by intellectual property laws. You may not copy, modify, or distribute our materials without our permission.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. User Content</h2>
                    <p className={styles.sectionContent}>
                        If you provide any content or feedback, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and adapt it as part of our services or marketing.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
                    <p className={styles.sectionContent}>
                        We may use third-party tools or services (such as payment providers or analytics). We are not responsible for their content or practices. Your use of third-party services is subject to their own terms.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
                    <p className={styles.sectionContent}>
                        We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or services. All services are provided &quot;as is&quot; without warranties of any kind.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Termination</h2>
                    <p className={styles.sectionContent}>
                        We reserve the right to terminate or suspend your access to our services at our discretion, without prior notice, especially in case of misuse or violation of these terms.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Governing Law</h2>
                    <p className={styles.sectionContent}>
                        These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Changes to These Terms</h2>
                    <p className={styles.sectionContent}>
                        We may update these Terms of Service from time to time. We encourage you to review this page regularly. Continued use of the website after changes means you accept the new terms.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>10. Contact Us</h2>
                    <p className={styles.sectionContent}>
                        If you have any questions, please contact us at:
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
