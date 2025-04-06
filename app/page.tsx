import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>
      <h1 className={styles.title}>Technical maintenance</h1>
      <p className={styles.subtitle}>
        Our website is temporarily unavailable due to technical maintenance.
        We are working to improve the service and will be back online soon.
        We apologize for any inconvenience.
      </p>
    </main>
  );
}
