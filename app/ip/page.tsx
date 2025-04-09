export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';
import styles from './page.module.css';

export default async function IpCheck() {
  const headersList = await headers(); // 👈 теперь без ошибки

  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0] || 'неизвестен';

  return (
    <main className={styles.container}>
      <h1>IP-адрес</h1>
      <p>Твой IP: {ip}</p>
    </main>
  );
}