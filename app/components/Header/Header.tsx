'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import IPWarning from '../IPWarning/IPWarning';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsScrolled(false);
    setIsMenuOpen(false);
    setIsSubmenuOpen(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsSubmenuOpen(false);
    }
  };

  const toggleSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <IPWarning />

      <div className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logoWhite.webp"
              alt="LOVIGIN"
              width={120}
              height={30}
              priority
            />
          </Link>
        </div>

        <div className={styles.rightSection}>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
            <div className={styles.navItem}>
              <Link
                href="/#"
                className={`${styles.navLink} ${isActive('/#') ? styles.active : ''}`}
                onClick={toggleSubmenu}
              >
                <span>Services</span>
              </Link>
              <div className={`${styles.submenu} ${isSubmenuOpen ? styles.active : ''}`}>
                <Link href="/#services" className={styles.submenuLink}>
                  <span>– Web Development</span>
                  <p className={styles.submenuDescription}>Reactive corporate websites, landing pages, online stores and more</p>
                </Link>
                <Link href="/#services" className={styles.submenuLink}>
                  <span>– Mobile Apps</span>
                  <p className={styles.submenuDescription}>Development of mobile applications for iOS and Android</p>
                </Link>
                <Link href="/#services" className={styles.submenuLink}>
                  <span>– UI/UX Design</span>
                  <p className={styles.submenuDescription}>Creating convenient and beautiful interfaces</p>
                </Link>
              </div>
            </div>
            <Link href="/#" className={`${styles.navLink} ${isActive('/#') ? styles.active : ''}`}>
              <span>Products</span>
            </Link>
            <Link href="/#" className={`${styles.navLink} ${isActive('/#') ? styles.active : ''}`}>
              <span>Portfolio</span>
            </Link>
            {/* <Link href="/#" className={`${styles.navLink} ${isActive('/#') ? styles.active : ''}`}>
              <span>News</span>
            </Link> */}
            <Link href="/#about" className={`${styles.navLink} ${isActive('/#') ? styles.active : ''}`}>
              <span>About</span>
            </Link>
            <Link href="/contacts" className={`${styles.navLink} ${isActive('/contacts') ? styles.active : ''}`}>
              <span>Contacts</span>
            </Link>
          </nav>

          <div className={styles.actions}>
            <button className={`${styles.accountButton}`}>
              <svg
                className={`${styles.accountIcon}`}
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