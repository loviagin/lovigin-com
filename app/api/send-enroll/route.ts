import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project, platform, name, email } = body ?? {};

    if (!project || !platform || !name || !email) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const emailContent = `
      <h2>New Tester Enrollment</h2>
      <p><strong>Project:</strong> ${project}</p>
      <p><strong>Platform:</strong> ${platform}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

    const data = await resend.emails.send({
      from: 'Lovigin <noreply@lovigin.com>',
      to: ['ilia.loviagin@gmail.com'],
      subject: `New Tester Enrollment: ${project} (${platform})`,
      html: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}


