import React from 'react';
import Image from 'next/image';
import styles from './PortfolioShowcase.module.css';
import { projects } from '@/app/portfolio/projects';
import Link from 'next/link';

const PortfolioShowcase = () => {
  // Get the 3 most recent completed projects
  const recentProjects = [...projects]
    .filter(project => project.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.container}>
        <h2 className={styles.title}>Latest Projects</h2>
        <p className={styles.subtitle}>
          Take a look at our most recent completed works
        </p>
        <div className={styles.grid}>
          {recentProjects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.id}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={project.screenshots[0]}
                  alt={project.title}
                  className={styles.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.shortDescription}</p>
                <div className={styles.techStack}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.techItem}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Link href="/portfolio" className={styles.viewAllButton}>
            View All Works
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase; 