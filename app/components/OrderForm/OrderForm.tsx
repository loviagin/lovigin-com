'use client';

import React, { useState } from 'react';
import styles from './OrderForm.module.css';
import { 
  FaTelegram, 
  FaWhatsapp, 
  FaMailBulk, 
  FaFacebookMessenger,
  FaInstagram
} from 'react-icons/fa';

interface OrderFormProps {
  serviceTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const messengers = [
  { id: 'whatsapp', name: 'WhatsApp', icon: <FaWhatsapp /> },
  { id: 'messenger', name: 'Facebook Messenger', icon: <FaFacebookMessenger /> },
  { id: 'telegram', name: 'Telegram', icon: <FaTelegram /> },
  { id: 'instagram', name: 'Instagram', icon: <FaInstagram /> },
  { id: 'email', name: 'Email', icon: <FaMailBulk /> },
];

const OrderForm: React.FC<OrderFormProps> = ({ serviceTitle, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messenger: 'whatsapp',
    messengerId: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: serviceTitle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          email: '',
          messenger: 'telegram',
          messengerId: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Order {serviceTitle}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="messenger">Preferred Messenger</label>
            <div className={styles.messengerSelect}>
              <select
                id="messenger"
                name="messenger"
                value={formData.messenger}
                onChange={handleChange}
                className={styles.select}
                disabled={isSubmitting}
              >
                {messengers.map(messenger => (
                  <option key={messenger.id} value={messenger.id}>
                    {messenger.name}
                  </option>
                ))}
              </select>
              <div className={styles.messengerIcon}>
                {messengers.find(m => m.id === formData.messenger)?.icon}
              </div>
            </div>
          </div>
          {formData.messenger !== 'email' && (
            <div className={styles.formGroup}>
              <label htmlFor="messengerId">Messenger ID/Username</label>
              <input
                type="text"
                id="messengerId"
                name="messengerId"
                value={formData.messengerId}
                onChange={handleChange}
                placeholder={`Enter your ${formData.messenger} username or ID`}
                required={formData.messenger !== 'email'}
                disabled={isSubmitting}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us more about your project..."
              disabled={isSubmitting}
            />
          </div>
          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              Thank you! Your request has been sent successfully.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              Something went wrong. Please try again later.
            </div>
          )}
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm; 