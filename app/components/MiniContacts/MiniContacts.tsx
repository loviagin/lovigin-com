import React from 'react';
import styles from './MiniContacts.module.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

const MiniContacts = () => {
  const contacts = [
    {
      title: 'Email',
      info: 'support@lovigin.com',
      icon: <FaEnvelope className={styles.icon} />,
      link: 'mailto:support@lovigin.com'
    },
    {
      title: 'Phone',
      info: '+44 (786) 724-65-91',
      icon: <FaPhone className={styles.icon} />,
      link: 'https://wa.me/message/6GRKRYVTTWMWO1'
    },
    {
      title: 'Location',
      info: 'London, United Kingdom',
      icon: <FaMapMarkerAlt className={styles.icon} />,
      link: 'https://maps.app.goo.gl/UnAbcx5ibmvFqTtq9'
    }
  ];

  return (
    <section className={styles.miniContacts} id="contacts">
      <div className={styles.container}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          Get in touch with us for any inquiries or questions
        </p>
        <div className={styles.contactsGrid}>
          {contacts.map((contact, index) => (
            <div key={index} className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                {contact.icon}
              </div>
              <h3 className={styles.contactTitle}>{contact.title}</h3>
              <p className={styles.contactInfo}>
                <a href={contact.link} className={styles.contactLink}>
                  {contact.info}
                </a>
              </p>
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Link href="/contacts" className={styles.viewAllButton}>
            View All Contacts
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiniContacts; 