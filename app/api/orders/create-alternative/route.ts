import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      name,
      contactMethod,
      contact,
      githubUsername,
      paymentMethod,
      companyName,
      vatNumber,
      country,
      productType,
      productName,
      productPrice,
    } = await request.json();

    // Validate required fields
    if (!name || !contact || !githubUsername) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate company fields for bank transfer and invoice
    if ((paymentMethod === 'bank_transfer' || paymentMethod === 'invoice') && (!companyName || !country)) {
      return NextResponse.json(
        { error: 'Company name and country are required for bank transfer and invoice payments' },
        { status: 400 }
      );
    }

    const paymentMethodName = paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Invoice';
    const customerEmail = contactMethod === 'email' ? contact : 'support@lovigin.com';

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: customerEmail,
      subject: `Order Request - ${productName} (${paymentMethodName})`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #1e293b;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 20px;">Order Request Received</h1>
            <p style="font-size: 18px; line-height: 1.6; color: #475569;">
              Thank you for your order request! We've received your information and will process it shortly.
            </p>
          </div>

          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Order Details</h2>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Amount:</strong> $${productPrice}</p>
            <p><strong>Payment Method:</strong> ${paymentMethodName}</p>
            <p><strong>GitHub Username:</strong> ${githubUsername}</p>
            ${companyName ? `<p><strong>Company Name:</strong> ${companyName}</p>` : ''}
            ${vatNumber ? `<p><strong>VAT Number:</strong> ${vatNumber}</p>` : ''}
            ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
            <p><strong>Contact Method:</strong> ${contactMethod}</p>
            <p><strong>Contact:</strong> ${contact}</p>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-bottom: 10px;">Next Steps</h3>
            <p style="color: #047857; margin: 0;">
              ${paymentMethod === 'bank_transfer' 
                ? 'You will receive bank transfer instructions via email within 24 hours. Repository access will be granted after payment confirmation.' 
                : 'You will receive an invoice via email within 24 hours. Repository access will be granted after payment confirmation.'}
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              If you have any questions, please contact us at support@lovigin.com
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: 'ilia.loviagin@gmail.com',
      subject: `New ${paymentMethodName} Order Request - ${productName}`,
      html: `
        <h2>New ${paymentMethodName} Order Request</h2>
        
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact Method:</strong> ${contactMethod}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        
        ${companyName ? `<h3>Company Information</h3>` : ''}
        ${companyName ? `<p><strong>Company Name:</strong> ${companyName}</p>` : ''}
        ${vatNumber ? `<p><strong>VAT Number:</strong> ${vatNumber}</p>` : ''}
        ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
        
        <h3>Order Details</h3>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Amount:</strong> $${productPrice}</p>
        <p><strong>Payment Method:</strong> ${paymentMethodName}</p>
        <p><strong>GitHub Username:</strong> ${githubUsername}</p>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">Action Required:</h3>
          <p style="color: #92400e; margin: 0;">
            ${paymentMethod === 'bank_transfer' 
              ? `Please send bank transfer instructions to ${customerEmail}. After payment confirmation, add GitHub user "${githubUsername}" to the private repository with read access.` 
              : `Please send an invoice to ${customerEmail}. After payment confirmation, add GitHub user "${githubUsername}" to the private repository with read access.`}
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Order request submitted successfully! You will receive ${paymentMethod === 'bank_transfer' ? 'bank transfer instructions' : 'an invoice'} via email within 24 hours.`,
    });
  } catch (error) {
    console.error('Error creating alternative order:', error);
    return NextResponse.json(
      { error: 'Failed to create order request' },
      { status: 500 }
    );
  }
}

