'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

interface BlogPostProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
}

export default function BlogPost({ id, title, excerpt, date, image, category }: BlogPostProps) {
    return (
        <article className={styles.blogPost}>
            <Link href={`/blog/${id}`} className={styles.blogPostLink}>
                <div className={styles.blogPostImage}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.blogPostContent}>
                    <span className={styles.blogPostCategory}>{category}</span>
                    <h3 className={styles.blogPostTitle}>{title}</h3>
                    <p className={styles.blogPostExcerpt}>{excerpt}</p>
                    <time className={styles.blogPostDate}>{date}</time>
                </div>
            </Link>
        </article>
    );
} 