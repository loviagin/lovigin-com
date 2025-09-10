import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

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
