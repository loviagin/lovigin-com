import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Bank account details for each currency
const bankDetails: Record<string, {
  currency: string;
  bankName: string;
  accountName: string;
  accountNumber?: string;
  routingNumber?: string;
  sortCode?: string;
  swiftBic?: string;
  iban?: string;
  address?: string;
}> = {
  USD: {
    currency: 'USD',
    bankName: 'Citibank',
    accountName: 'LOVIGIN LTD',
    accountNumber: '70587570001706006',
    routingNumber: '031100209',
    swiftBic: 'CITIUS33',
    address: '111 Wall Street New York, NY 10043 USA',
  },
  GBP: {
    currency: 'GBP',
    bankName: 'Barclays',
    accountName: 'LOVIGIN LTD',
    accountNumber: '15652951',
    sortCode: '231486'
  },
  EUR: {
    currency: 'EUR',
    bankName: 'Banking Circle S.A.',
    accountName: 'LOVIGIN LTD',
    swiftBic: 'BCIRLULL',
    iban: 'LU234080000056264467',
    address: '2, Boulevard de la Foire L-1528 LUXEMBOURG',
  },
};

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
      currency,
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      postalCode,
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
    if ((paymentMethod === 'bank_transfer' || paymentMethod === 'invoice') && (!companyName || !country || !currency)) {
      return NextResponse.json(
        { error: 'Company name, country, and currency are required for bank transfer and invoice payments' },
        { status: 400 }
      );
    }

    // Validate address fields for invoice
    if (paymentMethod === 'invoice' && (!addressLine1 || !city || !stateProvince || !postalCode)) {
      return NextResponse.json(
        { error: 'Address fields are required for invoice payments' },
        { status: 400 }
      );
    }

    const paymentMethodName = paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Invoice';
    const customerEmail = contactMethod === 'email' ? contact : 'support@lovigin.com';
    const selectedBankDetails = bankDetails[currency] || bankDetails.USD;
    const currencySymbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€';
    const amount = `${currencySymbol}${productPrice}`;

    // Generate unique order number
    const generateOrderNumber = (): string => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
    };

    const orderNumber = generateOrderNumber();

    // Build address HTML for invoice
    const addressHTML = paymentMethod === 'invoice' ? `
      <div style="background: #eff6ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0;">Billing Address</h3>
        <p style="margin: 5px 0; color: #1e293b;">${addressLine1}</p>
        ${addressLine2 ? `<p style="margin: 5px 0; color: #1e293b;">${addressLine2}</p>` : ''}
        <p style="margin: 5px 0; color: #1e293b;">${city}, ${stateProvince} ${postalCode}</p>
        <p style="margin: 5px 0; color: #1e293b;">${country}</p>
      </div>
    ` : '';

    // Helper function to check if a field should be displayed
    const shouldDisplayField = (value: string | undefined): boolean => {
      if (!value) return false;
      const trimmed = value.trim();
      if (trimmed === '') return false;
      // Hide placeholder values
      const placeholderPatterns = ['YOURSWIFT', 'Your Bank', 'Your EU Bank'];
      return !placeholderPatterns.some(pattern => trimmed.includes(pattern));
    };

    // Build bank details HTML
    const bankDetailsHTML = paymentMethod === 'bank_transfer' ? `
      <div style="background: #fff7ed; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="color: #92400e; margin: 0 0 15px 0;">Bank Transfer Details (${currency})</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600; width: 180px;">Bank Name:</td>
            <td style="padding: 8px 0; color: #1e293b;">${selectedBankDetails.bankName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Account Name:</td>
            <td style="padding: 8px 0; color: #1e293b;">${selectedBankDetails.accountName}</td>
          </tr>
          ${shouldDisplayField(selectedBankDetails.accountNumber) ? `
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Account Number:</td>
            <td style="padding: 8px 0; color: #1e293b; font-family: monospace;">${selectedBankDetails.accountNumber}</td>
          </tr>
          ` : ''}
          ${shouldDisplayField(selectedBankDetails.routingNumber) ? `
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Routing Number:</td>
            <td style="padding: 8px 0; color: #1e293b; font-family: monospace;">${selectedBankDetails.routingNumber}</td>
          </tr>
          ` : ''}
          ${shouldDisplayField(selectedBankDetails.sortCode) ? `
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Sort Code:</td>
            <td style="padding: 8px 0; color: #1e293b; font-family: monospace;">${selectedBankDetails.sortCode}</td>
          </tr>
          ` : ''}
          ${shouldDisplayField(selectedBankDetails.swiftBic) ? `
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">SWIFT/BIC:</td>
            <td style="padding: 8px 0; color: #1e293b; font-family: monospace;">${selectedBankDetails.swiftBic}</td>
          </tr>
          ` : ''}
          ${shouldDisplayField(selectedBankDetails.iban) ? `
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">IBAN:</td>
            <td style="padding: 8px 0; color: #1e293b; font-family: monospace;">${selectedBankDetails.iban}</td>
          </tr>
          ` : ''}
          ${shouldDisplayField(selectedBankDetails.address) ? `
          <tr>
            <td style="padding: 8px 0; color: #78350f; font-weight: 600;">Bank Address:</td>
            <td style="padding: 8px 0; color: #1e293b;">${selectedBankDetails.address}</td>
          </tr>
          ` : ''}
        </table>
        <p style="margin-top: 15px; color: #92400e; font-size: 14px;">
          <strong>Payment Amount:</strong> ${amount}<br>
          <strong>Reference:</strong> Please include "Order ${productName} - ${orderNumber}" in the payment reference.
        </p>
      </div>
    ` : '';

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
            <p><strong>Order Number:</strong> <span style="font-family: monospace; font-weight: 700; color: #2563eb;">${orderNumber}</span></p>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Payment Method:</strong> ${paymentMethodName}</p>
            <p><strong>GitHub Username:</strong> ${githubUsername}</p>
            ${companyName ? `<p><strong>Company Name:</strong> ${companyName}</p>` : ''}
            ${vatNumber ? `<p><strong>VAT Number:</strong> ${vatNumber}</p>` : ''}
            ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
            <p><strong>Contact Method:</strong> ${contactMethod}</p>
            <p><strong>Contact:</strong> ${contact}</p>
          </div>

          ${bankDetailsHTML}

          ${addressHTML}

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-bottom: 10px;">Next Steps</h3>
            <p style="color: #047857; margin: 0;">
              ${paymentMethod === 'bank_transfer' 
                ? 'Please complete the bank transfer using the details above. Repository access will be granted after payment confirmation (usually within 1-2 business days).' 
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
        
        ${paymentMethod === 'invoice' ? `
        <h3>Billing Address</h3>
        <p>${addressLine1}</p>
        ${addressLine2 ? `<p>${addressLine2}</p>` : ''}
        <p>${city}, ${stateProvince} ${postalCode}</p>
        <p>${country}</p>
        ` : ''}
        
        <h3>Order Details</h3>
        <p><strong>Order Number:</strong> <span style="font-family: monospace; font-weight: 700;">${orderNumber}</span></p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Currency:</strong> ${currency}</p>
        <p><strong>Payment Method:</strong> ${paymentMethodName}</p>
        <p><strong>GitHub Username:</strong> ${githubUsername}</p>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">Action Required:</h3>
          <p style="color: #92400e; margin: 0;">
            ${paymentMethod === 'bank_transfer' 
              ? `Customer has been sent bank transfer details for ${currency}. Please monitor payment and add GitHub user "${githubUsername}" to the private repository with read access after payment confirmation.` 
              : `Please send an invoice to ${customerEmail}. After payment confirmation, add GitHub user "${githubUsername}" to the private repository with read access.`}
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Order request submitted successfully! You will receive ${paymentMethod === 'bank_transfer' ? 'bank transfer details' : 'an invoice'} via email.`,
    });
  } catch (error) {
    console.error('Error creating alternative order:', error);
    return NextResponse.json(
      { error: 'Failed to create order request' },
      { status: 500 }
    );
  }
}

