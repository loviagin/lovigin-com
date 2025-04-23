'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function DonationPage() {
  const [amount, setAmount] = useState('10');
  const [currency, setCurrency] = useState('USD');
  const [showThankYou, setShowThankYou] = useState(false);
  const [donatorName, setDonatorName] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <h1 className={styles.headline}>Support Our Work</h1>
          <p className={styles.description}>
            Your donation helps us continue providing high-quality services and developing new features.
            Every contribution makes a difference!
          </p>

          <div className={styles.donationForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="amount" className={styles.label}>Amount</label>
              <div className={styles.amountInput}>
                <select 
                  value={currency} 
                  onChange={handleCurrencyChange}
                  className={styles.currencySelect}
                >
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                  <option value="GBP">£</option>
                </select>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  min="1"
                  step="1"
                  className={styles.amount}
                />
              </div>
            </div>

            <div className={styles.paypalContainer}>
              <PayPalScriptProvider options={{ 
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                currency: currency
              }}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: amount,
                            currency_code: currency
                          },
                          description: "Donation to LOVIGIN"
                        }
                      ]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      const name = details.payer?.name?.given_name || "Anonymous";
                      setDonatorName(name);
                      setShowThankYou(true);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>

        <div className={styles.rightContent}>
          <Image
            src="/donation.webp"
            width={600}
            height={400}
            alt="Donation illustration"
            className={styles.illustration}
          />
        </div>
      </div>

      {showThankYou && (
        <div className={styles.thankYouOverlay}>
          <div className={styles.thankYouModal}>
            <h2 className={styles.thankYouTitle}>Thank You!</h2>
            <p className={styles.thankYouMessage}>
              {donatorName}, your generous donation of {currency}{amount} means a lot to us.
              We truly appreciate your support!
            </p>
            <button 
              className={styles.thankYouButton}
              onClick={() => setShowThankYou(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
