'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push('/account');
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>
            </div>
            <div className={styles.loginSection}>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}></div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" className={styles.submitButton}>
                        Sign In
                    </button>
                </form>
                <Link href="/account/order" className={styles.registerLink}>
                    Don&apos;t have an account? Place an order & register
                </Link>
            </div>
        </main>
    );
} 