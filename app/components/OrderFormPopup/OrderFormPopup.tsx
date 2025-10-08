"use client";

import { useState } from 'react';
import styles from './OrderFormPopup.module.css';
import { FaTimes, FaGithub, FaUser, FaEnvelope, FaPhone, FaWhatsapp, FaTelegram, FaCog } from 'react-icons/fa';

interface OrderFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: number;
}


export default function OrderFormPopup({ isOpen, onClose, productName = "Swift Reports HMRC", productPrice = 15 }: OrderFormPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    contactMethod: 'email',
    contact: '',
    githubUsername: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productType: 'swift-reports-hmrc',
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.url) {
        // Redirect to Stripe Checkout URL
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'contactMethod' ? { contact: '' } : {})
    }));
  };

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'email': return <FaEnvelope />;
      case 'phone': return <FaPhone />;
      case 'whatsapp': return <FaWhatsapp />;
      case 'telegram': return <FaTelegram />;
      default: return <FaEnvelope />;
    }
  };

  const getContactPlaceholder = (method: string) => {
    switch (method) {
      case 'email': return 'your.email@example.com';
      case 'phone': return '+44 123 456 7890';
      case 'whatsapp': return '+44 123 456 7890';
      case 'telegram': return '@username';
      default: return 'your.email@example.com';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className={styles.header}>
          <h2>Purchase {productName}</h2>
          <div className={styles.price}>${productPrice}</div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <FaUser />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="contactMethod">
                <FaCog />
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact">
                {getContactIcon(formData.contactMethod)}
                Contact Information
              </label>
              <input
                type={formData.contactMethod === 'email' ? 'email' : (formData.contactMethod === 'phone' || formData.contactMethod === 'whatsapp' ? 'tel' : 'text')}
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder={getContactPlaceholder(formData.contactMethod)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="githubUsername">
              <FaGithub />
              GitHub Username
            </label>
            <input
              type="text"
              id="githubUsername"
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleChange}
              placeholder="your-github-username"
              pattern="^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$"
              title="Only GitHub username allowed (letters, numbers, hyphens). No email addresses."
              required
              disabled={isLoading}
            />
            <small className={styles.helpText}>
              <strong>ONLY GitHub username allowed!</strong> No email addresses. Example: loviagin, octocat, torvalds
            </small>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Pay $${productPrice}`}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Secure payment powered by Stripe</p>
          <p>You'll receive repository access within a few minutes</p>
        </div>
      </div>
    </div>
  );
}
