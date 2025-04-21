import styles from './page.module.css';
import { Metadata } from 'next';
import BlogPost from './BlogPost';
import { getSortedPosts } from './data';

export const metadata: Metadata = {
    title: 'Blog | LOVIGIN LTD',
    description: 'Latest articles and insights from LOVIGIN LTD',
};

export default function Blog() {
    const posts = getSortedPosts();

    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Our Blog</h1>
                    <p className={styles.subtitle}>Insights, updates, and industry perspectives</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.blogGrid}>
                    {posts.map(post => (
                        <BlogPost
                            key={post.id}
                            {...post}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
