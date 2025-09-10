"use client";

import styles from './ContactForm.module.css';
import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        contactMethod: 'email',
        contact: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

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
                setFormData({ name: '', contactMethod: 'email', contact: '', message: '' });
            } else {
                alert('Failed to send message');
            }
        } catch (error: unknown) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        } finally {
            setStatus('idle');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'contactMethod' ? { contact: '' } : {})
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
                <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="phone">Phone</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <input
                    type={formData.contactMethod === 'email' ? 'email' : (formData.contactMethod === 'phone' ? 'tel' : 'text')}
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder={
                        formData.contactMethod === 'email'
                            ? 'Your email'
                            : formData.contactMethod === 'whatsapp'
                                ? 'WhatsApp number or link'
                                : formData.contactMethod === 'telegram'
                                    ? 'Telegram @username or link'
                                    : 'Your phone number'
                    }
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