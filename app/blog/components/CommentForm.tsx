'use client';

import { useState } from 'react';
import styles from './CommentForm.module.css';

interface CommentFormProps {
    postId: string;
    parentCommentId?: string;
    onCommentAdded?: () => void;
    onCancel?: () => void;
}

export default function CommentForm({ 
    postId, 
    parentCommentId, 
    onCommentAdded, 
    onCancel 
}: CommentFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim() || !formData.content.trim()) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            return;
        }

        if (formData.content.length > 1000) {
            setMessage({ type: 'error', text: 'Comment is too long (max 1000 characters).' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId,
                    author: {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        website: formData.website.trim()
                    },
                    content: formData.content.trim(),
                    parentCommentId
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit comment');
            }

            setMessage({ 
                type: 'success', 
                text: 'Comment submitted successfully! It will be published after moderation.' 
            });
            
            // Очищаем форму
            setFormData({
                name: '',
                email: '',
                website: '',
                content: ''
            });

            // Вызываем callback для обновления списка комментариев
            if (onCommentAdded) {
                setTimeout(() => {
                    onCommentAdded();
                }, 1000);
            }

        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error instanceof Error ? error.message : 'An error occurred while submitting your comment.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.commentFormContainer}>
            <h4 className={styles.formTitle}>
                {parentCommentId ? 'Reply to Comment' : 'Leave a Comment'}
            </h4>
            
            <form onSubmit={handleSubmit} className={styles.commentForm}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Your name"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="your@email.com"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* <div className={styles.formGroup}>
                    <label htmlFor="website" className={styles.label}>
                        Website
                    </label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="https://yourwebsite.com"
                        disabled={isSubmitting}
                    />
                </div> */}

                <div className={styles.formGroup}>
                    <label htmlFor="content" className={styles.label}>
                        Comment *
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className={styles.textarea}
                        placeholder="Share your thoughts..."
                        rows={4}
                        required
                        disabled={isSubmitting}
                        maxLength={1000}
                    />
                    <div className={styles.charCount}>
                        {formData.content.length}/1000 characters
                    </div>
                </div>

                {message && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}

                <div className={styles.formActions}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : (parentCommentId ? 'Reply' : 'Post Comment')}
                    </button>
                    
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className={styles.cancelButton}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
