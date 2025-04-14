import React from 'react';
import Link from 'next/link';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about} id='about'>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <h2 className={styles.title}>About Us</h2>
            <p className={styles.description}>
              LOVIGIN LTD – International IT-Developer company. We specializing in software development for mobile, desktop, and web platforms, as well as in the promotion and popularization of our own products.
            </p>

            <div className={styles.achievements}>
              <h3 className={styles.achievementsTitle}>Our achievements</h3>
              <div className={styles.achievementsGrid}>
                <div className={styles.achievementItem}>
                  <div className={styles.achievementNumber}>10</div>
                  <div className={styles.achievementText}>
                    <span className={styles.achievementLabel}>Years of experience</span>
                    <span className={styles.achievementDescription}>Successful work on the market</span>
                  </div>
                </div>
                <div className={styles.achievementItem}>
                  <div className={styles.achievementNumber}>500</div>
                  <div className={styles.achievementText}>
                    <span className={styles.achievementLabel}>Projects</span>
                    <span className={styles.achievementDescription}>Implemented since 2013</span>
                  </div>
                </div>
                <div className={styles.achievementItem}>
                  <div className={styles.achievementNumber}>50</div>
                  <div className={styles.achievementText}>
                    <span className={styles.achievementLabel}>Specialists</span>
                    <span className={styles.achievementDescription}>In our team</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/#values" className={styles.button}>
              Learn more about Us
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className={styles.values} id='values'>
            <h3 className={styles.valuesTitle}>Our values</h3>
            <div className={styles.valuesList}>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.valueContent}>
                  <h4 className={styles.valueTitle}>Innovations</h4>
                  <p className={styles.valueDescription}>We use advanced technologies and methodologies to create effective solutions</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.valueContent}>
                  <h4 className={styles.valueTitle}>Development</h4>
                  <p className={styles.valueDescription}>We constantly improve ourselves and help our clients grow</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.valueContent}>
                  <h4 className={styles.valueTitle}>Team</h4>
                  <p className={styles.valueDescription}>We unite professionals to achieve the best results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 