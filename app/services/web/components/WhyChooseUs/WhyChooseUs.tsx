'use client';

import styles from './WhyChooseUs.module.css';
import Image from 'next/image';

const features = [
  {
    title: 'We use a modern stack',
    subtitle: 'TypeScript, CSS Modules, Next.js, Node.js, Express, MongoDB',
    icon: '/icons/code.webp'
  },
  {
    title: 'We are adapting the site',
    subtitle: 'For all types of devices – desktops, tablets and mobiles',
    icon: '/icons/device.webp'
  },
  {
    title: 'We optimize the site',
    subtitle: 'For fast loading and high performance. We use caching and compression.',
    icon: '/icons/flash.webp'
  },
  {
    title: 'Setting up SEO',
    subtitle: 'We optimize the site for search engines. We use meta tags, keywords, descriptions, etc.',
    icon: '/icons/seo.webp'
  },
  {
    title: 'We choose a convenient way of communication',
    subtitle: 'WhatsApp, Facebook Messenger, Telegram, etc.',
    icon: '/icons/chat.webp'
  },
  {
    title: 'We have a multi functional account',
    subtitle: 'Access to all functionality in the account – place orders, track the status of orders and more',
    icon: '/icons/user.webp'
  }
];

export default function WhyChooseUs() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why choose Us</h2>
          <div className={styles.titleLine} />
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className={styles.icon}
                  priority={index < 3}
                />
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                {feature.subtitle && (
                  <p className={styles.featureSubtitle}>{feature.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 