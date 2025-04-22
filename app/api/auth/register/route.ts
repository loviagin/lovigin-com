import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    await connectDB();

    // Проверяем, существует ли пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Отправляем письмо клиенту
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: email,
      subject: 'Добро пожаловать в LOVIGIN',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">LOVIGIN</h1>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <h2 style="color: #333333;">Добро пожаловать, ${firstName} ${lastName}!</h2>
            <p style="color: #666666;">Спасибо за регистрацию в LOVIGIN. Теперь вы можете создавать заказы и отслеживать их статус.</p>
            <p style="color: #666666;">Если у вас есть вопросы, не стесняйтесь обращаться к нам.</p>
          </div>
          <div style="text-align: center; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
            <p style="margin: 0;">© 2024 LOVIGIN. Все права защищены.</p>
          </div>
        </div>
      `,
    });

    // Отправляем уведомление администратору
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: 'admin@lovigin.com', // Замените на реальный email администратора
      subject: 'Новый пользователь зарегистрирован',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">LOVIGIN</h1>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <h2 style="color: #333333;">Новый пользователь</h2>
            <p style="color: #666666;">Имя: ${firstName} ${lastName}</p>
            <p style="color: #666666;">Email: ${email}</p>
            <p style="color: #666666;">Дата регистрации: ${new Date().toLocaleString()}</p>
          </div>
          <div style="text-align: center; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
            <p style="margin: 0;">© 2024 LOVIGIN. Все права защищены.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Пользователь успешно зарегистрирован' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in registration:', error);
    return NextResponse.json(
      { error: 'Ошибка при регистрации' },
      { status: 500 }
    );
  }
} 