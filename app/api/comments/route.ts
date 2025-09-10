import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import { getPostById } from '@/app/blog/data';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email notifications will not work.');
}

async function getPostTitle(postId: string): Promise<string> {
    const post = getPostById(postId);
    return post ? post.title : 'Unknown Post';
}

// GET - получить комментарии для поста
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');
        
        if (!postId) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        // Получаем только одобренные комментарии без родительских комментариев (топ-уровень)
        const comments = await Comment.find({
            postId,
            isApproved: true,
            parentCommentId: null
        })
        .populate('replies')
        .sort({ createdAt: -1 });

        return NextResponse.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

// POST - создать новый комментарий
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        
        const body = await request.json();
        const { postId, author, content, parentCommentId } = body;

        // Валидация
        if (!postId || !author?.name || !author?.email || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Проверяем длину комментария
        if (content.length > 1000) {
            return NextResponse.json(
                { error: 'Comment is too long (max 1000 characters)' },
                { status: 400 }
            );
        }

        // Создаем новый комментарий
        const newComment = new Comment({
            postId,
            author: {
                name: author.name.trim(),
                email: author.email.trim().toLowerCase(),
                website: author.website?.trim() || ''
            },
            content: content.trim(),
            parentCommentId: parentCommentId || null,
            isApproved: false // Комментарии требуют модерации
        });

        await newComment.save();

        // Если это ответ на комментарий, добавляем его в replies родительского комментария
        if (parentCommentId) {
            await Comment.findByIdAndUpdate(
                parentCommentId,
                { $push: { replies: newComment._id } }
            );
        }

        // Отправляем уведомление на email
        if (process.env.RESEND_API_KEY) {
            try {
            const postTitle = await getPostTitle(postId);
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const approveUrl = `${baseUrl}/api/comments/moderate?action=approve&id=${newComment._id}`;
            const rejectUrl = `${baseUrl}/api/comments/moderate?action=reject&id=${newComment._id}`;

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
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Comment on Blog Post</h1>
                            <p>Comment requires moderation</p>
                        </div>
                        
                        <h2>Post: ${postTitle}</h2>
                        
                        <div class="author-info">
                            <strong>Author:</strong> ${author.name}<br>
                            <strong>Email:</strong> ${author.email}<br>
                            <strong>Comment ID:</strong> ${newComment._id}
                        </div>
                        
                        <div class="comment-content">
                            <strong>Comment:</strong><br>
                            ${content.trim()}
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

            const emailData = await resend.emails.send({
                from: 'LOVIGIN Blog <noreply@lovigin.com>',
                to: ['ilia.loviagin@gmail.com'],
                subject: `New Comment on "${postTitle}" - Requires Moderation`,
                html: emailContent,
            });

                console.log('Email sent successfully:', emailData);
            } catch (error) {
                console.error('Error sending notification email:', error);
            }
        } else {
            console.warn('RESEND_API_KEY not configured. Email notification skipped.');
        }

        return NextResponse.json(
            { 
                message: 'Comment submitted successfully. It will be published after moderation.',
                comment: newComment 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}
