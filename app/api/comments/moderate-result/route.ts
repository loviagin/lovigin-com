import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const message = searchParams.get('message');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Comment Moderation Result</title>
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
                    text-align: center;
                }
                .success {
                    color: #28a745;
                }
                .error {
                    color: #dc3545;
                }
                .icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                }
                .btn {
                    display: inline-block;
                    padding: 12px 24px;
                    margin: 20px 10px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                }
                .btn:hover {
                    background: #1d4ed8;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="icon">
                    ${action === 'approve' ? '✅' : action === 'reject' ? '❌' : '⚠️'}
                </div>
                <h1 class="${action === 'approve' ? 'success' : action === 'reject' ? 'error' : ''}">
                    ${action === 'approve' ? 'Comment Approved!' : 
                      action === 'reject' ? 'Comment Rejected!' : 
                      'Moderation Result'}
                </h1>
                <p>${message || 'The comment has been processed.'}</p>
                <a href="/blog" class="btn">Back to Blog</a>
            </div>
        </body>
        </html>
    `;

    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
