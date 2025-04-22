import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
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
    const hashedPassword = await hash(password, 12);

    // Создаем пользователя
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Отправляем приветственное письмо через Resend
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: email,
      subject: 'Добро пожаловать в LOVIGIN',
      html: `
        <h1>Добро пожаловать, ${name}!</h1>
        <p>Спасибо за регистрацию в LOVIGIN. Теперь вы можете создавать заказы и отслеживать их статус.</p>
        <p>Если у вас есть вопросы, не стесняйтесь обращаться к нам.</p>
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