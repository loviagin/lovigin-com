import React from 'react';
import styles from './Services.module.css';
import { FaCode, FaMobileAlt, FaCogs } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'Creating modern, responsive and high-performance websites using cutting-edge technologies.',
      icon: <FaCode className={styles.icon} />,
      features: [
        'Corporate websites',
        'Online stores',
        'Landing pages',
        'Web applications'
      ]
    },
    {
      title: 'Mobile Apps',
      description: 'Development of native and cross-platform mobile applications for iOS and Android.',
      icon: <FaMobileAlt className={styles.icon} />,
      features: [
        'iOS apps',
        'Android apps',
        'Cross-platform solutions',
        'Hybrid apps'
      ]
    },
    {
      title: 'Custom Solutions',
      description: 'Individual IT solutions developed specifically for your business tasks.',
      icon: <FaCogs className={styles.icon} />,
      features: [
        'API integration',
        'Automated processes',
        'CRM systems',
        'Business analytics'
      ]
    }
  ];

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <h2 className={styles.title}>Our services</h2>
        <p className={styles.subtitle}>Comprehensive solutions for your business</p>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.featuresList}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 