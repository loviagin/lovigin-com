"use client";

import styles from './ContactForm.module.css';
import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Message sent successfully');
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('Failed to send message');
            }
        } catch (error) {
            alert('Failed to send message');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={status === 'loading'}
                />
            </div>
            <div className={styles.formGroup}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    disabled={status === 'loading'}
                />
            </div>
            <div className={styles.formGroup}>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    disabled={status === 'loading'}
                />
            </div>
            <button 
                type="submit" 
                className={styles.submitButton}
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
}