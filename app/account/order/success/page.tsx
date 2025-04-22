
import styles from './page.module.css';

export default function OrderSuccessPage() {

  return (
    <div className={styles.successContainer}>
      <h1>Спасибо за вашу заявку!</h1>
      <p>Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
      <p>Через 5 секунд вы будете перенаправлены на главную страницу.</p>
    </div>
  );
} 