import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, contactMethod, contact, email, message } = await request.json();

        // Backward compatibility: if older client sends only email
        const resolvedMethod = contactMethod || 'email';
        const resolvedContact = contact || email || '';

        const data = await resend.emails.send({
            from: 'Contact Form <support@lovigin.com>',
            to: 'ilia.loviagin@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Preferred contact method:</strong> ${resolvedMethod}</p>
                <p><strong>Contact:</strong> ${resolvedContact}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
} 