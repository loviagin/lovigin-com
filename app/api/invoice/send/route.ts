import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Support both JSON (with base64) and FormData (with file)
    const contentType = request.headers.get('content-type') || '';
    let pdfBase64: string | undefined;
    let pdfFilename: string | undefined;
    let orderData: any;

    if (contentType.includes('multipart/form-data')) {
      // Handle file upload via FormData
      const formData = await request.formData();
      const pdfFile = formData.get('pdf') as File | null;
      
      if (pdfFile) {
        const arrayBuffer = await pdfFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        pdfBase64 = buffer.toString('base64');
        pdfFilename = pdfFile.name || `Invoice-${formData.get('orderNumber') || 'invoice'}.pdf`;
      }

      // Extract other form fields
      orderData = {
        orderNumber: formData.get('orderNumber'),
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        companyName: formData.get('companyName'),
        vatNumber: formData.get('vatNumber'),
        addressLine1: formData.get('addressLine1'),
        addressLine2: formData.get('addressLine2'),
        city: formData.get('city'),
        stateProvince: formData.get('stateProvince'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
        productName: formData.get('productName'),
        productPrice: formData.get('productPrice'),
        currency: formData.get('currency'),
      };
    } else {
      // Handle JSON with base64
      const body = await request.json();
      pdfBase64 = body.pdfBase64;
      pdfFilename = body.pdfFilename;
      orderData = body;
    }

    const {
      orderNumber,
      customerName,
      customerEmail,
      companyName,
      vatNumber,
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      postalCode,
      country,
      productName,
      productPrice,
      currency,
    } = orderData;

    // Validate required fields
    if (!orderNumber || !customerEmail || !productName || !productPrice || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const currencySymbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€';
    const amount = `${currencySymbol}${productPrice}`;
    const invoiceDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Send email with optional PDF attachment
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: customerEmail,
      subject: `Invoice ${orderNumber} - ${productName}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #1e293b;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 20px;">Invoice</h1>
            <p style="font-size: 18px; line-height: 1.6; color: #475569;">
              ${pdfBase64 ? 'Please find your invoice attached to this email.' : 'Please find your invoice details below.'}
            </p>
          </div>

          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Invoice Details</h2>
            <p><strong>Invoice Number:</strong> <span style="font-family: monospace; font-weight: 700; color: #2563eb;">${orderNumber}</span></p>
            <p><strong>Date:</strong> ${invoiceDate}</p>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p><strong>Currency:</strong> ${currency}</p>
          </div>

          ${companyName || addressLine1 ? `
          <div style="background: #eff6ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0;">Billing Address</h3>
            ${companyName ? `<p style="margin: 5px 0; color: #1e293b;"><strong>${companyName}</strong></p>` : ''}
            <p style="margin: 5px 0; color: #1e293b;">${customerName}</p>
            ${addressLine1 ? `
              <p style="margin: 5px 0; color: #1e293b;">${addressLine1}</p>
              ${addressLine2 ? `<p style="margin: 5px 0; color: #1e293b;">${addressLine2}</p>` : ''}
              <p style="margin: 5px 0; color: #1e293b;">${city}, ${stateProvince} ${postalCode}</p>
              <p style="margin: 5px 0; color: #1e293b;">${country}</p>
            ` : ''}
            ${vatNumber ? `<p style="margin: 10px 0 0 0; color: #1e293b;">VAT: ${vatNumber}</p>` : ''}
          </div>
          ` : ''}

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-bottom: 10px;">Payment Instructions</h3>
            <p style="color: #047857; margin: 0;">
              Please complete the payment as indicated. Repository access will be granted after payment confirmation (usually within 1-2 business days).
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              If you have any questions, please contact us at support@lovigin.com
            </p>
          </div>
        </div>
      `,
      attachments: pdfBase64 ? [
        {
          filename: pdfFilename || `Invoice-${orderNumber}.pdf`,
          content: pdfBase64,
        },
      ] : undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Invoice sent successfully',
      pdfAttached: !!pdfBase64,
    });
  } catch (error) {
    console.error('Error sending invoice:', error);
    return NextResponse.json(
      { error: 'Failed to send invoice' },
      { status: 500 }
    );
  }
}
