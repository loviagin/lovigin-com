'use client';

import { useState, useEffect } from 'react';
import styles from './Comments.module.css';

interface Comment {
    _id: string;
    author: {
        name: string;
        email: string;
        website?: string;
    };
    content: string;
    createdAt: string;
    replies: Comment[];
}

interface CommentsProps {
    postId: string;
    refreshTrigger?: number;
}

export default function Comments({ postId, refreshTrigger }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchComments();
    }, [postId, refreshTrigger]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/comments?postId=${postId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            
            const data = await response.json();
            setComments(data.comments || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderComment = (comment: Comment, isReply = false) => (
        <div key={comment._id} className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
            <div className={styles.commentHeader}>
                <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{comment.author.name}</span>
                    {comment.author.website && (
                        <a 
                            href={comment.author.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.authorWebsite}
                        >
                            {comment.author.website}
                        </a>
                    )}
                </div>
                <time className={styles.commentDate}>
                    {formatDate(comment.createdAt)}
                </time>
            </div>
            <div className={styles.commentContent}>
                {comment.content}
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className={styles.replies}>
                    {comment.replies.map(reply => renderComment(reply, true))}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className={styles.commentsContainer}>
                <div className={styles.loading}>Loading comments...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.commentsContainer}>
                <div className={styles.error}>Error loading comments: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.commentsContainer}>
            {comments.length === 0 ? (
                <div className={styles.noComments}>
                    No comments yet. Be the first to share your thoughts!
                </div>
            ) : (
                <div className={styles.commentsList}>
                    {comments.map(comment => renderComment(comment))}
                </div>
            )}
        </div>
    );
}
