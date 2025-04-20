import styles from './page.module.css';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostById } from '../data';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPostById(params.id);

    if (!post) {
        return {
            title: 'Post Not Found | LOVIGIN LTD',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: `${post.title} | LOVIGIN Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            authors: [post.author.name],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default function BlogPost({ params }: Props) {
    const post = getPostById(params.id);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <Link href="/blog" className={styles.backLink}>
                        ← Back to Blog
                    </Link>
                    <div className={styles.postHeader}>
                        <span className={styles.category}>{post.category}</span>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>
                            <time className={styles.date}>{post.date}</time>
                            {/* <div className={styles.author}>
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className={styles.authorAvatar}
                                />
                                <div className={styles.authorInfo}>
                                    <span className={styles.authorName}>{post.author.name}</span>
                                    <span className={styles.authorRole}>{post.author.role}</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <article className={styles.postContent}>
                    <div className={styles.featuredImage}>
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div 
                        className={styles.postBody}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </main>
    );
} 