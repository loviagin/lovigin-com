import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | LOVIGIN LTD',
    description: 'Sign in to your account',
};

export default function Login() {
    return (
        <main className={styles.container}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>
            </div>
            <div className={styles.loginSection}>
                <form className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        
                    </div>
                    <button type="submit" className={styles.submitButton}>Sign In</button>
                </form>
            </div>
        </main>
    );
} 