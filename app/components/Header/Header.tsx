'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsScrolled(false);
    setIsMenuOpen(false);

    // const handleScroll = () => {
    //   setIsScrolled(window.scrollY > 50);
    // };

    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            {isScrolled ? (
              <Image
                src="/logo.webp"
                alt="LOVIGIN"
                width={120}
                height={30}
                priority
              />
            ) : (
              <Image
                src="/logoWhite.webp"
                alt="LOVIGIN"
                width={120}
                height={30}
                priority
              />
            )}
          </Link>
        </div>

        <div className={styles.rightSection}>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
            <Link href="/#" className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}>
              <span>Services</span>
            </Link>
            <Link href="/#" className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}>
              <span>Products</span>
            </Link>
            <Link href="/#" className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}>
              <span>Portfolio</span>
            </Link>
            <Link href="/#" className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}>
              <span>News</span>
            </Link>
            <Link href="/#" className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}>
              <span>About</span>
            </Link>
            <Link href="/#" className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}>
              <span>Contacts</span>
            </Link>
          </nav>

          <div className={styles.actions}>
            <button className={`${styles.accountButton} ${isScrolled ? styles.scrolled : ''}`}>
              <svg
                className={`${styles.accountIcon} ${isScrolled ? styles.scrolled : ''}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
              <span>Account</span>
            </button>
          </div>

          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 