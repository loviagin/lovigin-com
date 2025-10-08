import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { sessionId, paymentData } = await request.json();

    if (!sessionId || !paymentData) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: paymentData.customerEmail || paymentData.metadata?.contact || 'support@lovigin.com',
      subject: 'Payment Successful - Swift Reports HMRC Access',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #1e293b;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 20px;">Payment Successful!</h1>
            <p style="font-size: 18px; line-height: 1.6; color: #475569;">
              Thank you for your purchase! Your payment has been processed successfully.
            </p>
          </div>

          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Order Details</h2>
            <p><strong>Product:</strong> Swift Reports HMRC - Repository Access</p>
            <p><strong>Amount:</strong> $${(paymentData.amountTotal / 100).toFixed(2)}</p>
            <p><strong>GitHub Username:</strong> ${paymentData.metadata?.githubUsername}</p>
            <p><strong>Contact Method:</strong> ${paymentData.metadata?.contactMethod}</p>
            <p><strong>Contact:</strong> ${paymentData.metadata?.contact}</p>
          </div>

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-bottom: 10px;">Next Steps</h3>
            <p style="color: #047857; margin: 0;">
              You will receive repository access within a few minutes. We'll add your GitHub username (${paymentData.metadata?.githubUsername}) to the private repository and send you an invitation email.
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              If you have any questions, please contact us at support@lovigin.com<br>
              <br>
              Best regards,<br>
              The LOVIGIN Team
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to admin
    await resend.emails.send({
      from: 'LOVIGIN <noreply@lovigin.com>',
      to: 'ilia.loviagin@gmail.com',
      subject: 'New Purchase - Swift Reports HMRC',
      html: `
        <h2>New Purchase Completed</h2>
        <p><strong>Customer:</strong> ${paymentData.metadata?.customerName}</p>
        <p><strong>GitHub Username:</strong> ${paymentData.metadata?.githubUsername}</p>
        <p><strong>Contact Method:</strong> ${paymentData.metadata?.contactMethod}</p>
        <p><strong>Contact:</strong> ${paymentData.metadata?.contact}</p>
        <p><strong>Amount:</strong> $${(paymentData.amountTotal / 100).toFixed(2)}</p>
        <p><strong>Session ID:</strong> ${sessionId}</p>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">Action Required:</h3>
          <p style="color: #92400e; margin: 0;">
            Please add GitHub user "${paymentData.metadata?.githubUsername}" to the private repository with read access.
          </p>
        </div>
      `,
    });

    // Add user to GitHub repository
    console.log('Payment metadata:', paymentData.metadata);
    if (paymentData.metadata?.githubUsername) {
      console.log('GitHub username found:', paymentData.metadata.githubUsername);
      try {
        await addUserToGitHubRepo(paymentData.metadata.githubUsername);
      } catch (githubError) {
        console.error('Error adding user to GitHub repo:', githubError);
        // Send error notification to admin
        await resend.emails.send({
          from: 'LOVIGIN <noreply@lovigin.com>',
          to: 'ilia.loviagin@gmail.com',
          subject: 'GitHub Repository Access Error',
          html: `
            <h2>GitHub Repository Access Error</h2>
            <p>Failed to automatically add user "${paymentData.metadata?.githubUsername}" to the repository.</p>
            <p><strong>Error:</strong> ${githubError}</p>
            <p><strong>Possible reasons:</strong></p>
            <ul>
              <li>GitHub username "${paymentData.metadata?.githubUsername}" does not exist</li>
              <li>Username contains invalid characters (only letters, numbers, hyphens allowed)</li>
              <li>User needs to create a GitHub account first</li>
            </ul>
            <p><strong>Please contact the customer:</strong></p>
            <p>Ask them to provide their correct GitHub username (example: loviagin, octocat) or create a GitHub account if they don't have one.</p>
            <p><strong>Manual steps if needed:</strong></p>
            <ol>
              <li>Go to your private repository settings</li>
              <li>Navigate to "Manage access"</li>
              <li>Click "Invite a collaborator"</li>
              <li>Enter the correct GitHub username</li>
              <li>Set permission to "Read"</li>
            </ol>
          `,
        });
      }
    } else {
      console.log('No GitHub username found in metadata');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}

// Function to add user to GitHub repository
async function addUserToGitHubRepo(username: string) {
  const repoOwner = 'LOVIGIN-LTD'; // Replace with your GitHub username
  const repoName = 'swift-reports-hmrc'; // Replace with your repository name
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    throw new Error('GitHub token not configured');
  }

  // First, check if repository exists
  const repoCheckResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!repoCheckResponse.ok) {
    throw new Error(`Repository ${repoOwner}/${repoName} not found or not accessible`);
  }

  // Add user to repository
  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${username}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      permission: 'pull' // Read-only access
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GitHub API Error - Status: ${response.status}`);
    console.error(`Repository: ${repoOwner}/${repoName}`);
    console.error(`GitHub Username: ${username}`);
    console.error(`Error: ${errorText}`);
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  console.log(`Successfully added ${username} to repository`);
}
