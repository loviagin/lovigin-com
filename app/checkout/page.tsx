'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js';
import styles from './page.module.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
  };

  const createOrder: PayPalButtonsComponentProps['createOrder'] = (_, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: "45.00",
            currency_code: "USD"
          }
        }
      ]
    });
  };

  const onApprove: PayPalButtonsComponentProps['onApprove'] = (data, actions) => {
    if (!actions.order) {
      throw new Error('Order actions not available');
    }
    return actions.order.capture().then((details) => {
      console.log('Payment completed:', { data, details });
    });
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Checkout</h1>
        
        <div className={styles.checkoutWrapper}>
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <h2 className={styles.sectionTitle}>Contact information</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>Name</label>
              <input
                type="text"
                id="firstName"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            {/* <h2 className={styles.sectionTitle}>Адрес доставки</h2>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Адрес</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>Город</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="postalCode" className={styles.label}>Почтовый индекс</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={styles.input}
                required
              /> */}
          </form>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Your order</h2>
            
            <div className={styles.summaryItem}>
              <span>Product 1</span>
              <span>9 999 ₽</span>
            </div>
            
            <div className={styles.summaryItem}>
              <span>Product 2</span>
              <span>4 999 ₽</span>
            </div>
            
            <div className={styles.summaryItem}>
              <span>Delivery</span>
              <span>Free</span>
            </div>
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>14 998 ₽</span>
            </div>

            <div className={styles.buttons}>
            <PayPalScriptProvider options={{ 
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                currency: "USD"
              }}>
                <div className={styles.paypalButton}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    style={{
                      layout: "vertical",
                      color: "white",
                      shape: "rect",
                      label: "pay"
                    }}
                  />
                </div>
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
