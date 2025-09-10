import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { commentId, postId, authorName, authorEmail, content, postTitle } = body;

    // Создаем ссылки для модерации
    const baseUrl = 'https://lovigin.com';
    const approveUrl = `${baseUrl}/api/comments/moderate?action=approve&id=${commentId}`;
    const rejectUrl = `${baseUrl}/api/comments/moderate?action=reject&id=${commentId}`;
    const postUrl = `${baseUrl}/blog/${postId}`;

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Comment on Blog Post</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
          }
          .comment-content {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
            margin: 20px 0;
            font-style: italic;
          }
          .author-info {
            background: #e9ecef;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
          }
          .moderation-buttons {
            text-align: center;
            margin: 30px 0;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .btn-approve {
            background: #28a745;
            color: white;
          }
          .btn-approve:hover {
            background: #218838;
            transform: translateY(-2px);
          }
          .btn-reject {
            background: #dc3545;
            color: white;
          }
          .btn-reject:hover {
            background: #c82333;
            transform: translateY(-2px);
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            text-align: center;
            color: #6c757d;
            font-size: 14px;
          }
          .post-link {
            color: #2563eb;
            text-decoration: none;
            font-weight: 600;
          }
          .post-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Comment on Blog Post</h1>
            <p>Comment requires moderation</p>
          </div>
          
          <h2>Post: <a href="${postUrl}" class="post-link">${postTitle}</a></h2>
          
          <div class="author-info">
            <strong>Author:</strong> ${authorName}<br>
            <strong>Email:</strong> ${authorEmail}<br>
            <strong>Comment ID:</strong> ${commentId}
          </div>
          
          <div class="comment-content">
            <strong>Comment:</strong><br>
            ${content}
          </div>
          
          <div class="moderation-buttons">
            <a href="${approveUrl}" class="btn btn-approve">✓ Approve Comment</a>
            <a href="${rejectUrl}" class="btn btn-reject">✗ Reject Comment</a>
          </div>
          
          <div class="footer">
            <p>This email was sent from your blog comment moderation system.</p>
            <p>Click the buttons above to moderate this comment.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'LOVIGIN Blog <noreply@lovigin.com>',
      to: ['ilia.loviagin@gmail.com'],
      subject: `New Comment on "${postTitle}" - Requires Moderation`,
      html: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending comment notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
