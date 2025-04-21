'use client';

import React, { useState } from 'react';
import styles from './Hero.module.css';
import Image from 'next/image';
import OrderForm from '@/app/components/OrderForm/OrderForm';

const logos = [
  { name: 'Google', src: '/logo/google.webp' },
  { name: 'PayPal', src: '/logo/paypal.webp' },
  { name: 'Digital Ocean', src: '/logo/digitalocean.webp' },
];

export default function Hero() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  return (
    <section className={styles.pageWrapper}>
      {/* Promo banner */}
      <div className={styles.promo}>
        <div className={styles.promoContent}>
        We have discounts - Landing from $800 in honor of Easter Monday
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftContent}>
          <main className={styles.main}>
            <h1 className={styles.headline}>
              We will develop the website for your business
            </h1>
            <div className={styles.services}>
              We offer a turnkey offer - <span className={styles.highlight}>design</span> & <span className={styles.highlight}>development</span> & <span className={styles.highlight}>tech support</span>
            </div>

            {/* Service types */}
            <div className={styles.serviceTypes}>
              <div className={styles.serviceType}>Landing page</div>
              <div className={styles.serviceType}>Corporate site</div>
              <div className={styles.serviceType}>Online store</div>
            </div>

            {/* Action buttons */}
            <div className={styles.buttons}>
              <button 
                className={styles.orderButton}
                onClick={() => setIsOrderFormOpen(true)}
              >
                Order now
              </button>
              {/* <button className={styles.learnMore}>Learn more</button> */}
            </div>
          </main>
        </div>

        <div className={styles.rightContent}>
          <Image
            src="/mockup-lovigin.webp"
            width={600}
            height={400}
            alt="Responsive web design preview"
            className={styles.deviceImage}
          />

          <div className={styles.techStack}>
            <div className={styles.techTitle}>We are work with —</div>
            <div className={styles.techImages}>
              {logos.map((logo) => (
                <Image
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  width={64}
                  height={64}
                  quality={100}
                  className={styles.techImage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isOrderFormOpen && (
        <OrderForm
          serviceTitle="Web Development"
          isOpen={isOrderFormOpen}
          onClose={() => setIsOrderFormOpen(false)}
        />
      )}
    </section>
  );
} 