import styles from './page.module.css';
import Link from 'next/link';
import { Metadata } from 'next';
import ContactForm from './components/ContactForm/ContactForm';
import { Facebook, Instagram, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contacts | LOVIGIN LTD',
    description: 'Contacts for LOVIGIN LTD',
};

export default function ContactsPage() {
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <h1 className={styles.title}>Contacts</h1>

            <div className={styles.grid}>
                <div className={styles.contactInfo}>
                    <h2>Contact Us</h2>
                    <div className={styles.infoItem}>
                        <h3>
                            <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                            </svg>
                            Address
                        </h3>
                        <p>86-90 Paul Street London, EC2A 4NE</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h3>
                            <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="currentColor" />
                            </svg>
                            Phone
                        </h3>
                        <Link href="tel:+447867246591">
                            <p>+44 786 724 65 91</p>
                        </Link>
                    </div>
                    <div className={styles.infoItem}>
                        <h3>
                            <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                            </svg>
                            Email
                        </h3>
                        <Link href="mailto:support@lovigin.com">
                            <p>support@lovigin.com</p>
                        </Link>
                    </div>
                    <div className={styles.socialLinks}>
                        <Link href="https://wa.me/447867246591" target='_blank' className={styles.socialLink}>WhatsApp</Link>
                        <Link href="https://t.me/loviginsup" target='_blank' className={styles.socialLink}>Telegram</Link>
                        <Link href="https://www.facebook.com/profile.php?id=61575847884183" target='_blank' className={styles.socialLink}>
                            <Facebook />
                        </Link>
                        <Link href="https://www.instagram.com/lovig.in/" target='_blank' className={styles.socialLink}>
                            <Instagram />
                        </Link>
                        <Link href="mailto:support@lovigin.com" target='_blank' className={styles.socialLink}>
                            <Mail />
                        </Link>
                    </div>
                </div>

                <div className={styles.contactForm}>
                    <h2>Contact form</h2>
                    <ContactForm />
                </div>
            </div>

            <div className={styles.map}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1549.382807527352!2d-0.08462317289589796!3d51.525550922787396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca55e32139f%3A0x25fe162fa222378!2s86%2F90%20Paul%20St%2C%20London%20EC2A%204NE!5e0!3m2!1sen!2suk!4v1744286994496!5m2!1sen!2suk"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            </div>

            <div className={styles.legalInfo}>
                <div className={styles.legalSection}>
                    <h2>Legal information</h2>
                    <div className={styles.legalDetails}>
                        <p><strong>Company name:</strong> LOVIGIN LTD</p>
                        <p><strong>Company number:</strong> 16203160</p>
                        <p><strong>Registered office address:</strong> 86-90 Paul Street London EC2A 4NE, United Kingdom</p>
                        {/* <p><strong>Регистрационный номер ICO:</strong> ZA123456</p> */}
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2>Regulatory information</h2>
                    <div className={styles.legalDetails}>
                        <p>LOVIGIN LTD is a private company limited by shares.</p>
                    </div>
                </div>

                <div className={styles.legalLinks}>
                    <a href="/privacy-policy" className={styles.legalLink}>Privacy Policy</a>
                    <a href="/terms-of-service" className={styles.legalLink}>Terms of Service</a>
                    <a href="/cookie-policy" className={styles.legalLink}>Cookie Policy</a>
                    {/*<a href="/disclaimer" className={styles.legalLink}>Отказ от ответственности</a>
                    <a href="/complaints" className={styles.legalLink}>Политика рассмотрения жалоб</a>
                    <a href="/aml" className={styles.legalLink}>Политика противодействия отмыванию денег</a> */}
                </div>
            </div>
        </main>
    );
}
