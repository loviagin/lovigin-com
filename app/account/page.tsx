'use client';

import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderForm from '../components/OrderForm/OrderForm';
import OrderList from '../components/OrderList/OrderList';

export default function AccountPage() {
    const { data: session } = useSession();

    // Редирект на страницу входа, если пользователь не авторизован
    // if (status === 'unauthenticated') {
    //     router.push('/account/login');
    //     return null;
    // }

    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        Добро пожаловать, {session?.user?.name || 'Пользователь'}
                    </h1>
                    <p className={styles.subtitle}>
                        Управляйте своими заказами и данными
                    </p>
                </div>
            </div>
            <div className={styles.content}>
                <Tabs defaultValue="new-order" className={styles.tabs}>
                    <TabsList className={styles.tabsList}>
                        <TabsTrigger value="new-order">Новый заказ</TabsTrigger>
                        <TabsTrigger value="my-orders">Мои заказы</TabsTrigger>
                        <TabsTrigger value="profile">Личные данные</TabsTrigger>
                    </TabsList>
                    <TabsContent value="new-order" className={styles.tabContent}>
                        <OrderForm />
                    </TabsContent>
                    <TabsContent value="my-orders" className={styles.tabContent}>
                        <h2>Ваши заказы</h2>
                        <OrderList />
                    </TabsContent>
                    <TabsContent value="profile" className={styles.tabContent}>
                        <h2>Личные данные</h2>
                        {/* Здесь будет форма с личными данными */}
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}