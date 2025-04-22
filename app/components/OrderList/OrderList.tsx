'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './OrderList.module.css';

interface Order {
  _id: string;
  serviceType: string;
  websiteType?: string;
  mobilePlatforms?: string[];
  status: string;
  createdAt: string;
  contact: {
    name: string;
    email: string;
  };
}

export default function OrderList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchOrders();
    }
  }, [session]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.pending;
      case 'in_progress':
        return styles.inProgress;
      case 'completed':
        return styles.completed;
      case 'cancelled':
        return styles.cancelled;
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (orders.length === 0) {
    return <div className={styles.empty}>У вас пока нет заказов</div>;
  }

  return (
    <div className={styles.orderList}>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <h3 className={styles.orderTitle}>
              {order.serviceType === 'website' && 'Разработка сайта'}
              {order.serviceType === 'mobile' && 'Мобильное приложение'}
              {order.serviceType === 'custom' && 'Кастомное решение'}
              {order.serviceType === 'support' && 'Техническая поддержка'}
            </h3>
            <span className={`${styles.status} ${getStatusColor(order.status)}`}>
              {order.status === 'pending' && 'Ожидает обработки'}
              {order.status === 'in_progress' && 'В работе'}
              {order.status === 'completed' && 'Завершен'}
              {order.status === 'cancelled' && 'Отменен'}
            </span>
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.detail}>
              <span className={styles.label}>Клиент:</span>
              <span>{order.contact.name}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Email:</span>
              <span>{order.contact.email}</span>
            </div>
            {order.websiteType && (
              <div className={styles.detail}>
                <span className={styles.label}>Тип сайта:</span>
                <span>
                  {order.websiteType === 'landing' && 'Лендинг'}
                  {order.websiteType === 'corporate' && 'Корпоративный сайт'}
                  {order.websiteType === 'shop' && 'Интернет-магазин'}
                </span>
              </div>
            )}
            {order.mobilePlatforms && order.mobilePlatforms.length > 0 && (
              <div className={styles.detail}>
                <span className={styles.label}>Платформы:</span>
                <span>{order.mobilePlatforms.join(', ')}</span>
              </div>
            )}
            <div className={styles.detail}>
              <span className={styles.label}>Дата создания:</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 