"use client";

import { useState } from 'react';
import styles from './OrderFormPopup.module.css';
import { FaTimes, FaGithub, FaUser, FaEnvelope, FaPhone, FaWhatsapp, FaTelegram, FaCog, FaCreditCard, FaUniversity, FaFileInvoice, FaGlobe, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

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
    paymentMethod: 'card',
    companyName: '',
    vatNumber: '',
    country: 'United Kingdom',
    currency: 'GBP',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (formData.paymentMethod === 'card') {
        // Create Stripe checkout session
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
      } else {
        // Handle bank transfer or invoice
        const response = await fetch('/api/orders/create-alternative', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            productType: 'swift-reports-hmrc',
            productName,
            productPrice,
          }),
        });

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        setSuccessMessage(result.message || 'Order request submitted successfully! You will receive payment instructions via email.');
        // Reset form after 3 seconds and close popup
        setTimeout(() => {
          setFormData({
            name: '',
            contactMethod: 'email',
            contact: '',
            githubUsername: '',
            paymentMethod: 'card',
            companyName: '',
            vatNumber: '',
            country: 'United Kingdom',
            currency: 'GBP',
            addressLine1: '',
            addressLine2: '',
            city: '',
            stateProvince: '',
            postalCode: '',
          });
          setSuccessMessage('');
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error('Error processing order:', err);
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <FaCreditCard />;
      case 'bank_transfer': return <FaUniversity />;
      case 'invoice': return <FaFileInvoice />;
      default: return <FaCreditCard />;
    }
  };

  const isCompanyPayment = formData.paymentMethod === 'bank_transfer' || formData.paymentMethod === 'invoice';
  const isInvoice = formData.paymentMethod === 'invoice';

  // List of countries with flags
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  ].sort((a, b) => a.name.localeCompare(b.name));

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
            <label htmlFor="paymentMethod">
              {getPaymentMethodIcon(formData.paymentMethod)}
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="card">Credit/Debit Card (Stripe)</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="invoice">Invoice</option>
            </select>
          </div>

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

          {isCompanyPayment && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="companyName">
                  <FaUniversity />
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required={isCompanyPayment}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="vatNumber">
                    <FaFileInvoice />
                    VAT Number (Optional)
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    placeholder="GB123456789"
                    disabled={isLoading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country">
                    <FaGlobe />
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required={isCompanyPayment}
                    disabled={isLoading}
                    className={styles.countrySelect}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="currency">
                  <FaDollarSign />
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required={isCompanyPayment}
                  disabled={isLoading}
                >
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              {isInvoice && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="addressLine1">
                      <FaMapMarkerAlt />
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="Street address, P.O. box"
                      required={isInvoice}
                      disabled={isLoading}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="addressLine2">
                      <FaMapMarkerAlt />
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      disabled={isLoading}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city">
                        <FaMapMarkerAlt />
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required={isInvoice}
                        disabled={isLoading}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="stateProvince">
                        <FaMapMarkerAlt />
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="stateProvince"
                        name="stateProvince"
                        value={formData.stateProvince}
                        onChange={handleChange}
                        placeholder="State or Province"
                        required={isInvoice}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="postalCode">
                      <FaMapMarkerAlt />
                      Postal/ZIP Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal or ZIP code"
                      required={isInvoice}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
            </>
          )}

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

          {successMessage && (
            <div className={styles.success}>
              {successMessage}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : formData.paymentMethod === 'card' ? `Pay $${productPrice}` : `Request ${formData.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Invoice'}`}
          </button>
        </form>

        <div className={styles.footer}>
          {formData.paymentMethod === 'card' && (
            <>
              <p>Secure payment powered by Stripe</p>
              <p>You'll receive repository access within a few minutes</p>
            </>
          )}
          {formData.paymentMethod === 'bank_transfer' && (
            <>
              <p>Bank transfer instructions will be sent via email</p>
              <p>Repository access will be granted after payment confirmation</p>
            </>
          )}
          {formData.paymentMethod === 'invoice' && (
            <>
              <p>Invoice will be sent via email</p>
              <p>Repository access will be granted after payment confirmation</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
