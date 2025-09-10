'use client';

import { useState } from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import styles from './CommentsSection.module.css';

interface CommentsSectionProps {
    postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleCommentAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className={styles.commentsSection}>
            <h2 className={styles.sectionTitle}>Comments</h2>
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
            <Comments postId={postId} refreshTrigger={refreshTrigger} />
        </div>
    );
}
