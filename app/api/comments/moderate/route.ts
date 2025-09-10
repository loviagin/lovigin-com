import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const action = searchParams.get('action');
        const commentId = searchParams.get('id');

        if (!action || !commentId) {
            return NextResponse.json(
                { error: 'Missing action or comment ID' },
                { status: 400 }
            );
        }

        if (!['approve', 'reject'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be approve or reject' },
                { status: 400 }
            );
        }

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            );
        }

        if (action === 'approve') {
            comment.isApproved = true;
            await comment.save();
            
            // Перенаправляем на страницу результата
            return NextResponse.redirect(`https://lovigin.com/api/comments/moderate-result?action=approve&message=Comment approved successfully`);
        } else if (action === 'reject') {
            await Comment.findByIdAndDelete(commentId);
            
            // Перенаправляем на страницу результата
            return NextResponse.redirect(`https://lovigin.com/api/comments/moderate-result?action=reject&message=Comment rejected and deleted successfully`);
        }

    } catch (error) {
        console.error('Error moderating comment:', error);
        return NextResponse.json(
            { error: 'Failed to moderate comment' },
            { status: 500 }
        );
    }
}

// POST endpoint для программной модерации
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        
        const body = await request.json();
        const { commentId, action } = body;

        if (!action || !commentId) {
            return NextResponse.json(
                { error: 'Missing action or comment ID' },
                { status: 400 }
            );
        }

        if (!['approve', 'reject'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be approve or reject' },
                { status: 400 }
            );
        }

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            );
        }

        if (action === 'approve') {
            comment.isApproved = true;
            await comment.save();
            
            return NextResponse.json({
                success: true,
                message: 'Comment approved successfully',
                comment: {
                    id: comment._id,
                    author: comment.author.name,
                    content: comment.content,
                    isApproved: comment.isApproved
                }
            });
        } else if (action === 'reject') {
            await Comment.findByIdAndDelete(commentId);
            
            return NextResponse.json({
                success: true,
                message: 'Comment rejected and deleted successfully'
            });
        }

    } catch (error) {
        console.error('Error moderating comment:', error);
        return NextResponse.json(
            { error: 'Failed to moderate comment' },
            { status: 500 }
        );
    }
}