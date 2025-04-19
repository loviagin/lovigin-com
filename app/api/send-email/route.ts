import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, messenger, messengerId, message, service } = body;

    const emailContent = `
      <h2>New Order Request</h2>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Preferred Messenger:</strong> ${messenger}</p>
      <p><strong>Messenger ID:</strong> ${messengerId}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const data = await resend.emails.send({
      from: 'Lovigin <noreply@lovigin.com>',
      to: ['ilia.loviagin@gmail.com'],
      subject: `New Order Request: ${service}`,
      html: emailContent,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
} 