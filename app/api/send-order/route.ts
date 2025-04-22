import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderFormData {
  contact: {
    name: string;
    email: string;
    messenger: string;
    messengerType: string;
  };
  serviceType: string;
  websiteType?: string;
  mobilePlatforms: string[];
  options: Record<string, number>;
  extras: string[];
  brief: Record<string, string | string[]>;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formData, isRegistration } = data as { formData: OrderFormData; isRegistration: boolean };

    // Email to admin
    await resend.emails.send({
      from: 'Lovigin <noreply@lovigin.com>',
      to: 'ilia@lovigin.com',
      subject: 'Новая заявка на сайте',
      html: `
        <h1>Новая заявка</h1>
        <h2>Контактная информация</h2>
        <p><strong>Имя:</strong> ${formData.contact.name}</p>
        <p><strong>Email:</strong> ${formData.contact.email}</p>
        <p><strong>Мессенджер:</strong> ${formData.contact.messengerType}</p>
        <p><strong>Контакт в мессенджере:</strong> ${formData.contact.messenger}</p>
        
        <h2>Детали заказа</h2>
        <p><strong>Тип услуги:</strong> ${formData.serviceType}</p>
        ${formData.websiteType ? `<p><strong>Тип сайта:</strong> ${formData.websiteType}</p>` : ''}
        ${formData.mobilePlatforms.length > 0 ? `<p><strong>Платформы:</strong> ${formData.mobilePlatforms.join(', ')}</p>` : ''}
        
        <h2>Выбранные опции</h2>
        <ul>
          ${Object.entries(formData.options)
            .filter(([_, value]) => value > 0)
            .map(([key, value]) => `<li>${key}: ${value} месяцев</li>`)
            .join('')}
        </ul>
        
        <h2>Дополнительные услуги</h2>
        <ul>
          ${formData.extras.map((extra: string) => `<li>${extra}</li>`).join('')}
        </ul>
        
        <h2>Бриф</h2>
        ${Object.entries(formData.brief)
          .filter(([key]) => !key.endsWith('_custom'))
          .map(([key, value]) => {
            const customValue = formData.brief[`${key}_custom`];
            return `<p><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}${customValue ? ` (${customValue})` : ''}</p>`;
          })
          .join('')}
      `
    });

    // Email to customer
    await resend.emails.send({
      from: 'Lovigin <noreply@lovigin.com>',
      to: formData.contact.email,
      subject: 'Спасибо за вашу заявку!',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #1e293b;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 20px;">Спасибо за вашу заявку!</h1>
            <p style="font-size: 18px; line-height: 1.6; color: #475569;">
              Мы получили вашу заявку и уже начали её обработку.
            </p>
          </div>

          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              В ближайшее время наш менеджер свяжется с вами для уточнения деталей и обсуждения вашего проекта.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Если у вас есть срочные вопросы, вы можете связаться с нами по телефону или через мессенджер.
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              С уважением,<br>
              команда Lovigin
            </p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 