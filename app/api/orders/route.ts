import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Order from '@/models/Order';
import connectDB from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
}

interface Session {
    user?: User;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions) as Session;
        const data = await req.json();
        
        await connectDB();
        
        const orderData = {
            ...data,
            userId: session?.user?.id || null,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const order = await Order.create(orderData);

        // Отправляем уведомление о создании заказа через Resend
        const email = session?.user?.email || data.contact.email;
        await resend.emails.send({
            from: 'LOVIGIN <noreply@lovigin.com>',
            to: email,
            subject: 'Новый заказ создан',
            html: `
                <h1>Ваш заказ успешно создан</h1>
                <p>Спасибо за ваш заказ! Мы уже начали его обработку.</p>
                <h2>Детали заказа:</h2>
                <ul>
                    <li>Тип услуги: ${data.serviceType}</li>
                    ${data.websiteType ? `<li>Тип сайта: ${data.websiteType}</li>` : ''}
                    ${data.mobilePlatforms?.length ? `<li>Платформы: ${data.mobilePlatforms.join(', ')}</li>` : ''}
                    ${data.supportPeriod ? `<li>Период поддержки: ${data.supportPeriod}</li>` : ''}
                </ul>
                <p>Вы можете отслеживать статус заказа в личном кабинете.</p>
            `,
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions) as Session;
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const orders = await Order.find({ userId: session.user.id });
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
} 